const {Hotel} = require('../models/hotel');

exports.register = async (req, res) => {
    try{
        const newHotel = new Hotel(req.body);
        await newHotel.save()
        res.status(201).send("Hotel registration successful")
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
            res.status(400).json({message: "Match not found"})
        } else {
            res.status(200).json(doc);
        }
    }).catch((err)=>{
        res.status(400).json({message: err.message})
    })
}