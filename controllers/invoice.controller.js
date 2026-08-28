const orderService = require('../services/order.service');
const { ORDER_STATUSES } = require('../models/order.model');

async function renderInvoices(req, res) {
  try {
    // 🛡️ DRY: fungsi yang sama juga dipake di controllers/order.controller.js
    // buat GET /api/orders. Admin liat SEMUA order, customer cuma liat punya sendiri
    const isAdmin = req.session.user.role === 'admin';
    const orders = await orderService.getAllOrders(isAdmin ? null : req.session.user.id);
    const storeName = process.env.STORE_NAME || 'Toko Kita';

    res.render('invoices', {
      orders: orders.map((o) => o.toJSON()),
      storeName,
    });
  } catch (err) {
    res.status(500).send('Gagal memuat invoice: ' + err.message);
  }
}

async function renderInvoiceDetail(req, res) {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).send('Invoice gak ditemukan');
    }

    const isAdmin = req.session.user.role === 'admin';
    if (!isAdmin && order.userId !== req.session.user.id) {
      return res.status(403).send('Akses ditolak');
    }

    res.render('invoice-detail', {
      order: order.toJSON(),
      statuses: ORDER_STATUSES,
      storeName: process.env.STORE_NAME || 'Toko Kita',
    });
  } catch (err) {
    res.status(500).send('Gagal memuat detail invoice: ' + err.message);
  }
}

async function updateStatus(req, res) {
  try {
    await orderService.updateOrderStatus(req.params.id, req.body.status);
    res.redirect(`/invoices/${req.params.id}`);
  } catch (err) {
    res.status(500).send('Gagal mengubah status: ' + err.message);
  }
}

module.exports = { renderInvoices, renderInvoiceDetail, updateStatus };
