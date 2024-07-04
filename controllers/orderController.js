const {Orders} = require('../models/orders');
const {Restaurant} = require('../models/restaurant');
const { generateUserId, getCurrentDateAndTime } = require('../utilities/utilityFunctions');

exports.create = async(req, res) => {
    try {
        let orderId = generateUserId('order');
        let document = await Orders.findOne({orderId});

        while(document) {
            orderId = generateUserId('order');
            document = await Orders.findOne({orderId});
        }

        const restaurant = await Restaurant.findOne({restaurantId: req.body.restaurantId});
        
        if(!restaurant) {
            res.status(404).json({message: "Restaurant details not found"});
            return;
        }

        const {date, time} = getCurrentDateAndTime();

        const order = new Orders({...req.body, orderId, date, time, pickupLocation: restaurant.address});
        order.save();
        res.status(201).json({
            orderId: order.orderId,
            totalPrice: order.totalPrice,
            paymentMode: order.paymentMode,
            pickupLocation: order.pickupLocation,
            deliveryLocation: order.deliveryLocation,
            orderStatus: order.orderStatus
        });
    } catch(err) {
        res.status(400).json({message: "Something went wrong"})
    }
};