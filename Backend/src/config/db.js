const { gEnv } = require('../utils/env');

const environment = gEnv('NODE_ENV', 'development');
const connectionUrl = gEnv('DB_CONNECTION');

module.exports = {
  [environment]: {
    connectionUri: connectionUrl,
    // .replace('<DB_PASSWORD>', getEnv('DB_PASSWORD'))
    // .replace('<DB_NAME>', getEnv('DB_NAME')),
  },
};
