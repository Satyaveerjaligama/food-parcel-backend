const express = require("express");
const router = express.Router();
const restaurantControllers = require("../controllers/restaurantController");
const { attachGFS } = require("../config/gridfs");
const validateSchema = require("../validations/validateSchema");
const addMenuItem = require("../validations/schemas/addMenuItem");

router.post("/register", restaurantControllers.register);
router.get("/fetchRestaurants/:pincode", attachGFS, restaurantControllers.fetchRestaurants);
router.get("/fetchRestaurantDetails/:restaurantId", restaurantControllers.fetchRestaurantDetails);
router.post("/add-menu-item", validateSchema(addMenuItem), restaurantControllers.addMenuItem);

module.exports = router;
