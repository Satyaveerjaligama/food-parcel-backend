const express = require("express");
const router = express.Router();
const restaurantControllers = require("../controllers/restaurantController");
const { attachGFS } = require("../config/gridfs");
const validateSchema = require("../validations/validateSchema");
const addMenuItem = require("../validations/schemas/addMenuItem");

router.post("/register", restaurantControllers.register);
router.get("/fetch-restaurants/:pincode", attachGFS, restaurantControllers.fetchRestaurants);
router.get("/fetch-restaurant-details/:restaurantId", restaurantControllers.fetchRestaurantDetails);
router.get("/get-menu-items/:restaurantId", attachGFS, restaurantControllers.getMenuItems);
router.post("/menu-item", validateSchema(addMenuItem), restaurantControllers.addMenuItem);
router.patch("/menu-item/:itemId", validateSchema(addMenuItem), restaurantControllers.updateMenuItem);
router.delete("/menu-item", restaurantControllers.deleteMenuItem);

module.exports = router;
