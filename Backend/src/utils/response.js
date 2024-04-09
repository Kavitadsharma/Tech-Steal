const AppError = require('./app-error');
const { gEnv } = require('./env');

class Response {
  static handleValidationErrorDB(err) {
    const message = err.message.split(': ').pop();
    return new AppError(message, 400);
  }

  static handleCastErrorDB(err) {
    const message = `Invalid value: ${err.value} for path: ${err.path}.`;
    return new AppError(message, 400);
  }

  static handleDuplicateKeyErrorDB(err) {
    let message;
    if (err.keyValue) {
      message = `Duplicate value for field(s): ${Object.keys(
        err.keyValue
      )}. Please enter another value`;
    } else {
      message = 'Duplicate value error';
    }

    return new AppError(message, 401);
  }

  static handleJWTError() {
    return new AppError('Invalid token. Please login again', 400);
  }

  static handleJWTExpireError() {
    return new AppError('Your token has expired. Please login again', 400);
  }

  static dev(err, req, res) {
    return res.status(err.statusCode).json({
      isSuccess: false,
      status: err.status,
      message: err.message,
      method: req.method,
      error: err,
      stack: err.stack,
    });
  }

  static send(res, data, statusCode = 200, message = undefined) {
    res.status(statusCode).json({
      isSuccess: true,
      status: 'success',
      message,
      data,
    });
  }

  static sendError(err, req, res, next) {
    err.statusCode = err.statusCode ? err.statusCode : 500;
    err.status = `${err.statusCode}`.startsWith('4') ? 'fail' : 'error';
    if (gEnv('NODE_ENV', 'development') === 'development') {
      if (err.name === 'ValidationError') err = Response.handleValidationErrorDB(err);
      if (err.name === 'CastError') err = Response.handleCastErrorDB(err);
      if (err.name === 'JsonWebTokenError') err = Response.handleJWTError();
      if (err.name === 'TokenExpiredError') err = Response.handleJWTExpireError();
      if (err.code === 11000) err = Response.handleDuplicateKeyErrorDB(err);
      Response.dev(err, req, res);
    } else {
      return res.status(err.statusCode).json({
        isSuccess: false,
        status: err.status,
        message: err.message,
      });
    }
  }
}

module.exports = Response;
