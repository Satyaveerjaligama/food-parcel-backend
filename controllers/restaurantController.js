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

// This API will fetch all restaurants based on the pincode that we provide
exports.fetchRestaurants = async(req, res) => {
    const pincode = req.params?.pincode;
    try {
        const restaurants = await Restaurant.find({pincode},{restaurantId: 1, restaurantName: 1, restaurantType: 1, _id: 0});
        res.status(200).json(restaurants);
    } catch(err) {
        res.status(400).json({message: err.message})
    }
};

// This api will fetch the restaurant details based on the restaurant id
exports.fetchRestaurantDetails = async(req, res) => {
    const restaurantId = req.params?.restaurantId;
    try {
        const restaurants = await Restaurant.find({restaurantId},{restaurantId: 1, restaurantName: 1, restaurantType: 1, _id: 0});
        res.status(200).json(restaurants[0]);
    } catch(err) {
        res.status(400).json({message: err.message})
    }
}