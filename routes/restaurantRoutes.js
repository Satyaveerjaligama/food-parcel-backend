const express = require("express");
const router = express.Router();
const restaurantControllers = require("../controllers/restaurantController");
const {upload, attachGFS} = require('../config/gridfs');

router.post("/register", restaurantControllers.register);
router.post("/login", restaurantControllers.login);
router.get("/fetchRestaurants/:pincode", restaurantControllers.fetchRestaurants);
router.get("/fetchRestaurantDetails/:restaurantId", restaurantControllers.fetchRestaurantDetails);
router.post('/upload/:restaurantId',attachGFS, upload.single('file'), restaurantControllers.uploadFile);

module.exports = router;
