const { Client } = require('pg');
require('dotenv').config();

// Database connection
const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

client.connect()
    .then(() => console.log("Connected to the database"))
    .catch(err => console.error('Connection error', err.stack));

module.exports = client;