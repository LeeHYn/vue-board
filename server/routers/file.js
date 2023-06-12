const express = require('express');
const fileRouter = express.Router();
const multer = require('multer');
const fileController = require("../controllers/fileController")

const upload = multer({ dest: 'uploads/' });

fileRouter.post('/file/upload', upload.single('file'), fileController.uploadFile);

module.exports = fileRouter;