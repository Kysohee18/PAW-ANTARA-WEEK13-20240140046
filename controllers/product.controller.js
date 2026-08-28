const productService = require('../services/product.service');
const sendResponse = require('../utils/response');

async function getProducts(req, res) {
  try {
    const products = await productService.getAllProducts();
    return sendResponse(res, { message: 'Berhasil ambil produk', data: products });
  } catch (err) {
    return sendResponse(res, { code: 500, success: false, message: err.message });
  }
}

async function renderAdminProducts(req, res) {
  try {
    const products = await productService.getAllProducts();
    res.render('admin/products', {
      products: products.map((p) => p.toJSON()),
      storeName: process.env.STORE_NAME || 'Toko Kita',
    });
  } catch (err) {
    res.status(500).send('Gagal memuat produk: ' + err.message);
  }
}

async function renderProductForm(req, res) {
  try {
    const { id } = req.params;
    const product = id ? (await productService.getProductById(id))?.toJSON() : null;
    res.render('admin/product-form', {
      product,
      storeName: process.env.STORE_NAME || 'Toko Kita',
      error: null,
    });
  } catch (err) {
    res.status(500).send('Gagal memuat form produk: ' + err.message);
  }
}

async function createProduct(req, res) {
  try {
    const { name, description, price, stock } = req.body;
    await productService.createProduct({
      name,
      description,
      price: parseInt(price, 10),
      stock: parseInt(stock, 10),
    });
    res.redirect('/admin/products');
  } catch (err) {
    res.status(500).send('Gagal membuat produk: ' + err.message);
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    await productService.updateProduct(id, {
      name,
      description,
      price: parseInt(price, 10),
      stock: parseInt(stock, 10),
    });
    res.redirect('/admin/products');
  } catch (err) {
    res.status(500).send('Gagal mengubah produk: ' + err.message);
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id);
    res.redirect('/admin/products');
  } catch (err) {
    res.status(500).send('Gagal menghapus produk: ' + err.message);
  }
}

module.exports = {
  getProducts,
  renderAdminProducts,
  renderProductForm,
  createProduct,
  updateProduct,
  deleteProduct,
};
