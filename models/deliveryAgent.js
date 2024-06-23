const mongoose = require("mongoose");

const deliveryAgentSchema = new mongoose.Schema({
  deliveryAgentId: {
    type: String,
    required :true,
    unique: true,
    immutable: true
  },
  fullName: {
    type: String,
    required: true,
    maxLength: 50,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  aadhaarNumber: {
    type: String,
    required: true,
    unique: true,
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
    maxLength: 100,
  },
  availabilityPincode: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
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
