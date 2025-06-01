# Medeva Frontend - UI Manajemen Karyawan

Antarmuka pengguna (UI) untuk mengelola data karyawan, dibangun sebagai bagian dari Tes Fullstack Developer Medeva. [cite: 2] Proyek ini dikembangkan menggunakan ReactJS. [cite: 2]

## Fitur Utama
- Menampilkan daftar karyawan dengan fungsionalitas filter dan pencarian.
- Formulir untuk menambah data karyawan baru.
- Formulir untuk mengedit data karyawan yang sudah ada.
- Implementasi dummy login untuk mengakses fitur-fitur.
- Validasi form menggunakan Yup. [cite: 2]
- Notifikasi menggunakan React Toastify.

## Prasyarat
- Node.js (versi 16.x atau lebih tinggi direkomendasikan)
- npm (versi 8.x atau lebih tinggi) atau yarn
- Backend API (Medeva Backend) harus sudah berjalan dan dapat diakses.

## Instalasi
1.  Clone repository ini:
    ```bash
    git clone https://github.com/wijidwipras/madeva-frontend.git
    cd medeva-frontend
    ```
2.  Install dependensi:
    ```bash
    npm install
    # atau
    yarn install
    ```

## Konfigurasi
1.  Buat file `.env` di root direktori proyek (`medeva-frontend`).
2.  Tambahkan variabel environment berikut ke file `.env`:
    ```env
    REACT_APP_API_BASE_URL=http://localhost:3001/api
    ```
    Sesuaikan URL jika backend Anda berjalan di port atau path yang berbeda.

## Menjalankan Proyek
1.  Untuk mode development:
    ```bash
    npm start
    ```
    Aplikasi akan berjalan dan terbuka otomatis di browser pada `http://localhost:3000` (default).

## Struktur Folder Utama
Proyek ini mencoba mengikuti prinsip Clean Architecture [cite: 2] dengan pemisahan sebagai berikut:
```
src/
├── assets/             # Gambar, font, dll.
├── components/         # Komponen UI reusable (common, forms, layout, ui)
├── layouts/            # Komponen yang mendefinisikan struktur halaman utama (mis. MainLayout, AuthLayout)
├── pages/              # Komponen yang mewakili satu halaman (mis. LoginPage, KaryawanListPage)
├── services/           # Modul untuk interaksi API (menggunakan Axios), Konfigurasi (mis. instance Axios)
├── styles/             # File SCSS global, variabel, mixins
├── utils/              # Fungsi utilitas helper
├── App.js              # Komponen utama aplikasi, routing
├── App.scss            # Styling utama untuk App.js
└── index.js            # Titik masuk aplikasi React
```

## Alur Kerja Otentikasi (Dummy)
1.  Pengguna mengakses halaman `/login`.
2.  Setelah login berhasil (menggunakan kredensial dummy dari backend), token diterima dan disimpan di `localStorage`.
3.  Interceptor Axios otomatis menambahkan token ini ke header `Authorization` untuk setiap permintaan ke API yang dilindungi.
4.  Rute yang dilindungi akan memeriksa keberadaan token. Jika tidak ada atau tidak valid, pengguna diarahkan kembali ke halaman login.
5.  Logout akan menghapus token dari `localStorage`.

## Teknologi yang Digunakan
- ReactJS (JavaScript) [cite: 2]
- React Router DOM untuk navigasi.
- Axios untuk melakukan permintaan HTTP ke backend. [cite: 2]
- Bootstrap dan React-Bootstrap untuk komponen UI dan layout. [cite: 2]
- SCSS untuk styling tambahan. [cite: 2]
- Yup untuk validasi form. [cite: 2]
- `react-toastify` untuk notifikasi toast.
- `react-icons` untuk ikon.
