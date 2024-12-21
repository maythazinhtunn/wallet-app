const db = require('../config/db');
const bcrypt = require('bcryptjs');

const createUserTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    )
  `;
  db.query(query, (err, result) => {
    if (err) console.log('Error creating users table:', err);
  });
};

createUserTable();

const registerUser = (name, email, password, callback) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, hashedPassword], callback);
};

const findUserByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], callback);
};

module.exports = {
  registerUser,
  findUserByEmail,
};
