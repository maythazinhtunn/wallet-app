const walletModel = require('../models/walletModel');
const transactionModel = require('../models/transactionModel');
const { isNonNegativeAmount } = require('../utils/validators');
const logger = require('../utils/logger'); 

const addFunds = (req, res) => {
  const userId = req.user.id;
  const { amount } = req.body;
  logger.info(`User ID: ${userId} requested to add funds: ${amount}`);
  if (!isNonNegativeAmount(amount)) {
    logger.warn(`Invalid amount provided by user ID: ${userId}, Amount: ${amount}`);
    return res.status(400).json({ msg: 'Amount must be a non-negative number' });
  }

  walletModel.addFunds(userId, amount, (err) => {
    if (err) {
      logger.error(`Error adding funds for user ID: ${userId}, Amount: ${amount}, Error: ${err.message}`);
      return res.status(500).json({ msg: 'Error adding funds', error: err });
    }

    logger.info(`Funds added successfully for user ID: ${userId}, Amount: ${amount}`);
    transactionModel.recordTransaction(userId, amount, 'add', (transactionErr) => {
      if (transactionErr) {
        logger.error(`Error recording transaction for user ID: ${userId}, Amount: ${amount}, Error: ${transactionErr.message}`);
        return res.status(500).json({ msg: 'Error recording transaction', error: transactionErr });
      }
      logger.info(`Transaction recorded successfully for user ID: ${userId}, Amount: ${amount}, Type: add`);
      res.json({ msg: 'Funds added successfully' });
    });
  });
};

const withdrawFunds = (req, res) => {
  const userId = req.user.id;
  const { amount } = req.body;

  logger.info(`User ID: ${userId} requested to withdraw funds: ${amount}`);

  if (!isNonNegativeAmount(amount)) {
    logger.warn(`Invalid amount provided by user ID: ${userId}, Amount: ${amount}`);
    return res.status(400).json({ msg: 'Amount must be a non-negative number' });
  }

  walletModel.getWalletBalance(userId, (err, result) => {
    if (err) {
      logger.error(`Error retrieving wallet balance for user ID: ${userId}, Error: ${err.message}`);
      return res.status(500).json({ msg: 'Error retrieving wallet balance' });
    }

    if (result[0].balance < amount) {
      logger.warn(`Insufficient balance for user ID: ${userId}, Requested Amount: ${amount}, Available Balance: ${result[0].balance}`);
      return res.status(400).json({ msg: 'Insufficient balance' });
    }

    walletModel.withdrawFunds(userId, amount, (err) => {
      if (err) {
        logger.error(`Error withdrawing funds for user ID: ${userId}, Amount: ${amount}, Error: ${err.message}`);
        return res.status(500).json({ msg: 'Error withdrawing funds' });
      }

      logger.info(`Funds withdrawn successfully for user ID: ${userId}, Amount: ${amount}`);
      transactionModel.recordTransaction(userId, amount, 'withdraw', (transactionErr) => {
        if (transactionErr) {
          logger.error(`Error recording withdrawal transaction for user ID: ${userId}, Amount: ${amount}, Error: ${transactionErr.message}`);
          return res.status(500).json({ msg: 'Error recording transaction' });
        }

        logger.info(`Transaction recorded successfully for user ID: ${userId}, Amount: ${amount}, Type: withdraw`);
        res.json({ msg: 'Funds withdrawn successfully' });
      });
    });
  });
};


module.exports = {
  addFunds,
  withdrawFunds,
};
