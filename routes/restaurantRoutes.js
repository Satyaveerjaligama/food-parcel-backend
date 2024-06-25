const express = require("express");
const router = express.Router();
const restaurantControllers = require("../controllers/restaurantController");

router.post("/register", restaurantControllers.register);
router.post("/login", restaurantControllers.login);
router.get("/fetchRestaurants/:pincode", restaurantControllers.fetchRestaurants);
router.get("/fetchRestaurantDetails/:restaurantId", restaurantControllers.fetchRestaurantDetails);

module.exports = router;
