const Customer = require("../models/customer");

exports.register = async (req, res) => {
    try{
        const newCustomer = new Customer(req.body);
        await newCustomer.save();
        res.status(201).send("Customer Registration Successful")
    } catch(err) {
        res.status(400).send(err.message)
    }
}