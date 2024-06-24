const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.post("/register", customerController.register);
router.post("/login", customerController.login);
router.get("/fetchRestaurants/:pincode", customerController.fetchRestaurants);

module.exports = router;
