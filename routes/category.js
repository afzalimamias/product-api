const express = require('express');

const categoryController = require('../controllers/category');

const router = express.Router();

router.get('/readAll', categoryController.readAll);

router.get('/read/:categoryId', categoryController.read);

router.post('/create', categoryController.create);

router.patch('/update/:categoryId', categoryController.update);

router.delete('/delete/:categoryId', categoryController.delete);

module.exports = router;