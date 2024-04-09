const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: 'Mobile number must be a 10-digit number without any spaces or special characters.',
    },
  },
  password: { type: String },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
