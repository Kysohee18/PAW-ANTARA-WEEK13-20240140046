const express = require('express');
const router = express.Router();
const { renderHome, submitOrder } = require('../controllers/page.controller');
const { renderInvoices, renderInvoiceDetail, updateStatus } = require('../controllers/invoice.controller');
const { requireLogin, requireRole } = require('../middleware/auth.middleware');

router.get('/', renderHome);
router.post('/order', requireLogin, submitOrder);
router.get('/invoices', requireLogin, renderInvoices);
router.get('/invoices/:id', requireLogin, renderInvoiceDetail);
router.post('/invoices/:id/status', requireRole('admin'), updateStatus);

module.exports = router;
