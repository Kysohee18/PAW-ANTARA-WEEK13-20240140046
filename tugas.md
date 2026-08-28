# Tugas 13 - Manajemen Produk, Login, dan Order

NIM: 20240140046

Di bawah ini bukti pengerjaan tugas sesuai ketentuan yang dikasih. Tiap bagian saya kasih screenshot sama penjelasan singkat.

## 1. Data Produk

Produk yang dipakai udah lumayan banyak, ada 20 produk beda-beda (kaos, kemeja, celana, sepatu, aksesoris, dll), bukan cuma 1-2 data doang.

<img width="1919" height="1029" alt="image" src="https://github.com/user-attachments/assets/cadaf439-dbdd-4cfb-acb0-dfb373633735" />


Ini keliatan di halaman katalog kalau produknya udah banyak, gak cuma sample dikit.

## 2. CRUD Produk (Admin)

Admin bisa nambah, ubah, dan hapus produk lewat halaman `/admin/products`.

### Create
<img width="1919" height="1027" alt="image" src="https://github.com/user-attachments/assets/3800629e-e21e-4a24-8d4e-917172e7c97d" />

<img width="1918" height="1036" alt="image" src="https://github.com/user-attachments/assets/a3642431-d9c3-4021-9961-5dbd885e1566" />


Sebelum nambah produk baru sama sesudahnya, keliatan produk baru muncul di list.

### Update

<img width="1918" height="1028" alt="image" src="https://github.com/user-attachments/assets/becf21dc-3600-424a-8d33-48dde9fc3376" />

Ganti harga/stok salah satu produk, terus keliatan datanya berubah.

### Delete
<img width="1919" height="1039" alt="image" src="https://github.com/user-attachments/assets/f2a937ad-6504-48bb-88cb-7df939ac0898" />


Produk yang dihapus udah gak muncul lagi di list.

## 3. Login 2 Role

Ada 2 akun beda role, login-nya beda tampilan sama redirect-nya.

### Login sebagai Customer
<img width="1919" height="927" alt="image" src="https://github.com/user-attachments/assets/7da34be2-0de6-49d7-af14-8dfc810492d2" />


Masuk pakai akun customer, diarahkan ke halaman katalog, menu yang keliatan cuma Katalog & Invoice.

### Login sebagai Admin
<img width="1919" height="937" alt="image" src="https://github.com/user-attachments/assets/98bcb69f-74b0-4bdf-8431-9ba8d245e335" />


Masuk pakai akun admin, diarahkan langsung ke halaman Kelola Produk, ada menu tambahan buat CRUD.

## 4. Multiple Order dalam 1 Transaksi

Nyoba pesan 2 produk beda sekaligus dalam 1 kali checkout (bukan 1 per 1), buat mastiin semua kesimpen bukan cuma yang pertama.

<img width="1919" height="1031" alt="image" src="https://github.com/user-attachments/assets/96290ec3-b264-48f9-bfed-1d6fabcdd6a7" />


Centang 2 produk beda di katalog terus submit satu kali.

<img width="1919" height="1031" alt="image" src="https://github.com/user-attachments/assets/79e293a2-6132-4b88-993d-489bc486fdca" />


Pas dibuka di invoice, kedua produk yang dipesan kesimpen semua dalam 1 invoice, gak ada yang ilang.

## 5. Invoice & Ubah Status (Admin)

Admin bisa buka detail invoice pesanan mana aja terus ubah statusnya.


<img width="1919" height="1014" alt="image" src="https://github.com/user-attachments/assets/e57569a6-4dea-46d8-8b1e-f9594f1ba3b6" />


Ini tampilan detail invoice-nya, ada rincian tiap produk yang dipesan sama totalnya.

### Sebelum ubah status
<img width="1919" height="1024" alt="image" src="https://github.com/user-attachments/assets/bda3840e-21ff-48a2-9e46-16031fde4145" />


### Sesudah ubah status
<img width="1919" height="1017" alt="image" src="https://github.com/user-attachments/assets/1b7af1fa-dfba-48ae-b698-00f8709bd6d1" />

Status pesanan diganti dari admin, misalnya dari "pending" ke "diproses".

## 6. Tampilan (UI)

Tampilan lama masih polos banget, gak ada login, form order-nya 1 produk doang.

![tampilan sebelum](tugas-md-assets/12-ui-before.png)

Tampilan sekarang udah ada navbar dengan menu beda per role, form order bisa centang banyak produk, badge status warna-warni biar gampang dibedain, sama halaman login/register.

<img width="1918" height="1040" alt="image" src="https://github.com/user-attachments/assets/dd1b1e8c-09a1-4fc3-87d0-3f296c3e7527" />


---

Catatan: struktur kode dibikin pakai prinsip DRY, logic order/produk/auth ditaruh di service layer (`services/`) biar dipakai bareng-bareng sama controller web, API, bot Telegram, dan chat AI, gak ditulis ulang di banyak tempat.
