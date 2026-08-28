const bcrypt = require('bcryptjs');
const { User } = require('../models');

async function registerCustomer({ name, email, password }) {
  const existing = await User.findOne({ where: { email } });
  if (existing) {
    return { success: false, message: 'Email sudah terdaftar' };
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, role: 'customer' });
  return { success: true, user };
}

async function verifyLogin(email, password) {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return { success: false, message: 'Email atau password salah' };
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return { success: false, message: 'Email atau password salah' };
  }

  return { success: true, user };
}

module.exports = { registerCustomer, verifyLogin };
