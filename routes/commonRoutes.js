const express = require('express');
const router = express.Router();
const {upload, attachGFS} = require('../config/gridfs');
const commonControllers = require('../controllers/commonControllers');

router.post('/file/upload/:id', attachGFS, upload.single('file'), commonControllers.fileUpload);
router.get('/file/:type/:id', attachGFS, commonControllers.getImageById);

module.exports = router;