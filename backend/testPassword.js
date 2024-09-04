const bcrypt = require('bcrypt');

const password = '1234';
const hash = '$2b$10$EfI2Lx3kSKR0l5rANQ9HkuwFVJiqE9gu67vZ9YKVO6UCdZjtNRZ5a';

const result = bcrypt.compareSync(password, hash);
console.log(result);  // Should print `true` if the password matches the hash
