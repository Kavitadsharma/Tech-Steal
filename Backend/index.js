const { createServer } = require('http');
const mongoose = require('mongoose');

const { gEnv, normalizePort } = require('./src/utils/env');
const logger = require('./src/utils/logger');
const config = require('./src/config/db');

process.on('uncaughtException', (err) => {
  console.log('Uncaught Excception! Shutting down...');
  console.log(`name: ${err.name} message: ${err.message}`);
  console.log(err);
  process.exit(1);
});

const app = require('./src/app');
const Admin = require('./src/models/admin');

/**
 * Get port from environment and store in Express.
 */
let port = normalizePort(gEnv('PORT', 8080));
app.set('port', port);

/**
 * Database Url
 */
const DB_URI = config[gEnv('NODE_ENV', 'development')].connectionUri;

/**
 * Max Attempts For Connection
 */
const MAX_DB_CONNECTION_ATTEMPT = 3;
let dbAttempts = 0;

/**
 * Create HTTP server.
 */
const server = createServer(app);

/**
 * Connect to database
 */
const connect = (DB_URI) => {
  mongoose
    .connect(DB_URI)
    .then(async () => {
      logger.info('connected to database');
      if (!gEnv('ADMIN_EMAIL') || !gEnv('ADMIN_PASSWORD')) return;
      const user = await Admin.findOne({ email: gEnv('ADMIN_EMAIL') });
      if (user) return logger.info('User already present');
      await Admin.create({
        email: gEnv('ADMIN_EMAIL'),
        password: gEnv('ADMIN_PASSWORD'),
      });
    })
    .catch(() => logger.error('Error connecting to database'));
};

/**
 * Start Server
 * @param {string} DB_URI
 * @returns {void}
 */
const start = async (DB_URI) => {
  mongoose.connection.on('error', () => {
    if (MAX_DB_CONNECTION_ATTEMPT > dbAttempts) {
      logger.error('Retrying connection');
      connect(DB_URI);
      dbAttempts += 1;
    } else {
      process.exit(1);
    }
  });
  server.listen(port, () => connect(DB_URI));
};

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error) => {
  if (error.syscall !== 'listen') throw error;
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      port += 1;
      logger.error(`${bind} is already in use, trying ${port}`);
      server.listen(port);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port: ${address.port}`;

  logger.info(`🚀 We are live on ${bind}`);
};

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection! Shutting down...');
  console.log(`error: ${err.name} message: ${err.message}`);
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

/**
 * Establish Connection
 */
start(DB_URI);

/**
 * Listen on provided port, on all network interfaces.
 */
server.on('error', onError);
server.on('listening', onListening);
