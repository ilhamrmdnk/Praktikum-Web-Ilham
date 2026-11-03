# LastKey

LastKey adalah secure digital vault dengan konsep **Dead Man's Switch** untuk membantu pengguna mengamankan data digital penting dan menyediakan mekanisme emergency release berdasarkan kondisi check-in.

---

## 1. Product Concept

- **Nama Produk:** LastKey
- **Masalah yang Ingin Diselesaikan:** Risiko hilangnya akses permanen terhadap data dan aset digital kritis (seperti kunci privat, arsip hukum, dokumen medis darurat, atau kredensial penting) apabila pemilik aset mengalami musibah mendadak, kehilangan kesadaran, atau meninggal dunia tanpa sempat mewariskan akses kepada keluarga atau pihak terpercaya.
- **Tujuan Aplikasi:** Menyediakan brankas digital mandiri yang secara otomatis mengelola status keaktifan pemilik melalui mekanisme konfirmasi berkala (*proof-of-life check-in*) dan memfasilitasi pelepasan data darurat kepada pihak yang telah ditunjuk jika pemilik tidak lagi dapat dihubungi.
- **Target Pengguna:** Individu dengan aset digital berharga, pengelola dokumen penting keluarga, profesional hukum/keuangan, serta pemilik bisnis yang memerlukan protokol proteksi data berkelanjutan.
- **Gambaran Cara Kerja:** Pengguna mengelompokkan data ke dalam kompartemen vault, menentukan penerima darurat (*recipient*), serta menetapkan frekuensi check-in (*interval*) dan masa tenggang (*grace period*). Selama pengguna rutin melakukan konfirmasi kehadiran (check-in), vault tetap terkunci. Jika pengguna gagal melakukan check-in melampaui batas waktu yang ditentukan, mekanisme emergency release akan diaktifkan untuk meneruskan akses kepada penerima yang ditunjuk.

> *Catatan: Pada tahap pengembangan saat ini, backend dan basis data belum
> diimplementasikan. Komponen dasar AES-256-GCM telah dikembangkan sebagai
> bagian dari tugas Cryptography, tetapi belum terintegrasi dengan backend
> dan penyimpanan Vault.*

---

## 2. Milestone 1 Features

Fitur-fitur yang telah diimplementasikan dan tersedia dalam aplikasi saat ini:

- **Dashboard (`/`):** Tampilan ringkasan status keamanan sistem, metrik perlindungan vault, countdown Dead Man's Switch, aktivitas keamanan, dan navigasi cepat.
- **My Vault (`/vault`):** Halaman manajemen brankas digital yang menampilkan daftar kompartemen terenkripsi (menggunakan mock data), fitur pencarian, filter status (All, Active, Pending), dan dialog inspeksi payload vault.
- **Check-in (`/check-in`):** Konsol Dead Man's Switch untuk memantau status monitoring, telemetry heartbeat, alur pipeline fail-safe, serta tombol interaktif check-in untuk mereset timer demo secara lokal.
- **Navigasi Antar Halaman:** Navigasi fungsional melalui Sidebar, Navbar breadcrumb, dan tautan kontekstual yang menghubungkan Dashboard, My Vault, dan Check-in.
- **Mock Vault Data:** Data awal vault realistis dengan berbagai skenario proteksi aset digital.
- **Create New Vault Form:** Form modal pembuatan vault baru dengan input komprehensif.
- **Client-Side Form Validation:** Validasi formulir di sisi peramban (*client-side*) dengan umpan balik visual dan pesan error yang spesifik.
- **Responsive UI:** Antarmuka adaptif yang optimal pada perangkat mobile, tablet, dan desktop.
- **Dark Cybersecurity Interface:** Desain visual bertema keamanan siber minimalis dengan kontras gelap dan aksen warna emerald.
- **Reusable Components:** Komponen modular dan terstruktur yang digunakan kembali di berbagai halaman.

> *Seluruh fitur di atas saat ini beroperasi menggunakan mock/client state dalam memori peramban karena backend belum dibuat.*

---

## 3. Technology Stack

Aplikasi dibangun menggunakan teknologi berikut:

