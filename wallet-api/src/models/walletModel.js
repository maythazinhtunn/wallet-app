const db = require('../config/db');

const createWalletTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS wallets (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      balance DECIMAL(10, 2) NOT NULL DEFAULT 0,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `;
  db.query(query, (err, result) => {
    if (err) console.log('Error creating wallets table:', err);
  });
};

createWalletTable();


const addFunds = (userId, amount, callback) => {

    const checkWalletQuery = 'SELECT * FROM wallets WHERE user_id = ?';
    db.query(checkWalletQuery, [userId], (err, results) => {
      if (err) return callback(err);
  
      if (results.length === 0) {

        const createWalletQuery = 'INSERT INTO wallets (user_id, balance) VALUES (?, ?)';
        db.query(createWalletQuery, [userId, 0], (err, result) => {
          if (err) return callback(err);
          

          const addFundsQuery = 'UPDATE wallets SET balance = balance + ? WHERE user_id = ?';
          db.query(addFundsQuery, [amount, userId], callback);
        });
      } else {

        const addFundsQuery = 'UPDATE wallets SET balance = balance + ? WHERE user_id = ?';
        db.query(addFundsQuery, [amount, userId], callback);
      }
    });
  };

const withdrawFunds = (userId, amount, callback) => {

  const checkWalletQuery = 'SELECT * FROM wallets WHERE user_id = ?';
  db.query(checkWalletQuery, [userId], (err, results) => {
    if (err) return callback(err);

    if (results.length === 0) {
      return callback(new Error('Wallet does not exist'));
    }

    const currentBalance = results[0].balance;

    if (currentBalance < amount) {
      
      return callback(new Error('Insufficient funds'));
    }

    const withdrawQuery = 'UPDATE wallets SET balance = balance - ? WHERE user_id = ?';
    db.query(withdrawQuery, [amount, userId], callback);
  });
};

const getWalletBalance = (userId, callback) => {
  const query = 'SELECT balance FROM wallets WHERE user_id = ?';
  db.query(query, [userId], callback);
};

module.exports = {
  addFunds,
  withdrawFunds,
  getWalletBalance,
};
