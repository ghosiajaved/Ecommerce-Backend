// schema/orderSchema.js
const client = require('../db/db');

const createOrderTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS orders (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            product INTEGER REFERENCES products(id) ON DELETE CASCADE,
            quantity INTEGER NOT NULL,
            order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    await client.query(query);
};

createOrderTable();
