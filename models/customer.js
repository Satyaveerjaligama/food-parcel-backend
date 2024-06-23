const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required :true,
    unique: true,
    immutable: true
  },
  fullName: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
    trim: true
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
    unique: true,
    required: true,
  },
  address: {
    type: String,
    maxLength: 100,
    required: true
  },
  pincode: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
});

const Customer = mongoose.model('CustomerRegistration', customerSchema, 'customers');

module.exports = {
  Customer: Customer,
}
