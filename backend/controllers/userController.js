const client = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;
const SALT_ROUNDS = 10;

// Signup Controller
exports.signup = async (req, res) => {
    console.log('Signup request received');
    const { username, email, password } = req.body;

    try {
        // Check if the email already exists
        const emailCheck = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        if (emailCheck.rows.length > 0) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const result = await client.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );

        // Generate a JWT token
        const token = jwt.sign({ id: result.rows[0].user_id }, secret, { expiresIn: '1h' });

        // Respond with the token and user info (excluding the password)
        res.status(201).json({ token, user: { username, email } });
    } catch (error) {
        res.status(500).json({ message: 'Error during signup', error: error.message });
    }
};

// Login Controller
exports.login = async (req, res) => {
    //console.log(req.body);
    const { email, password } = req.body;
    try {
        const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
};



// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const result = await client.query('SELECT id, username, email FROM users');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await client.query('SELECT id, username, email FROM users WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create new user
exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the email already exists
        const emailCheck = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        if (emailCheck.rows.length > 0) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const result = await client.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
            [username, email, hashedPassword]
        );

        // Generate a JWT token
        const token = jwt.sign({ id: result.rows[0].id }, secret, { expiresIn: '1h' });

        // Respond with the token and user info (excluding the password)
        res.status(201).json({ token, user: { username, email } });
    } catch (error) {
        res.status(500).json({ message: 'Error during signup', error: error.message });
    }

};



// Update user by ID
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;
        const result = await client.query(
            'UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING id, username, email',
            [username, email, password, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await client.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
