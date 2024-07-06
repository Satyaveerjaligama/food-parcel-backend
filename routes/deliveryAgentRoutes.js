const express = require("express");
const router = express.Router();
const deliveryAgentControllers = require("../controllers/deliveryAgentController");

router.post("/register", deliveryAgentControllers.register);
router.post("/orders-info", deliveryAgentControllers.getOrderInfo);
router.get("/earnings/:deliveryAgentId", deliveryAgentControllers.getEarnings);

module.exports = router;
