const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const walletController = require('../controllers/walletController');

router.post('/add', authMiddleware, walletController.addFunds);

router.post('/withdraw', authMiddleware, walletController.withdrawFunds);

module.exports = router;
