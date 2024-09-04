// schema/productSchema.js
const { Client } = require('pg');
const client = require('../db/db');

const createProductTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            price DECIMAL(10, 2) NOT NULL,
            quantity INTEGER NOT NULL,
            cat_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
        );
    `;
    await client.query(query);
};

createProductTable();
