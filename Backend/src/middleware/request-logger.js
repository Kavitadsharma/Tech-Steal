const morgan = require('morgan');
const { gEnv } = require('../utils/env');
const logger = require('../utils/logger');

logger.stream = {
  write: (message) => logger.info(message.substring(0, message.lastIndexOf('\n'))),
};

module.exports = morgan(':method :url :status :response-time ms - :res[content-length]', {
  stream: logger.stream,
  skip: () => gEnv('NODE_ENV') === 'test',
});
