// hashPassword.js
const bcrypt = require('bcryptjs');

// hashed existing passwords in database
const plainTextPassword = 'longpass';

async function hashAndLogPassword() {
    try {
        const hashedPassword = await bcrypt.hash(plainTextPassword, 10);
        console.log('Hashed Password:', hashedPassword);
    } catch (error) {
        console.error('Error hashing password:', error);
    }
}

hashAndLogPassword();
