const Response = require('./response');

module.exports = (fn) => async (req, res, next) => {
  try {
    const {
      data,
      statusCode = 200,
      message = 'API executed successfully',
    } = await fn(req, res, next);
    Response.send(res, data, statusCode, message);
  } catch (err) {
    next(err);
  }
};
