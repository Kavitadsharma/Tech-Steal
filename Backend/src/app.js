const path = require('path');
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const requestLogger = require('./middleware/request-logger');
const Response = require('./utils/response');
const AppError = require('./utils/app-error');
const router = require('./routes');
const { gEnv } = require('./utils/env');

const app = express();

app.disable('etag').disable('x-powered-by');

app.use('/static', express.static(path.join(__dirname, '../public')));

app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.options(
  '/api',
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

//Logs request to the console
if (gEnv('NODE_ENV') !== 'production') {
  app.use(requestLogger);
}

// Secure Headers
app.use(helmet());

// Rate limiting on a route
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try after sometime',
});

app.use('/api', limiter);

// Body parser
app.use(express.json({ limit: '100kb' }));

// Url encoder
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Sanitize Data sending before mongodb
app.use(mongoSanitize());

// Secure from cross-site scripting
app.use(xss());

// Prevent from parameter pollution
app.use(
  hpp({
    whitelist: [],
  })
);

// Response compressor
app.use(compression());

// Initialize Routes
router(app);

// Route not found Error
app.use('*', (req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// Global Error handler
app.use(Response.sendError);

module.exports = app;
