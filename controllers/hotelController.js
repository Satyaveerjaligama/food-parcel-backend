const Hotel = require('../models/hotel');

exports.register = async (req, res) => {
    try{
        const newHotel = new Hotel(req.body);
        await newHotel.save()
        res.status(201).send("Hotel registration successful")
    } catch(err) {
        res.status(404).send(err.message);
    }
}