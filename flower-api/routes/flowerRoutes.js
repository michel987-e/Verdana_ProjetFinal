const express = require('express');
const router = express.Router();
const controller = require('../controllers/flowerController');

router.get('/', controller.getAllFlowers);

module.exports = router;