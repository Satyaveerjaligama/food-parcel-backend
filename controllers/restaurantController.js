const {Restaurant} = require('../models/restaurant');
const {RESPONSE_MESSAGES} = require("../utilities/constants");
const {generateUserId} = require("../utilities/utilityFunctions");

exports.register = async (req, res) => {
    try{
        let userId = generateUserId('restaurant');
        let restaurant = await Restaurant.findOne({ userId });

        while(restaurant) {
            userId = generateUserId('restaurant');
            restaurant = await Restaurant.findOne({ userId });
        }

        const newRestaurant = new Restaurant({...req.body, restaurantId: userId});
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