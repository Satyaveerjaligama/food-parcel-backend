const express = require('express');
const mongoose = require('mongoose');
const customerRoutes = require('./routes/customerRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const deliveryAgentRoutes = require('./routes/deliveryAgentRoutes');

const app = express();
const port = 5000;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
const mongoURI = 'mongodb://127.0.0.1:27017/food_delivery_app';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use("/customer", customerRoutes);
app.use("/hotel", hotelRoutes);
app.use("/delivery-agent", deliveryAgentRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
