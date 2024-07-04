const {Orders} = require('../models/orders');
const { generateUserId, getCurrentDateAndTime } = require('../utilities/utilityFunctions');

exports.create = async(req, res) => {
    try {
        let orderId = generateUserId('order');
        let document = await Orders.findOne({orderId});

        while(document) {
            orderId = generateUserId('order');
            document = await Orders.findOne({orderId});
        }

        const {date, time} = getCurrentDateAndTime();

        const order = new Orders({...req.body, orderId, date, time});
        order.save();
        res.status(201).json({message: "Ordered successfully"});
    } catch(err) {
        res.status(400).json({message: "Something went wrong"})
    }
};