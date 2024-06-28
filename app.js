const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const path = require('path');
const crypto = require('crypto');

const customerRoutes = require('./routes/customerRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const deliveryAgentRoutes = require('./routes/deliveryAgentRoutes');
const {Restaurant} = require('./models/restaurant');

const app = express();
const port = 5000;
const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
const mongoURI = 'mongodb://127.0.0.1:27017/food_delivery_app';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads'
  });
});

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
      return new Promise((resolve, reject) => {
          crypto.randomBytes(16, (err, buf) => {
              if (err) {
                  return reject(err);
              }
              const filename = buf.toString('hex') + path.extname(file.originalname);
              const fileInfo = {
                  filename: filename,
                  bucketName: 'uploads'
              };
              resolve(fileInfo);
          });
      });
  }
});


const upload = multer({ storage });

app.post('/restaurant/upload/:restaurantId', upload.single('file'), async (req, res) => {
  try {
      const restaurant = await Restaurant.findOne({
        restaurantId: req.params.restaurantId
      });
      if (!restaurant) {
          return res.status(404).json({ msg: 'Restaurant not found' });
      }

      // If there is already an image, you might want to delete the old image file from GridFS
      if (restaurant.restaurantImage) {
          await gfs.delete(new mongoose.Types.ObjectId(restaurant.restaurantImage), (err, gridStore) => {
              if (err) {
                  return res.status(500).json({ msg: 'Error occurred while deleting old image' });
              }
          });
      }

      restaurant.restaurantImage = req.file.id;
      await restaurant.save();

      res.json({ file: req.file, restaurant });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

app.use("/customer", customerRoutes);
app.use("/restaurant", restaurantRoutes);
app.use("/delivery-agent", deliveryAgentRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
