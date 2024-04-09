const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const AppError = require('../utils/app-error');
const { gEnv } = require('../utils/env');

class AdminService {
  constructor() {
    this.model = Admin;
  }

  async login(email, password) {
    const admin = await this.model.findOne({ email });

    if (!admin) throw new AppError('Admin not found', 404);

    if (!(await bcrypt.compare(password, admin.password))) {
      throw new AppError('Invalid credentials', 401);
    }

    const payload = {
      email: admin.email,
    };
    const secretKey = gEnv('ADMIN_JWT_SECRET');
    const token = jwt.sign(payload, secretKey, { expiresIn: '7d' });

    return token;
  }
}

module.exports = new AdminService()
