const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const userModel = require('../models/userModel');
const {isValidEmail} = require('../utils/validators');
const logger = require('../utils/logger'); 
const secretKey = process.env.JWT_SECRET || 'wallet';

const register = (req, res) => {
  const { name, email, password } = req.body;

  if (!isValidEmail(email)) {
    logger.warn(`Invalid email format: ${email}`);
    return res.status(400).json({ msg: 'Invalid email format' });
  }

  userModel.registerUser(name, email, password, (err, result) => {
    if (err) {
      logger.error(`Error registering user: ${email}, Error: ${err.message}`);
      return res.status(500).json({ msg: 'Error registering user' });
    }
    logger.info(`User registered successfully: ${email}`);
    res.status(201).json({ msg: 'User registered successfully' });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  userModel.findUserByEmail(email, (err, result) => {
    if (err || !result[0]) {
      logger.warn(`Invalid credentials for user: ${email}`);
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = bcrypt.compareSync(password, result[0].password);
    if (!isMatch) {
      logger.warn(`Invalid credentials for user: ${email}`);
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.encode({ user: result[0] }, secretKey);

    logger.info(`User logged in successfully: ${email}`);
    res.json({
      name: result[0].name,
      token,
    });
  });
};

module.exports = {
  register,
  login,
};