- **Next.js (v16.3.8):** React Framework dengan arsitektur App Router dan dukungan Turbopack.
- **React (v19.2.8):** Library UI berbasis komponen reaktif.
- **TypeScript (v5.9.3):** Pengetikan statis untuk menjaga integritas tipe dan keandalan kode.
- **Tailwind CSS (v4):** Framework utility-first CSS untuk styling antarmuka modern dan responsif.
- **ESLint (v9):** Alat analisis kode statis untuk memastikan kualitas dan konsistensi kode JavaScript/TypeScript.
- **@noble/ciphers:** Library kriptografi yang digunakan untuk implementasi AES-256-GCM.
- **tsx:** Runtime TypeScript yang digunakan untuk menjalankan automated test komponen kriptografi.

---

## 4. Project Structure

Berikut adalah struktur direktori utama dari project LastKey:

```text
ilham-project/
├── app/
│   ├── favicon.ico             # Favicon aplikasi
│   ├── globals.css             # Konfigurasi Tailwind CSS dan variabel tema global
│   ├── layout.tsx              # Root layout aplikasi (HTML shell & meta)
│   ├── page.tsx                # Halaman Dashboard (Route `/`)
│   ├── vault/
│   │   └── page.tsx            # Halaman My Vault (Route `/vault`)
│   └── check-in/
│       └── page.tsx            # Halaman Check-in (Route `/check-in`)
├── components/
│   ├── ActivityList.tsx        # Komponen daftar log aktivitas keamanan
│   ├── CheckInCard.tsx         # Komponen display countdown & pemicu check-in
│   ├── Footer.tsx              # Komponen footer aplikasi
│   ├── Icons.tsx               # Koleksi ikon SVG bertema cybersecurity
│   ├── Navbar.tsx              # Komponen navigasi atas dengan breadcrumb
│   ├── SecurityOverview.tsx    # Komponen status dan indikator sistem keamanan
│   ├── Sidebar.tsx             # Komponen navigasi bilah sisi utama
│   ├── StatCard.tsx            # Komponen kartu statistik metrik
│   └── VaultCard.tsx           # Komponen kartu kompartemen vault
├── public/                     # Direktori aset statis publik
├── eslint.config.mjs           # Konfigurasi linting ESLint
├── next.config.ts              # Konfigurasi Next.js
├── postcss.config.mjs          # Konfigurasi PostCSS
├── package.json                # Daftar dependensi dan script npm
├── tsconfig.json               # Konfigurasi compiler TypeScript
└── README.md                   # Dokumentasi project
```

---

## 5. Getting Started

### Prasyarat
- Node.js (versi 18.x atau yang lebih baru disarankan)
- npm (Node Package Manager)

### Instalasi dan Menjalankan Server Pengembangan

1. **Instal dependensi project:**
   ```bash
   npm install
   ```

2. **Jalankan development server:**
   ```bash
   npm run dev
   ```

