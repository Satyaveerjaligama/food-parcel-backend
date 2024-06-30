const express = require("express");
const router = express.Router();
const deliveryAgentControllers = require("../controllers/deliveryAgentController");

router.post("/register", deliveryAgentControllers.register);

module.exports = router;
