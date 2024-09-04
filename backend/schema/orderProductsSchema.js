const client = require('../db/db');

const createOrderProductTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS order_products (
           order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
           product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
           PRIMARY KEY (order_id, product_id)
        );
    `;
    await client.query(query);
};

createOrderProductTable();