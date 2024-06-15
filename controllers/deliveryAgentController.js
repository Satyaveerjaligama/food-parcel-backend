const DeliveryAgent = require("../models/deliveryAgent");

exports.register = async (req, res) => {
    try {
        const newDeliveryAgent = new DeliveryAgent(req.body);
        await newDeliveryAgent.save();
        res.status(201).send("Delivery agent registration successful");
    } catch(err) {
        res.status(404).send(err.message);
    }
}