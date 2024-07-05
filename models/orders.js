const mongoose = require('mongoose');
const { string } = require('yup');
const { ORDER_STATUS } = require('../utilities/constants');

const ordersSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true,
        immutable: true
    },
    customerId: {
        type: String,
        required: true,
    },
    restaurantId: {
        type: String,
        required: true,
    },
    deliveryAgentId: {
        type: String,
    },
    foodItems: {
        type: Array,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    paymentMode: {
        type: String,
        required: true,
    },
    pickupLocation: {
        type: String,
        required: true
    },
    deliveryLocation: {
        type: String,
        required: true,
    },
    orderStatus: {
        type: String,
        default: ORDER_STATUS.processing,
    },
    foodStatus: {
        type: String,
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})

const Orders = mongoose.model('Orders', ordersSchema, 'orders');

module.exports = {
    Orders
}