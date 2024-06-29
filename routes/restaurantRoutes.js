const express = require("express");
const router = express.Router();
const restaurantControllers = require("../controllers/restaurantController");
const { attachGFS } = require("../config/gridfs");

router.post("/register", restaurantControllers.register);
router.post("/login", restaurantControllers.login);
router.get("/fetchRestaurants/:pincode", attachGFS, restaurantControllers.fetchRestaurants);
router.get("/fetchRestaurantDetails/:restaurantId", restaurantControllers.fetchRestaurantDetails);

module.exports = router;
