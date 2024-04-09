const { Schema, model } = require('mongoose');
const { hashSync } = require('bcrypt');

const adminSchema = new Schema(
  {
    email: {
      type: String,
    },
    password: String,
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

adminSchema.pre('save', function (next) {
  if (!this.isModified('password')) next();

  this.password = hashSync(this.password, 12);
  next();
});

const Admin = model('Admin', adminSchema);

module.exports = Admin;
