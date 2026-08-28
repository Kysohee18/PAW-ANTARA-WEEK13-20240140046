Deskripsi
Materi pertemuan 13 membahas konsep bot messaging, long polling, Telegram Bot API, serta reuse logic dengan prinsip DRY (Don't Repeat Yourself).
Pada tugas ini, mahasiswa diminta untuk mengembangkan sistem manajemen produk lengkap dengan otentikasi, role pengguna, dan manajemen pesanan.

Source Project
🔗 https://github.com/Kakonoomoide/PAW-ANTARA-WEEK13

Deadline
@Kelas A  →  28 Agustus 2026
Kelas B → [isi tanggal]

Ketentuan Pengerjaan
Buat data produk dalam jumlah banyak (bukan hanya 1-2 data dummy).
Admin dapat melakukan CRUD (Create, Read, Update, Delete) terhadap data produk.
Terapkan fitur login untuk 2 jenis role pengguna: Customer dan Admin.
Perbaiki fitur chat/order agar mendukung multiple order dalam 1 kali pemesanan (contoh: user beli 2 jenis baju sekaligus, keduanya harus ter-input, bukan cuma 1 yang kepesan).
Admin dapat melihat invoice beserta detailnya, serta dapat mengubah status pesanan.
Perbaiki tampilan (UI) agar lebih menarik dan rapi.
Terapkan prinsip DRY dalam penulisan kode (hindari duplikasi logic yang bisa di-reuse, misal lewat middleware/helper/component).

Ketentuan Isi tugas.md
ketentuan ada di bawah 

Ketentuan Pengumpulan
Hasil pekerjaan (kode + tugas.md) diunggah ke repository GitHub dengan format penamaan:
PAW-ANTARA-WEEK13-NIM  
kita gunakan untuk PAW-ANTARA-WEEK13-20240140046 

Notes
Styling, library, dan pendekatan implementasi CRUD/auth/order dibebaskan kepada masing-masing mahasiswa.\



---
Ketentuan Isi tugas.md
Seluruh bukti pengerjaan wajib disimpan dalam satu file bernama tugas.md di root repository, berisi minimal:
Data Produk — Screenshot halaman list produk yang menampilkan data dalam jumlah banyak (bukti data tidak hanya 1-2).
CRUD Produk (Admin) — Screenshot proses create, update, dan delete produk oleh admin (before/after tiap aksi).
Login 2 Role — Screenshot login berhasil untuk akun customer dan akun admin (beda tampilan/redirect-nya).
Multiple Order — Screenshot proses order 2+ jenis produk sekaligus dalam 1 transaksi, dan bukti di data/invoice bahwa seluruh produk yang dipesan tersimpan (bukan cuma 1).
Invoice & Ubah Status (Admin) — Screenshot admin membuka detail invoice suatu pesanan, serta screenshot proses admin mengubah status pesanan (before → after).
Tampilan — Screenshot before/after (jika ada versi lama) atau screenshot tampilan akhir yang sudah diperbaiki.

Setiap screenshot diberi 1-2 kalimat keterangan singkat (menjelaskan bukti untuk poin nomor berapa) agar mudah direview oleh asisten dosen.