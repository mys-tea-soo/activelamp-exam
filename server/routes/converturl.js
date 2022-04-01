const express = require('express');

const ConvertedUrl = require('../controllers/converturl');

const router = express.Router();

router.get('/', ConvertedUrl.getAllUrlConvert);

router.post('/', ConvertedUrl.postUrlConvert);

router.get('/:id', ConvertedUrl.getByIdConvert);

module.exports = router;
