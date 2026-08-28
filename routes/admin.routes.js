const express = require('express');
const router = express.Router();
const {
  renderAdminProducts,
  renderProductForm,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');
const { requireRole } = require('../middleware/auth.middleware');

router.use(requireRole('admin'));

router.get('/products', renderAdminProducts);
router.get('/products/new', renderProductForm);
router.get('/products/:id/edit', renderProductForm);
router.post('/products/new', createProduct);
router.post('/products/:id/edit', updateProduct);
router.post('/products/:id/delete', deleteProduct);

module.exports = router;
