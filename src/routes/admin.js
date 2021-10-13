const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');

router.get('/create/products', adminController.check, adminController.createProduct);
router.get('/edit/products/:id', adminController.check, adminController.editProduct);
router.get('/stored/products',adminController.check ,adminController.storedProducts);
router.get('/trash/products',adminController.check, adminController.trashProducts);
module.exports = router;

