const { DeliveryAgent } = require("../models/deliveryAgent");
const { Orders } = require("../models/orders");
const { RESPONSE_MESSAGES, ORDER_STATUS } = require("../utilities/constants");
const {generateUserId} = require("../utilities/utilityFunctions");

exports.register = async (req, res) => {
  try {
    let userId = generateUserId('deliveryAgent');
    let deliveryAgent = await DeliveryAgent.findOne({ userId });

    while(deliveryAgent) {
      userId = generateUserId('deliveryAgent');
      deliveryAgent = await DeliveryAgent.findOne({ userId });
    }

    const newDeliveryAgent = new DeliveryAgent({...req.body, deliveryAgentId: userId});
    await newDeliveryAgent.save();
    res.status(201).send(`Delivery agent ${RESPONSE_MESSAGES.registrationSuccess}`);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

exports.getOrderInfo = async(req, res) => {
  try{
    const currentOrderDetails = await Orders.findOne({
      deliveryAgentId : req.body.userId,
      orderStatus: {$in: [ORDER_STATUS.processing, ORDER_STATUS.reachedPickupLocation, ORDER_STATUS.onTheWay]}
    }, {
      orderId: 1,
      orderStatus: 1,
      pickupLocation: 1,
      deliveryLocation: 1,
      _id: 0
    });

    if(currentOrderDetails) {
      res.status(200).json({
        currentOrderDetails,
        activeOrders: []
      });
      return;
    }

    const activeOrders = await Orders.find({
      pincode: req.body.pincode,
      deliveryAgentId: undefined
    }, {
      orderId: 1,
      pickupLocation: 1,
      deliveryLocation: 1,
      orderStatus: 1,
      _id: 0
    });

    if(activeOrders.length === 0) {
      res.status(400).json({message: "No Orders available"})
      return;
    }

    res.status(200).json({
      currentOrderDetails: null,
      activeOrders
    })
  } catch(err) {
    res.status(200).json({message: "Something went wrong"})
  }
};