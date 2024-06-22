const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    restaurantName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
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
    gstNumber: {
        type: String,
        required: true
    },
    fssaiNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema, 'restaurants');

module.exports = {
    Restaurant: Restaurant
}