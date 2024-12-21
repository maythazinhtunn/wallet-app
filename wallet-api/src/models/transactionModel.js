const db = require('../config/db');
const createTransactionTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS transactions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      amount DECIMAL(10, 2) NOT NULL,
      type ENUM('add', 'withdraw') NOT NULL,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `;
  db.query(query, (err, result) => {
    if (err) console.log('Error creating transactions table:', err);
  });
};

createTransactionTable();

const recordTransaction = (userId, amount, type, callback) => {
  const query = 'INSERT INTO transactions (user_id, amount, type) VALUES (?, ?, ?)';
  db.query(query, [userId, amount, type], callback);
};

const getTransactionHistory = (userId, callback) => {
  const query = `
    SELECT 
      id, 
      user_id, 
      FORMAT(amount, 2) AS amount,  -- Ensures two decimal places
      type, 
      timestamp 
    FROM transactions 
    WHERE user_id = ?`;
  db.query(query, [userId], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    const formattedResults = results.map((transaction) => ({
      ...transaction,
      amount: parseFloat(transaction.amount),
    }));
    callback(null, formattedResults);
  });
};

module.exports = {
  recordTransaction,
  getTransactionHistory,
};
