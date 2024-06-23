const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    restaurantId: {
        type: String,
        required :true,
        unique: true,
        immutable: true
    },
    restaurantName: {
        type: String,
        required: true,
        maxLength: 50,
    },
    address: {
        type: String,
        required: true,
        maxLength: 100,
    },
    pincode: {
        type: String,
        required: true
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
    gstNumber: {
        type: String,
        required: true,
        unique: true,
    },
    fssaiNumber: {
        type: String,
        required: true,
        unique: true,
    },
    restaurantType: {
        type: Array,
        required: true,
    },
    rating : {
        type: Number,
        default: 0,
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
    }
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema, 'restaurants');

module.exports = {
    Restaurant: Restaurant
}