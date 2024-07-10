const express = require('express');
const router = express.Router();
const {upload, attachGFS} = require('../config/gridfs');
const commonControllers = require('../controllers/commonControllers');
const validateSchema = require('../validations/validateSchema');
const changePassword = require('../validations/schemas/changePassword');
const updateAccountDetailsSchema = require('../validations/schemas/updateAccountDetailsSchema');
const loginSchema = require('../validations/schemas/loginSchema');
const allOrdersSchema = require('../validations/schemas/allOrdersSchema');

router.post('/login', validateSchema(loginSchema), commonControllers.login);
router.post('/file/upload/:id', attachGFS, upload.single('file'), commonControllers.fileUpload);
router.get('/file/:type/:id', attachGFS, commonControllers.getImageById);
router.patch('/delete/:type/:id', commonControllers.delete);
router.patch('/change-password', validateSchema(changePassword), commonControllers.changePassword);
router.patch('/update-account-details', validateSchema(updateAccountDetailsSchema), commonControllers.updateAccountDetails);
router.post('/all-orders', validateSchema(allOrdersSchema), commonControllers.getAllOrders);

module.exports = router;