3. **Buka aplikasi di peramban:**
   Akses [http://localhost:3000](http://localhost:3000) pada browser Anda.

### Perintah Penting Lainnya

- **Menjalankan Linter:**
  ```bash
  npm run lint
  ```
  *Memeriksa potensi error, pelanggaran sintaks, dan aturan code quality berbasis ESLint.*

- **Menjalankan Production Build:**
  ```bash
  npm run build
  ```
  *Melakukan kompilasi produksi, type-checking menyeluruh via TypeScript, dan pra-render halaman statis.*

- **Menjalankan Automated Test Kriptografi:**

  ```bash
  npm test

---

## 6. Current Routes

Rute-rute yang saat ini tersedia dan aktif di dalam aplikasi:

| Route | Description |
|---|---|
| `/` | **Dashboard** — Tampilan utama ringkasan keamanan, metrik status, dan navigasi cepat. |
| `/vault` | **My Vault** — Manajemen kompartemen vault terenkripsi, pencarian, dan pembuatan vault baru. |
| `/check-in` | **Check-in** — Konsol Dead Man's Switch, pengaturan heartbeat, dan simulasi konfirmasi kehadiran. |

---

## 7. Reusable Components

Beberapa komponen modular yang digunakan kembali pada project:

- **Sidebar (`components/Sidebar.tsx`):** Bilah navigasi samping yang menyediakan tautan langsung ke halaman Dashboard, My Vault, dan Check-in, serta informasi akun pengguna.
- **Navbar (`components/Navbar.tsx`):** Header atas yang memuat tombol trigger mobile menu, breadcrumb navigasi yang dapat diklik, kolom pencarian, dan status sistem.
- **VaultCard (`components/VaultCard.tsx`):** Kartu untuk menampilkan status enkripsi, nama vault, jumlah file terenkripsi, dan tombol inspeksi detail kompartemen.
- **CheckInCard (`components/CheckInCard.tsx`):** Komponen kartu countdown Dead Man's Switch yang memuat progress bar siklus, label interval, dan tombol interaktif check-in.
- **StatCard (`components/StatCard.tsx`):** Kartu serbaguna untuk menampilkan ringkasan metrik statistik dengan badge, progress bar mini, dan ikon indikator.
- **SecurityOverview (`components/SecurityOverview.tsx`):** Modul ringkasan kontrol proteksi (enkripsi, hardware token, audit logging).
- **ActivityList (`components/ActivityList.tsx`):** Komponen timeline visual untuk memantau rekam jejak aktivitas sistem.
- **Footer (`components/Footer.tsx`):** Komponen kaki halaman yang memuat hak cipta dan indikator operasional LastKey.

---

## 8. Validation

Form **Create New Vault** pada halaman `/vault` menerapkan validasi client-side yang ketat sebelum data ditambahkan ke dalam state:

- **Vault Name:** Wajib diisi. Menampilkan error apabila input kosong atau hanya berisi karakter spasi.
- **Emergency Recipient:** Wajib dipilih dari daftar mock recipient terdaftar.
- **Check-in Interval:** Wajib dipilih (pilihan: 7 days, 14 days, atau 30 days).
- **Grace Period:** Wajib dipilih (pilihan: 24 hours, 48 hours, atau 72 hours).
- **Description:** Bersifat opsional (dapat dikosongkan).

**Karakteristik Validasi:**
- Validasi diproses sepenuhnya pada sisi client tanpa panggilan API atau backend.
- Pesan error ditempatkan tepat di bawah field yang bermasalah, dilengkapi teks jelas dan ikon peringatan (`AlertTriangleIcon`).
- Setelah seluruh field dinyatakan valid, data vault baru langsung ditambahkan ke dalam mock/client state, form di-reset ke nilai semula, dan notifikasi sukses ditampilkan kepada pengguna.

---

## 9. Responsive & Accessibility

Antarmuka LastKey dirancang dengan prinsip inklusivitas dan kemudahan penggunaan:

- **Desain Responsif:** Layout secara fleksibel menyesuaikan ukuran layar ponsel cerdas (mobile), tablet, hingga layar desktop lebar dengan memanfaatkan breakpoint Tailwind CSS.
- **Semantic HTML:** Menggunakan elemen HTML semantik seperti `<main>`, `<header>`, `<nav>`, `<aside>`, `<section>`, dan `<footer>`.
- **Form Labels:** Setiap elemen input, textarea, dan select memiliki elemen `<label>` pendamping yang terhubung secara eksplisit melalui atribut `htmlFor` dan `id`.
- **Accessible Error Messages:** Field yang tidak valid ditandai dengan atribut `aria-invalid="true"`, diarahkan ke pesan error melalui `aria-describedby`, serta menggunakan kontainer ber-atribut `role="alert"`.
- **Keyboard Navigation:** Mendukung navigasi fokus via keyboard (`Tab`, `Shift+Tab`), aktivasi form control, serta penutupan modal melalui tombol keyboard `Escape`.
- **Indikator Kontras Visual:** Status error tidak hanya mengandalkan perbedaan warna, melainkan didukung oleh teks instruksi eksplisit dan ikon visual pembantu.

---

## 10. Project Status

**Status Saat Ini: Milestone 1 — Initial Product Development + Cryptography Component**

LastKey telah menyelesaikan tahap awal pengembangan produk berupa perancangan
antarmuka, struktur rute navigasi, komponen modular, mock data, serta validasi
formulir sisi client.

Selain itu, sebagai bagian dari tugas Cryptography, project telah memiliki
komponen dasar **AES-256-GCM** untuk mengenkripsi dan mendekripsi data
menggunakan encryption key dan nonce yang dibuat secara aman.

Fitur-fitur berikut masih direncanakan untuk tahap pengembangan berikutnya:

- Layanan backend dan API server.
- Integrasi basis data (*persistent database*).
- Sistem autentikasi dan otorisasi pengguna.
- Integrasi penuh AES-256-GCM dengan penyimpanan Vault.
- Key management dan perlindungan encryption key.
- Sistem Dead Man's Switch server-side.
- Background scheduler dan mekanisme check-in yang sebenarnya.
- Mekanisme secure release kepada recipient.
- Audit log dan security monitoring yang terintegrasi dengan backend.

---

## 11. Cryptography Requirements

LastKey menyimpan data digital penting pengguna dalam konsep secure digital vault.
Data tersebut membutuhkan perlindungan terhadap akses dan perubahan yang tidak sah.

Pada tugas Cryptography ini, komponen kriptografi yang dikembangkan adalah
**AES-256-GCM** sebagai dasar perlindungan data vault.

### Data yang Membutuhkan Perlindungan Kriptografi

| Data | Tujuan Keamanan | Prioritas |
|---|---|---|
| File/data dalam Vault | Menjaga kerahasiaan data dan mendeteksi perubahan yang tidak sah | Kritis |
| Encryption Key | Mencegah pihak yang tidak berwenang memperoleh kunci untuk membuka data vault | Kritis |
| Encrypted Vault Payload | Menjaga kerahasiaan data terenkripsi dan mendeteksi manipulasi terhadap ciphertext | Tinggi |
| Data sensitif untuk mekanisme release | Mencegah data sensitif terbuka atau dimodifikasi sebelum proses release yang sah | Tinggi |

### Ruang Lingkup Komponen

Komponen kriptografi pada tahap ini berfokus pada perlindungan data Vault
menggunakan AES-256-GCM.

Implementasi ini merupakan komponen dasar dan belum mencakup:

- key management secara penuh,
- penyimpanan database,
- autentikasi server-side,
- Dead Man's Switch server-side,
- mekanisme emergency release produksi.

---

## 12. Cryptography Component Design

### AES-256-GCM

Komponen kriptografi menerima data plaintext dan encryption key, kemudian
menghasilkan ciphertext yang dapat digunakan kembali untuk proses dekripsi.

### Input

- **Plaintext:** data yang akan dilindungi dalam bentuk `Uint8Array`.
- **Encryption Key:** kunci AES-256 sepanjang 32 byte.
- **Nonce:** nilai acak sepanjang 12 byte yang dibuat menggunakan CSPRNG.

### Proses

1. Membuat nonce baru menggunakan Cryptographically Secure Pseudo-Random
   Number Generator (CSPRNG).
2. Membuat cipher AES-GCM menggunakan encryption key dan nonce.
3. Mengenkripsi plaintext.
4. Menghasilkan ciphertext beserta authentication tag.
5. Mengembalikan ciphertext dan nonce sebagai hasil enkripsi.

### Output

Output enkripsi terdiri dari:

- `ciphertext`: data yang telah dienkripsi dan memiliki authentication tag.
- `nonce`: nilai yang diperlukan untuk proses dekripsi.

Encryption key tidak disimpan di dalam source code dan tidak dimasukkan
ke repository.

### Alur Enkripsi

```text
Plaintext
    ↓
Generate random nonce menggunakan CSPRNG
    ↓
AES-256-GCM Encryption
    ↓
Ciphertext + Authentication Tag
    ↓
Encrypted Vault Payload

---

## 13. Cryptography Testing

Komponen AES-256-GCM diuji menggunakan Node.js built-in test runner
yang dijalankan melalui `tsx`.

### Skenario Pengujian

| No. | Skenario | Jenis Test | Hasil yang Diharapkan |
|---|---|---|---|
| 1 | Encrypt lalu decrypt dengan key yang sama | Positive | Plaintext kembali seperti semula |
| 2 | Mengenkripsi plaintext yang sama dua kali | Boundary/Randomness | Nonce berbeda |
| 3 | Ciphertext dimodifikasi | Negative | Proses decrypt gagal |
| 4 | Menggunakan key yang salah | Negative | Proses decrypt gagal |

### Hasil Pengujian

Seluruh pengujian berhasil dijalankan:

```text
tests 4
pass 4
fail 0