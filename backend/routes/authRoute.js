// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;
const client = require('../db/db'); 
const { comparePassword } = require('../utils/hashingUtils');

//http://localhost:3000/api/auth/login using post method and correct credentials returns token

router.post('/login', async (req, res) => {  
    try {
        const { email, password } = req.body;

        console.log('Received Email:', email);
        console.log('Received Password:', password);

        // Find the user by email
        const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            console.log('User not found');
            return res.status(401).send('Invalid credentials');
        }

        const user = result.rows[0];

        console.log('Stored Hashed Password:', user.password);

        // Compare the provided password with the hashed password
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }

        // Generate a JWT token
        const token = jwt.sign({ email: user.email, id: user.user_id }, secret, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});

module.exports = router;
