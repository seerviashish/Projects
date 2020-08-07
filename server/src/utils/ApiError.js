const config = require('../config/config');
const logger = require('../config/logger');

class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (['development', 'test'].includes(config.env)) {
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
        logger.error(`ServerError: [${message}] : ${this.stack}`);
      }
    } else {
      this.stack = 'That’s all we know.';
    }
  }
}

module.exports = ApiError;
