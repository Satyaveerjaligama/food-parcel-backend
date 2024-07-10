const {Customer} = require("../models/customer");
const {RESPONSE_MESSAGES} = require("../utilities/constants");
const {generateUserId} = require("../utilities/utilityFunctions");

exports.register = async (req, res) => {
    try{
        let userId = generateUserId('customer');
        let customer = await Customer.findOne({ userId });

        while(customer) {
            userId = generateUserId('customer');
            customer = await Customer.findOne({ userId });
        }

        const newCustomer = new Customer({...req.body, customerId: userId});
        await newCustomer.save();
        res.status(201).send(`Customer ${RESPONSE_MESSAGES.registrationSuccess}`)
    } catch(err) {
        res.status(500).json({message: err.message});
    }
}
