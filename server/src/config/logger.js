const winston = require('winston');
const path = require('path');
const config = require('./config');
require('winston-daily-rotate-file');

const transport = new winston.transports.DailyRotateFile({
  filename: path.join(__dirname, '../../logs/message-server-%DATE%.log'),
  datePattern: 'DD-MM-YYYY',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '30d',
});

// timezone function winston calls to get timezone(ASIA/KOLKATA)

const timezoned = () =>
  new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
  });

// options for logger object
const options = {
  file: {
    level: config.env === 'development' ? 'debug' : 'info',
    filename: path.join(__dirname, '../../logs/message-server.log'),
    handleExceptions: true,
    json: true,
    maxsize: 5242880 * 2, // 10MB
    maxFiles: 1,
  },
  console: {
    level: config.env === 'development' ? 'debug' : 'error',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

// logger object with above defined options
const logger = winston.createLogger({
  transports: [new winston.transports.File(options.file), new winston.transports.Console(options.console), transport],
  format: winston.format.combine(
    winston.format.simple(),
    winston.format.timestamp({
      format: timezoned,
    }),
    winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  exitOnError: false,
});

// writing file
logger.stream = {
  write(message) {
    logger.info(message);
  },
};

module.exports = logger;
