const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
    hotelName: {
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

const Hotel = mongoose.model('Hotel', hotelSchema, 'hotels');

module.exports = {
    Hotel: Hotel
}