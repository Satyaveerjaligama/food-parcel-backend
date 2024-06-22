const express = require("express");
const router = express.Router();
const restaurantControllers = require("../controllers/restaurantController");

router.post("/register", restaurantControllers.register);
router.post("/login", restaurantControllers.login);

module.exports = router;
