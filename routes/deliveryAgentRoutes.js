const express = require("express");
const router = express.Router();
const deliveryAgentControllers = require("../controllers/deliveryAgentController");
const validateSchema = require("../validations/validateSchema");
const ordersInfoSchema = require("../validations/schemas/ordersInfoSchema");

router.post("/register", deliveryAgentControllers.register);
router.post("/orders-info", validateSchema(ordersInfoSchema), deliveryAgentControllers.getOrderInfo);
router.get("/earnings/:deliveryAgentId", deliveryAgentControllers.getEarnings);

module.exports = router;
