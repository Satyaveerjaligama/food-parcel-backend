const express = require('express');
const router = express.Router();
const {upload, attachGFS} = require('../config/gridfs');
const commonControllers = require('../controllers/commonControllers');
const validateSchema = require('../validations/validateSchema');
const changePassword = require('../validations/schemas/changePassword');
const updateAccountDetailsSchema = require('../validations/schemas/updateAccountDetailsSchema');

router.post('/login', commonControllers.login);
router.post('/file/upload/:id', attachGFS, upload.single('file'), commonControllers.fileUpload);
router.get('/file/:type/:id', attachGFS, commonControllers.getImageById);
router.patch('/delete/:type/:id', commonControllers.delete);
router.patch('/change-password', validateSchema(changePassword), commonControllers.changePassword);
router.patch('/update-account-details', validateSchema(updateAccountDetailsSchema), commonControllers.updateAccountDetails);
router.post('/all-orders', commonControllers.getAllOrders);

module.exports = router;