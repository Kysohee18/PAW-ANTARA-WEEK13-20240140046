const productService = require('../services/product.service');
const orderService = require('../services/order.service');

async function renderHome(req, res) {
  try {
    // 🛡️ DRY: fungsi yang sama dipake juga di controllers/product.controller.js
    // (GET /api/products) dan bot/handlers/stok.handler.js (/stok)
    const products = await productService.getAllProducts();
    const storeName = process.env.STORE_NAME || 'Toko Kita';

    res.render('index', {
      products: products.map((p) => p.toJSON()),
      storeName,
      error: null,
    });
  } catch (err) {
    res.status(500).send('Gagal memuat halaman: ' + err.message);
  }
}

async function submitOrder(req, res) {
  try {
    const { buyerName, productId } = req.body;

    // productId dikirim sebagai array (checkbox produk yang dicentang di
    // katalog) - lewat form standar HTML, kalau cuma 1 dicentang browser
    // ngirim string biasa bukan array, jadi dinormalisasi dulu. Jumlahnya
    // diambil dari field quantity_<id> masing-masing kartu produk
    const productIds = [].concat(productId || []);

    const items = productIds
      .map((id) => ({ productId: parseInt(id, 10), quantity: parseInt(req.body[`quantity_${id}`], 10) }))
      .filter((item) => item.productId && item.quantity > 0);

    if (!buyerName || items.length === 0) {
      return res.redirect('/?error=Pilih minimal 1 produk dan isi nama pembeli');
    }

    // 🛡️ DRY: fungsi yang sama persis nanganin logic cek stok, kurangin stok,
    // simpen order multi-item, DAN notifikasi admin (semua di services/order.service.js)
    const result = await orderService.createOrder({
      userId: req.session.user.id,
      buyerName,
      items,
    });

    if (!result.success) {
      const products = await productService.getAllProducts();
      return res.render('index', {
        products: products.map((p) => p.toJSON()),
        storeName: process.env.STORE_NAME || 'Toko Kita',
        error: result.message,
      });
    }

    res.render('success', {
      storeName: process.env.STORE_NAME || 'Toko Kita',
      order: result.order,
      items: result.items,
    });
  } catch (err) {
    res.status(500).send('Gagal proses order: ' + err.message);
  }
}

module.exports = { renderHome, submitOrder };
