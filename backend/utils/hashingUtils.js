// utils/hashingUtils.js
const bcrypt = require('bcryptjs');

// Function to hash a password
async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

async function comparePassword(plainTextPassword, hashedPassword) {
    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    return isMatch;
}


module.exports = {
    hashPassword,
    comparePassword,
};