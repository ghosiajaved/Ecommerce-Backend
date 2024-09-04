// axiosConfig.js
const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000/api';

// Create and export an axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

module.exports = api;
