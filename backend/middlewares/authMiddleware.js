const jwt = require('jsonwebtoken'); 
const secret = process.env.SECRET_KEY;

// Middleware to verify JWT
/* function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log('Authorization Header:', authHeader);  // Check if the header is being received

    const token = authHeader && authHeader.split(' ')[1];
    console.log('Extracted Token:', token);  // Check if the token is being extracted

    if (token == null) {
        return res.status(401).json({ message: 'Token required' });
    }

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            console.log('Token Verification Error:', err.message);  // Debug: Check if the token is valid
            return res.status(403).json({ message: 'Token is invalid' });
        }
        req.user = user;
        next();
    });
}

module.exports = verifyToken; */

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) return res.status(403).json({ error: 'Access denied' });

    try {
        const verified = jwt.verify(token, secret);
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authenticateToken;
