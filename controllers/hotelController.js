const {Hotel} = require('../models/hotel');
const {RESPONSE_MESSAGES} = require("../utilities/constants");

exports.register = async (req, res) => {
    try{
        const newHotel = new Hotel(req.body);
        await newHotel.save()
        res.status(201).send(`Hotel ${RESPONSE_MESSAGES.registrationSuccess}`)
    } catch(err) {
        res.status(404).send(err.message);
    }
}

exports.login = async (req,res) => {
    Hotel.find({
        emailId: req.body.emailId,
        password: req.body.password,
    }).then((doc)=>{
        if(doc.length === 0) {
            res.status(400).json({message: RESPONSE_MESSAGES.detailsNotFound})
        } else {
            res.status(200).json(doc);
        }
    }).catch((err)=>{
        res.status(400).json({message: err.message})
    })
}