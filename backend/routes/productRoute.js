// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);


router.get('/:name', productController.getProductByName);
router.put('/:name', productController.updateProductByName);
router.delete('/:name', productController.deleteProductByName);



module.exports = router;


