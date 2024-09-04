// controllers/OrderProductsController.js

const client = require('../db/db');

const addOrderProduct = async (req, res) => {
    const { order_id, product_id } = req.body;
    try {
        await client.query(
            'INSERT INTO order_products (order_id, product_id) VALUES ($1, $2) ON CONFLICT (order_id, product_id) DO NOTHING',
            [order_id, product_id]
        );
        res.status(201).json({ message: 'Order product added successfully' });
    } catch (error) {
        console.error('Error adding order product', error);
        res.status(500).json({ error: 'Error adding order product' });
    }
};

const getOrderProducts = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM order_products');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching order products', error);
        res.status(500).json({ error: 'Error fetching order products' });
    }
};


const updateOrderProduct = async (req, res) => {
    const { order_id, product_id } = req.params;
    const { newOrderId, newProductId } = req.body;

    if (!newOrderId || !newProductId) {
        return res.status(400).json({ error: "Order ID and Product ID are required." });
    }

    try {
        await client.query(
            'UPDATE order_products SET order_id = $1, product_id = $2 WHERE order_id = $3 AND product_id = $4',
            [newOrderId, newProductId, order_id, product_id]
        );
        res.status(200).json({ message: 'Order product updated successfully' });
    } catch (error) {
        console.error('Error updating order product', error);
        res.status(500).json({ error: 'Error updating order product' });
    }
};


const deleteOrderProduct = async (req, res) => {
    const { order_id, product_id } = req.params;
    try {
        await client.query(
            'DELETE FROM order_products WHERE order_id = $1 AND product_id = $2',
            [order_id, product_id]
        );
        res.status(200).json({ message: 'Order product deleted successfully' });
    } catch (error) {
        console.error('Error deleting order product', error);
        res.status(500).json({ error: 'Error deleting order product' });
    }
};


module.exports = {
    addOrderProduct,
    getOrderProducts,
    updateOrderProduct,
    deleteOrderProduct,
};