const express = require('express');

const UrlController = require('../controllers/url');

const router = express.Router();


router.post('', UrlController.create);

module.exports = router;
