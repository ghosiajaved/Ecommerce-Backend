// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/', orderController.getAllOrders);
router.post('/', orderController.createOrder);
//router.get('/:id', orderController.getOrderById);
router.put('/:id', orderController.updateOrderById);
router.delete('/:id', orderController.deleteOrderById); 


module.exports = router;
