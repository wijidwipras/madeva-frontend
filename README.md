# Medeva Frontend

Frontend aplikasi Room Category Management. Dibangun dengan React 19, Vite, dan Tailwind CSS.

## Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS 4
- **Form Management:** React Hook Form + Yup
- **HTTP Client:** Axios
- **Icons:** Heroicons
- **Notifications:** React Toastify
- **Routing:** React Router DOM 7

## Struktur Proyek

```
madeva-frontend/
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── EmptyState.jsx
│   │   │   ├── RoomCard.jsx
│   │   │   ├── RoomForm.jsx      # Form tambah/edit kategori ruangan
│   │   │   └── RoomTable.jsx     # Tabel daftar ruangan
│   │   ├── layout/
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       ├── Checkbox.jsx
│   │       ├── IconButton.jsx
│   │       ├── InputField.jsx
│   │       ├── Modal.jsx
│   │       ├── Radio.jsx
│   │       └── Select.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx       # Authentication state management
│   ├── hooks/
│   │   └── useAuth.js
│   ├── pages/
│   │   ├── DashboardPage.jsx     # Main page - Room Category Management
│   │   └── LoginPage.jsx         # Login page
│   ├── services/
│   │   ├── api/
│   │   │   └── client.js         # Axios instance with interceptors
│   │   ├── auth.service.js
│   │   └── kategoriRuangan.service.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
└── vite.config.js
```

## Instalasi

```bash
cd madeva-frontend
npm install
```

## Menjalankan

### Development

```bash
npm run dev
```

Frontend berjalan di `http://localhost:3000`

### Build

```bash
npm run build
```

Output build ada di folder `dist/`

### Preview Build

```bash
npm run preview
```

## Environment Variables

Frontend menggunakan Vite proxy untuk forward API calls ke backend. Proxy dikonfigurasi di `vite.config.js`:

```javascript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
    },
  },
}
```

## Fitur

### Authentication
- Login dengan Kode Klinik, User ID, dan Password
- JWT token disimpan di localStorage
- Automatic token refresh check saat app load

### RBAC (Role-Based Access Control)
- **Admin:** Dapat melihat, menambah, mengedit data, dan toggle status
- **User:** Hanya dapat melihat data

### Room Category Management
- Tabel daftar ruangan dengan pagination
- Pencarian nama ruangan
- Filter berdasarkan status (Semua, Aktif, Non-Aktif)
- Form tambah/edit dengan validasi
- Toggle status Aktif/Non-Aktif dengan konfirmasi modal

### Responsive Design
- **Desktop (≥1024px):** Layout 2 kolom (tabel + form)
- **Tablet (≥768px):** Layout 2 kolom compact
- **Mobile (<768px):** Layout 1 kolom (stacked)

## Halaman

### Login (`/login`)
- Form login dengan 3 field: Kode Klinik, User ID, Password
- reCAPTCHA verification
- Link ke halaman lain

### Dashboard (`/`)
- Kiri: Tabel daftar ruangan dengan search dan filter
- Kanan: Form tambah/edit kategori ruangan
- Header: Tombol "Tambah" (hanya untuk Admin)

## Component Library

### UI Components
| Component | Description |
|-----------|-------------|
| `Button` | Button dengan variant primary, secondary, outline, ghost, danger |
| `InputField` | Input dengan label, error message, password toggle, prefix |
| `Select` | Dropdown select dengan label dan error message |
| `Checkbox` | Checkbox group dengan grid layout |
| `Radio` | Radio button group |
| `Modal` | Modal dialog dengan overlay click dan ESC to close |
| `Card` | Container card |
| `IconButton` | Icon-only button |

## Login Credentials

| Role | Kode Klinik | User ID | Password |
|------|-------------|---------|----------|
| Admin | MEDEVA01 | admin | password123 |
| User | MEDEVA01 | user | password123 |
