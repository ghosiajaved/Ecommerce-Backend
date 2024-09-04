const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');

// Parse incoming JSON requests
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3001', 
    credentials: true
}));
//cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});


// Import Routes
const productRoutes = require('./routes/productRoute');    // Checked all of these using POSTMAN 
const userRoutes = require('./routes/userRoute');
const orderRoutes = require('./routes/orderRoute');
const categoryRoutes = require('./routes/categoryRoute');
const orderProductsRoutes= require('./routes/orderProductsRoute')
//const authRoutes = require('./routes/authRoute');


// Apply Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/order-products', orderProductsRoutes);
//app.use('/api/auth', authRoutes);


// Import middlewares
const logger = require('./middlewares/logger');
const requestTime = require('./middlewares/requestTime');

// Apply middleware
app.use(logger);
app.use(requestTime);

// Root route
app.get('/', (req, res) => {

    res.cookie("name", "Ghosia");              // Checked using: Edit this cookie extension
    console.log(req.cookies);

    let responseText = 'Welcome to the Ecommerce API With Axios!<br>';
    responseText += `<small>Requested at: ${req.requestTime}</small>`;
    res.send(responseText);

});


// Import error handlers
const notFound = require('./errors/notFound');
const validationError = require('./errors/validationError');
const errorHandler = require('./errors/errorHandler');

// Apply Error handling middlewares
app.use(notFound);
app.use(validationError);
app.use(errorHandler);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
