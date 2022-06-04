const express = require('express');

const productController = require('../controllers/product');

const router = express.Router();

router.get('/readAll', productController.readAll);

router.post('/create', productController.create);

router.get('/read/:productId', productController.read);

router.patch('/update/:productId', productController.update);

router.delete('/delete/:productId', productController.delete);

module.exports = router;