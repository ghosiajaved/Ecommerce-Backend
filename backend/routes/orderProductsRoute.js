const express = require('express');
const router = express.Router();
const orderProductsController = require('../controllers/orderProductsController');


router.post('/', orderProductsController.addOrderProduct);
router.get('/', orderProductsController.getOrderProducts);
router.put('/:order_id/:product_id', orderProductsController.updateOrderProduct);
router.delete('/:order_id/:product_id', orderProductsController.deleteOrderProduct);



module.exports = router;
