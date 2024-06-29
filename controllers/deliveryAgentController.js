const { DeliveryAgent } = require("../models/deliveryAgent");
const { RESPONSE_MESSAGES } = require("../utilities/constants");
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
