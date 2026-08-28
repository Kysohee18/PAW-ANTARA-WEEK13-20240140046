require('dotenv').config();
const bcrypt = require('bcryptjs');
const { sequelize, Product, User } = require('../models');

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('Koneksi database berhasil');
    await sequelize.sync({ alter: true });

    const existingUsers = await User.count();
    if (existingUsers === 0) {
      const hashedAdmin = await bcrypt.hash('admin123', 10);
      const hashedCustomer = await bcrypt.hash('customer123', 10);
      await User.bulkCreate([
        { name: 'Admin Toko', email: 'admin@toko.com', password: hashedAdmin, role: 'admin' },
        { name: 'Budi Customer', email: 'customer@toko.com', password: hashedCustomer, role: 'customer' },
      ]);
      console.log('User admin & customer contoh berhasil ditambahin');
      console.log('  Admin    : admin@toko.com / admin123');
      console.log('  Customer : customer@toko.com / customer123');
    } else {
      console.log('User udah ada, skip supaya gak dobel');
    }

    const existingProducts = await Product.count();
    if (existingProducts === 0) {
      await Product.bulkCreate([
        { name: 'Kaos Polos A', description: 'Bahan cotton combed 30s, adem, tersedia warna hitam & putih. Cocok buat harian, harga lebih terjangkau.', price: 75000, stock: 50 },
        { name: 'Kaos Polos B', description: 'Bahan cotton combed 24s (lebih tebal & premium dari versi A), tersedia warna navy & maroon.', price: 95000, stock: 30 },
        { name: 'Kemeja Flanel', description: 'Motif kotak-kotak, bahan tebal, cocok buat cuaca dingin', price: 150000, stock: 20 },
        { name: 'Kemeja Polos Formal', description: 'Bahan katun stretch, cocok buat kerja/kantor', price: 165000, stock: 25 },
        { name: 'Celana Chino Slim Fit', description: 'Warna khaki, bahan stretch, nyaman dipake seharian', price: 180000, stock: 15 },
        { name: 'Celana Jeans Regular Fit', description: 'Bahan denim tebal, warna biru gelap', price: 210000, stock: 18 },
        { name: 'Celana Jogger', description: 'Bahan fleece, elastis di pinggang & ujung kaki', price: 130000, stock: 22 },
        { name: 'Sepatu Sneakers Canvas', description: 'Cocok buat kasual, tersedia banyak ukuran', price: 220000, stock: 30 },
        { name: 'Sepatu Slip-On', description: 'Praktis tanpa tali, sol karet anti slip', price: 195000, stock: 20 },
        { name: 'Sandal Gunung', description: 'Outsole tebal, cocok buat outdoor & harian', price: 110000, stock: 35 },
        { name: 'Jaket Hoodie', description: 'Bahan fleece tebal, ada kantong depan', price: 175000, stock: 20 },
        { name: 'Jaket Bomber', description: 'Bahan parasut, ringan & anti angin', price: 205000, stock: 15 },
        { name: 'Topi Baseball', description: 'Bahan katun, strap belakang adjustable', price: 55000, stock: 40 },
        { name: 'Ikat Pinggang Kulit', description: 'Kulit sintetis, gesper metal', price: 85000, stock: 28 },
        { name: 'Tas Ransel Kasual', description: 'Muat laptop 14 inch, bahan waterproof', price: 199000, stock: 17 },
        { name: 'Kaos Kaki Polos (3 pasang)', description: 'Bahan katun, bebas gerah', price: 35000, stock: 60 },
        { name: 'Dompet Lipat Kulit', description: 'Slot kartu banyak, ringkas', price: 65000, stock: 33 },
        { name: 'Kacamata Hitam UV Protection', description: 'Frame plastik ringan, lensa anti UV', price: 90000, stock: 24 },
        { name: 'Kemeja Batik Modern', description: 'Motif kontemporer, cocok formal & santai', price: 175000, stock: 19 },
        { name: 'Celana Pendek Kasual', description: 'Bahan katun ringan, cocok cuaca panas', price: 95000, stock: 27 },
      ]);
      console.log('20 produk berhasil ditambahin');
    } else {
      console.log('Produk udah ada, skip supaya gak dobel');
    }

    console.log('\nSeeding selesai ✅');
    console.log('Buka http://localhost:3000, login pakai akun di atas buat coba pesan produk.');
    process.exit(0);
  } catch (err) {
    console.error('Gagal seeding:', err.message);
    process.exit(1);
  }
}

seed();
