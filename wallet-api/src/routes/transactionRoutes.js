const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const transactionController = require('../controllers/transactionController');

router.get('/', authMiddleware, transactionController.getTransactionHistory);

module.exports = router;
