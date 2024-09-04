const client = require('../db/db');

exports.getAllOrders = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM orders');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.deleteOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await client.query(
            'DELETE FROM orders WHERE id = $1 RETURNING *',
            [id]
        );
        if (result.rows.length === 0) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.createOrder = async (req, res) => {
    const { user_id, product, quantity } = req.body;

    try {
        // Insert order into orders table
        const newOrder = await client.query(
            'INSERT INTO orders (user_id, product, quantity) VALUES ($1, $2, $3) RETURNING *',
            [user_id, product, quantity]
        );

        const orderId = newOrder.rows[0].id;

        // Insert into order_products table
        await client.query(
            'INSERT INTO order_products (order_id, product_id) VALUES ($1, $2)',
            [orderId, product]
        );

        res.status(201).json(newOrder.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
}; 



exports.updateOrderById = async (req, res) => {
    const { id } = req.params;
    const { user_id, product, quantity } = req.body;

    try {
        const result = await client.query(
            `UPDATE orders SET user_id = $1, product = $2, quantity = $3 WHERE id = $4 RETURNING *`,
            [user_id, product, quantity, id]
        );
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

