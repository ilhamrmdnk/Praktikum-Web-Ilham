# Asset & Data Inventory — LastKey

## 1. Deskripsi Produk

LastKey adalah aplikasi digital vault yang dirancang untuk menyimpan data penting pengguna dan mendukung mekanisme Dead Man's Switch. Pengguna dapat mengelola vault, mengatur penerima, serta mengatur proses check-in yang nantinya menjadi dasar mekanisme secure release.

Pada tahap saat ini, LastKey masih berada pada tahap awal pengembangan. Beberapa fitur seperti autentikasi server-side, database, enkripsi data secara nyata, dan mekanisme release otomatis belum diimplementasikan.

Inventaris aset ini digunakan sebagai dasar untuk threat modeling dan analisis risiko pada Tugas 1.

Klasifikasi keamanan menggunakan tiga aspek:

- **Confidentiality (C):** tingkat kebutuhan untuk mencegah akses atau pengungkapan yang tidak sah.
- **Integrity (I):** tingkat kebutuhan untuk mencegah perubahan atau manipulasi yang tidak sah.
- **Availability (A):** tingkat kebutuhan agar aset tetap tersedia ketika dibutuhkan.

Tingkat klasifikasi:

- **Rendah**
- **Sedang**
- **Tinggi**

---

## 2. Asset & Data Inventory

| No. | Kategori | Aset / Data | C | I | A | Alasan |
|---|---|---|---|---|---|---|
| 1 | Data | File dalam Vault | Tinggi | Tinggi | Tinggi | File merupakan data utama yang akan disimpan pengguna dan berpotensi mengandung informasi sensitif. |
| 2 | Data | Metadata Vault | Sedang | Tinggi | Sedang | Metadata digunakan untuk mengidentifikasi dan mengelola vault. Manipulasi metadata dapat memengaruhi pengelolaan data. |
| 3 | Data | Data Recipient | Tinggi | Tinggi | Sedang | Data penerima menentukan pihak yang dapat menerima data ketika mekanisme release dijalankan. |
| 4 | Data | Data Check-in | Sedang | Tinggi | Tinggi | Data check-in digunakan untuk menentukan status aktivitas pengguna dan dapat memengaruhi keputusan release. |
| 5 | Layanan | Autentikasi dan Session | Tinggi | Tinggi | Tinggi | Autentikasi dan session nantinya menjadi mekanisme utama untuk membatasi akses pengguna terhadap vault dan fitur LastKey. |
| 6 | Layanan | Vault Management | Tinggi | Tinggi | Tinggi | Layanan digunakan untuk membuat, mengelola, dan mengakses vault pengguna. |
| 7 | Layanan | Check-in & Release | Tinggi | Tinggi | Tinggi | Proses ini dapat menentukan apakah data tetap terkunci atau masuk ke mekanisme secure release. |
| 8 | Secret | Encryption Key | Tinggi | Tinggi | Tinggi | Encryption key merupakan aset kritis karena dapat digunakan untuk membuka data yang telah dienkripsi. |
| 9 | Secret | Authentication / Session Secret | Tinggi | Tinggi | Tinggi | Secret autentikasi atau session yang bocor dapat digunakan untuk memperoleh akses tidak sah. |
| 10 | Backup | Backup Data Vault | Tinggi | Tinggi | Tinggi | Backup dapat mengandung salinan data penting sehingga harus mendapatkan perlindungan yang setara dengan data utama. |
| 11 | Log | Audit Log | Sedang | Tinggi | Sedang | Audit log digunakan untuk mencatat aktivitas pengguna dan sistem. Integritas log penting untuk investigasi keamanan. |
| 12 | Akun | Akun User | Tinggi | Tinggi | Tinggi | Akun merupakan identitas pengguna dan menjadi titik akses utama ke vault dan fitur LastKey. |

---

## 3. Aset yang Berkaitan dengan Kriptografi

Beberapa aset direncanakan mendapatkan perlindungan kriptografi pada tahap pengembangan berikutnya.

| Aset | Perlindungan yang Direncanakan |
|---|---|
| File dalam Vault | Enkripsi menggunakan algoritma kriptografi yang sesuai |
| Encryption Key | Perlindungan dan key management |
| Data sensitif saat penyimpanan | Enkripsi |
| Backup yang mengandung data sensitif | Enkripsi |
| Data atau instruksi yang berkaitan dengan secure release | Perlindungan integritas dan/atau enkripsi sesuai kebutuhan |

**Catatan:** Penandaan ini menunjukkan kebutuhan perlindungan keamanan yang direncanakan. Hal tersebut tidak berarti mekanisme kriptografi tersebut sudah berjalan pada versi produk saat ini.

---

## 4. Kondisi Produk Saat Ini

Pada tahap awal pengembangan LastKey, beberapa komponen telah tersedia dalam bentuk antarmuka dan mock data, sedangkan komponen backend dan keamanan tertentu masih berupa rancangan.

### Sudah tersedia pada tahap awal

- Dashboard
- My Vault
- Create New Vault
- Check-in interface
- Recipient mock data
- Komponen UI untuk status keamanan
- Validasi form pada sisi client

### Belum diimplementasikan secara nyata

- Backend server
- Database
- Autentikasi server-side
- Penyimpanan password secara aman
- Enkripsi file secara nyata
- Key management
- Dead Man's Switch timer server-side
- Secure release otomatis
- Audit log pada backend

Kondisi tersebut menjadi pertimbangan dalam menentukan kemungkinan dan dampak risiko pada threat modeling.

---

## 5. Aset yang Paling Kritis

Berdasarkan fungsi utama LastKey, aset yang memiliki tingkat kepentingan paling tinggi adalah:

1. **File dalam Vault**
2. **Encryption Key**
3. **Akun User**
4. **Data Check-in**
5. **Data Recipient**
6. **Check-in & Release Service**
7. **Authentication / Session**

Aset tersebut menjadi fokus utama dalam analisis ancaman dan penentuan risiko prioritas.

---

## 6. Catatan

Inventaris ini merupakan pengembangan dari inventaris aset pada Latihan 1 dan digunakan sebagai dasar untuk threat modeling Tugas 1.

Klasifikasi C, I, dan A ditentukan berdasarkan fungsi LastKey sebagai digital vault dan Dead Man's Switch. Penilaian risiko selanjutnya akan mempertimbangkan kondisi aktual produk, bukan hanya kondisi ideal atau fitur yang direncanakan.