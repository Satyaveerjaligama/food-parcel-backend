const mongoose = require("mongoose");

const deliveryAgentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  aadhaarNumber: {
    type: String,
    required: true,
  },
  vehicleModel: {
    type: String,
    required: true,
  },
  vehicleNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  availabilityPincode: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const DeliveryAgent = mongoose.model(
  "DeliveryAgent",
  deliveryAgentSchema,
  "delivery_agents"
);

module.exports = {
  DeliveryAgent: DeliveryAgent,
};
