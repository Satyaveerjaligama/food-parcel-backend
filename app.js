const express = require('express');
const cors = require('cors');
const customerRoutes = require('./routes/customerRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const deliveryAgentRoutes = require('./routes/deliveryAgentRoutes');
const {connectDB} = require('./config/db');

const app = express();
const port = 5000;
const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

connectDB();

app.use("/customer", customerRoutes);
app.use("/restaurant", restaurantRoutes);
app.use("/delivery-agent", deliveryAgentRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
