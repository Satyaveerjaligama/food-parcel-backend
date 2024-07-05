const express = require('express');
const router = express.Router();
const orderControllers = require('../controllers/orderController');

router.post('/create', orderControllers.create);
router.patch('/update-status', orderControllers.updateStatus);

module.exports = router;