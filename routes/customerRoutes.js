const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const validateSchema = require("../validations/validateSchema");
const customerRegistrationSchema = require("../validations/schemas/customerRegistrationSchema");

router.post("/register", validateSchema(customerRegistrationSchema), customerController.register);

module.exports = router;
