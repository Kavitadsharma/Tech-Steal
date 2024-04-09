const jwt = require('jsonwebtoken');
const { gEnv } = require('../utils/env');

const authmpin = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (token) {
      jwt.verify(token, gEnv('JWT_SECRET_MPIN'), (err, decoded) => {
        if (err) {
          res.status(400).send({
            msg: 'Invalid token. Please login',
          });
        } else {
          req.body.userId = decoded.userId;
          next();
        }
      });
    } else {
      return res.status(401).send({
        msg: 'Access Denied/Not Authorized. Please login',
      });
    }
  } catch (error) {
    return res.status(500).send({
      msg: error.message,
    });
  }
};

module.exports = { authmpin };