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

exports.login = async (req, res) => {
  DeliveryAgent.find({
    emailId: req.body.emailId,
    password: req.body.password,
  })
    .then((doc) => {
      if (doc.length === 0) {
        res.status(400).json({ message: RESPONSE_MESSAGES.detailsNotFound });
      } else if (!doc[0].isActive) { 
        res.status(400).json({message: RESPONSE_MESSAGES.userIsInactive})
      } else {
        res.status(200).json(doc);
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};
