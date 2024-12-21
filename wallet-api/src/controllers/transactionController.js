const transactionModel = require('../models/transactionModel');
const logger = require('../utils/logger'); 

const getTransactionHistory = (req, res) => {
  const userId = req.user.id;
  logger.info(`Transaction history request for user ID: ${userId}`);
  transactionModel.getTransactionHistory(userId, (err, result) => {
    if (err) {
      logger.error(`Error retrieving transaction history for user ID: ${userId}, Error: ${err.message}`);
      return res.status(500).json({ msg: 'Error retrieving transaction history' });
    }
    logger.info(`Transaction history retrieved successfully for user ID: ${userId}`);
    res.json(result);
  });
};

module.exports = {
  getTransactionHistory,
};
