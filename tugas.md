# Tugas 13 - Manajemen Produk, Login, dan Order

NIM: 20240140046

Di bawah ini bukti pengerjaan tugas sesuai ketentuan yang dikasih. Tiap bagian saya kasih screenshot sama penjelasan singkat.

## 1. Data Produk

Produk yang dipakai udah lumayan banyak, ada 20 produk beda-beda (kaos, kemeja, celana, sepatu, aksesoris, dll), bukan cuma 1-2 data doang.

![data produk](tugas-md-assets/01-data-produk.png)

Ini keliatan di halaman katalog kalau produknya udah banyak, gak cuma sample dikit.

## 2. CRUD Produk (Admin)

Admin bisa nambah, ubah, dan hapus produk lewat halaman `/admin/products`.

### Create
![sebelum tambah produk](tugas-md-assets/02-crud-create-before.png)
![sesudah tambah produk](tugas-md-assets/02-crud-create-after.png)

Sebelum nambah produk baru sama sesudahnya, keliatan produk baru muncul di list.

### Update
![sebelum edit produk](tugas-md-assets/03-crud-update-before.png)
![sesudah edit produk](tugas-md-assets/03-crud-update-after.png)

Ganti harga/stok salah satu produk, terus keliatan datanya berubah.

### Delete
![sebelum hapus produk](tugas-md-assets/04-crud-delete-before.png)
![sesudah hapus produk](tugas-md-assets/04-crud-delete-after.png)

Produk yang dihapus udah gak muncul lagi di list.

## 3. Login 2 Role

Ada 2 akun beda role, login-nya beda tampilan sama redirect-nya.

### Login sebagai Customer
![login customer](tugas-md-assets/05-login-customer.png)

Masuk pakai akun customer, diarahkan ke halaman katalog, menu yang keliatan cuma Katalog & Invoice.

### Login sebagai Admin
![login admin](tugas-md-assets/06-login-admin.png)

Masuk pakai akun admin, diarahkan langsung ke halaman Kelola Produk, ada menu tambahan buat CRUD.

## 4. Multiple Order dalam 1 Transaksi

Nyoba pesan 2 produk beda sekaligus dalam 1 kali checkout (bukan 1 per 1), buat mastiin semua kesimpen bukan cuma yang pertama.

![pesan 2 produk sekaligus](tugas-md-assets/07-order-multiple.png)

Centang 2 produk beda di katalog terus submit satu kali.

![bukti di invoice semua produk tersimpan](tugas-md-assets/08-invoice-multiple-item.png)

Pas dibuka di invoice, kedua produk yang dipesan kesimpen semua dalam 1 invoice, gak ada yang ilang.

## 5. Invoice & Ubah Status (Admin)

Admin bisa buka detail invoice pesanan mana aja terus ubah statusnya.

![detail invoice](tugas-md-assets/09-invoice-detail.png)

Ini tampilan detail invoice-nya, ada rincian tiap produk yang dipesan sama totalnya.

### Sebelum ubah status
![status sebelum diubah](tugas-md-assets/10-status-before.png)

### Sesudah ubah status
![status sesudah diubah](tugas-md-assets/11-status-after.png)

Status pesanan diganti dari admin, misalnya dari "pending" ke "diproses".

## 6. Tampilan (UI)

Tampilan lama masih polos banget, gak ada login, form order-nya 1 produk doang.

![tampilan sebelum](tugas-md-assets/12-ui-before.png)

Tampilan sekarang udah ada navbar dengan menu beda per role, form order bisa centang banyak produk, badge status warna-warni biar gampang dibedain, sama halaman login/register.

![tampilan sesudah](tugas-md-assets/13-ui-after.png)

---

Catatan: struktur kode dibikin pakai prinsip DRY, logic order/produk/auth ditaruh di service layer (`services/`) biar dipakai bareng-bareng sama controller web, API, bot Telegram, dan chat AI, gak ditulis ulang di banyak tempat.
