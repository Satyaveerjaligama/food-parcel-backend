const {Customer} = require("../models/customer");
const {RESPONSE_MESSAGES} = require("../utilities/constants");

exports.register = async (req, res) => {
    try{
        const newCustomer = new Customer(req.body);
        await newCustomer.save();
        res.status(201).send(`Customer ${RESPONSE_MESSAGES.registrationSuccess}`)
    } catch(err) {
        res.status(400).send(err.message)
    }
}

exports.login = async(req, res) => {
    Customer.find({
        emailId: req.body.emailId,
        password: req.body.password
    }).then((doc)=>{
        if(doc.length === 0) res.status(400).json({message: RESPONSE_MESSAGES.detailsNotFound})
        else res.status(200).json(doc)
    }).catch((err) => {
        res.status(400).json({message: err.message})
    })
}