const express = require('express');
const router = express.Router();
const controller = require('../controllers/flowerController');

router.get('/', controller.getAllFlowers);
router.get('/:id', controller.getFlowerById);
router.get('/user/:user_id', controller.getFlowersByUserId);
router.post('/', controller.createFlower);
router.delete('/:id', controller.deleteFlower);
router.put('/:id', controller.updateFlower);

module.exports = router;