const express = require("express");
const router = express.Router();
const hotelControllers = require("../controllers/hotelController");

router.post("/register", hotelControllers.register);

module.exports = router;