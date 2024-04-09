const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user');

const AppError = require('../utils/app-error');
const { generateRandomNumber } = require('../utils/common');
const { gEnv } = require('../utils/env');

const APIFeatures = require('../utils/api-features');

class UserService {
  constructor() {
    this.model = UserModel;

  }
  async signup(payload) {
    const { name, email, phone, password } = payload
    const userCheck = await this.model.findOne({ phone });
    if (userCheck) {
      throw new AppError('User already exists', 401);
    }
    const hash = bcrypt.hashSync(password, 8)

    const user = await this.model.create({ name, email, phone, password: hash })

    return user
  }
  async login(phone, password) {
    const user = await this.model.findOne({ phone });

    if (!user) throw new AppError('User not found. Please sign up first.', 401);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new AppError('wrong password', 401);
    }
    const payload = { userId: user._id };
    const secretKey = gEnv('JWT_SECRET');
    const options = { expiresIn: '7d' };
    const token = jwt.sign(payload, secretKey, options);
    return { token, user };
}
  async getUser(userId) {
    const user = await this.model.findOne({ _id: userId });
    return { user };
  }









}

module.exports = new UserService();
