const express = require('express');
const router = express.Router();
const orderControllers = require('../controllers/orderController');

router.post('/create', orderControllers.create);
router.patch('/update-order-info', orderControllers.updateOrderInfo);

module.exports = router;