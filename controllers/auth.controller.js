const authService = require('../services/auth.service');

function renderLogin(req, res) {
  res.render('login', { storeName: process.env.STORE_NAME || 'Toko Kita', error: null });
}

async function login(req, res) {
  const { email, password } = req.body;
  const result = await authService.verifyLogin(email, password);

  if (!result.success) {
    return res.render('login', { storeName: process.env.STORE_NAME || 'Toko Kita', error: result.message });
  }

  req.session.user = { id: result.user.id, name: result.user.name, role: result.user.role };
  res.redirect(result.user.role === 'admin' ? '/admin/products' : '/');
}

function renderRegister(req, res) {
  res.render('register', { storeName: process.env.STORE_NAME || 'Toko Kita', error: null });
}

async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.render('register', { storeName: process.env.STORE_NAME || 'Toko Kita', error: 'Semua field wajib diisi' });
  }

  const result = await authService.registerCustomer({ name, email, password });
  if (!result.success) {
    return res.render('register', { storeName: process.env.STORE_NAME || 'Toko Kita', error: result.message });
  }

  req.session.user = { id: result.user.id, name: result.user.name, role: result.user.role };
  res.redirect('/');
}

function logout(req, res) {
  req.session.destroy(() => res.redirect('/login'));
}

module.exports = { renderLogin, login, renderRegister, register, logout };
