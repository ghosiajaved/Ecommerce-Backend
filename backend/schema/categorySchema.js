// schema/categorySchema.js
const client = require('../db/db');

const createCategoryTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS categories (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        );
    `;
    await client.query(query);
};

createCategoryTable();
