// models/User.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  emailId: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Customer = mongoose.model('CustomerRegistration', customerSchema, 'customers');

module.exports = {
  Customer: Customer,
}
