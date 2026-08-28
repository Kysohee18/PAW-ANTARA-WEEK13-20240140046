const { sequelize, Order, OrderItem, Product } = require('../models');
const { formatRupiah } = require('../utils/formatRupiah');
const bot = require('../config/telegram');

/**
 * 🛡️ DRY - SERVICE LAYER
 * ============================================================
 * createOrder() dipanggil dari controllers/page.controller.js (form web)
 * DAN services/gemini.service.js (AI function calling). Order sekarang
 * bisa berisi BANYAK produk sekaligus (multi-item) dalam 1 transaksi,
 * logic cek stok, kurangin stok, simpen order+item, DAN notifikasi
 * admin cuma ditulis SEKALI di sini.
 * ============================================================
 */
async function createOrder({ userId, buyerName, items }) {
  if (!items || items.length === 0) {
    return { success: false, message: 'Order harus punya minimal 1 produk' };
  }

  return sequelize.transaction(async (t) => {
    const resolvedItems = [];

    // validasi semua item dulu - kalau ada 1 aja stok gak cukup, seluruh order dibatalkan
    for (const { productId, quantity } of items) {
      const product = await Product.findByPk(productId, { transaction: t, lock: t.LOCK.UPDATE });

      if (!product) {
        return { success: false, message: `Produk dengan ID ${productId} gak ditemukan` };
      }
      if (product.stock < quantity) {
        return {
          success: false,
          message: `Stok "${product.name}" gak cukup. Tersedia: ${product.stock}, diminta: ${quantity}`,
        };
      }
      resolvedItems.push({ product, quantity });
    }

    const totalAmount = resolvedItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

    const order = await Order.create({ userId, buyerName, totalAmount }, { transaction: t });

    for (const { product, quantity } of resolvedItems) {
      await OrderItem.create(
        { orderId: order.id, productId: product.id, quantity, priceAtOrder: product.price },
        { transaction: t }
      );
      product.stock -= quantity;
      await product.save({ transaction: t });
    }

    // 🛡️ DRY lagi: notifyAdminNewOrder dipanggil di sini, otomatis
    // ke-trigger baik order-nya datang dari web maupun dari Telegram/AI
    await notifyAdminNewOrder(order, resolvedItems);

    return { success: true, order, items: resolvedItems };
  });
}

/**
 * Kirim notifikasi ke admin lewat Telegram tiap ada order baru,
 * merangkum SEMUA item dalam 1 order (bisa lebih dari 1 produk).
 */
async function notifyAdminNewOrder(order, resolvedItems) {
  const adminChatId = process.env.ADMIN_TELEGRAM_CHAT_ID;

  if (!bot || !adminChatId || adminChatId === 'isi-chat-id-admin') {
    console.log('ℹ️  Notifikasi admin dilewati (bot/ADMIN_TELEGRAM_CHAT_ID belum diset)');
    return;
  }

  const itemLines = resolvedItems.map(({ product, quantity }) => {
    const stockWarning = product.stock <= 5 ? ' ⚠️ MENIPIS' : '';
    return `- ${product.name} x${quantity} (sisa stok: ${product.stock}${stockWarning})`;
  });

  const text = [
    '🔔 Order baru masuk!',
    '',
    ...itemLines,
    '',
    `Total: ${formatRupiah(order.totalAmount)}`,
    `Pembeli: ${order.buyerName}`,
    `Order ID: #${order.id}`,
  ].join('\n');

  try {
    await bot.sendMessage(adminChatId, text);
  } catch (err) {
    console.error('Gagal kirim notifikasi ke admin:', err.message);
  }
}

async function getAllOrders(userId) {
  const where = userId ? { userId } : {};
  return Order.findAll({
    where,
    include: [{ model: OrderItem, as: 'items', include: Product }],
    order: [['createdAt', 'DESC']],
  });
}

async function getOrderById(id) {
  return Order.findByPk(id, {
    include: [{ model: OrderItem, as: 'items', include: Product }],
  });
}

async function updateOrderStatus(id, status) {
  const order = await Order.findByPk(id);
  if (!order) return null;
  return order.update({ status });
}

module.exports = { createOrder, notifyAdminNewOrder, getAllOrders, getOrderById, updateOrderStatus };
