const {Restaurant} = require('../models/restaurant');
const {RESPONSE_MESSAGES} = require("../utilities/constants");

exports.register = async (req, res) => {
    try{
        const newRestaurant = new Restaurant(req.body);
        await newRestaurant.save()
        res.status(201).send(`Restaurant ${RESPONSE_MESSAGES.registrationSuccess}`)
    } catch(err) {
        res.status(404).send(err.message);
    }
}

exports.login = async (req,res) => {
    Restaurant.find({
        emailId: req.body.emailId,
        password: req.body.password,
    }).then((doc)=>{
        if(doc.length === 0) {
            res.status(400).json({message: RESPONSE_MESSAGES.detailsNotFound})
        } else if (!doc[0].isActive) { 
            res.status(400).json({message: RESPONSE_MESSAGES.userIsInactive})
        } else {
            res.status(200).json(doc);
        }
    }).catch((err)=>{
        res.status(400).json({message: err.message})
    })
}