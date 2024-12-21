const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    return emailRegex.test(email);
  };
  
  const isNonNegativeAmount = (amount) => {
    return typeof amount === 'number' && amount >= 0;
  };
  
  module.exports = { isValidEmail, isNonNegativeAmount };