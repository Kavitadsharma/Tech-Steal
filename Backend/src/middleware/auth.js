const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const { gEnv } = require('../utils/env');
const User = require('../models/user');

const auth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({
      msg: 'Access Denied/Not Authorized. Please login',
    });
  }

  try {
    const decoded = await promisify(jwt.verify)(token, gEnv('JWT_SECRET'));

    const user = await User.findById(decoded.userId);

    req['user'] = user;
    next();
  } catch (error) {
    return res.status(400).send({
      msg: 'Invalid token. Please login',
    });
  }
};

const adminAuth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({
      msg: 'Access Denied/Not Authorized. Please login',
    });
  }

  try {
    await promisify(jwt.verify)(token, gEnv('ADMIN_JWT_SECRET'));
    next();
  } catch (error) {
    return res.status(400).send({
      msg: 'Invalid token. Please login',
    });
  }
};

module.exports = { auth, adminAuth };
