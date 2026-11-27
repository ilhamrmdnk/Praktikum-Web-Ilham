# STRIDE Threat Analysis — LastKey

## 1. Tujuan

Analisis STRIDE digunakan untuk mengidentifikasi ancaman keamanan pada elemen-elemen dalam arsitektur LastKey. Analisis dilakukan berdasarkan DFD/arsitektur `sec-0.1` dan kondisi pengembangan produk.

Kategori STRIDE yang digunakan:

- **S — Spoofing:** penyamaran identitas pengguna atau pihak lain.
- **T — Tampering:** perubahan atau manipulasi data secara tidak sah.
- **R — Repudiation:** penyangkalan terhadap suatu aktivitas atau tindakan.
- **I — Information Disclosure:** pengungkapan informasi kepada pihak yang tidak berhak.
- **D — Denial of Service:** gangguan yang menyebabkan layanan atau data tidak tersedia.
- **E — Elevation of Privilege:** memperoleh hak akses yang lebih tinggi dari yang seharusnya.

---

## 2. Daftar Ancaman

| ID | Elemen Diagram | STRIDE | Ancaman | Aset Terdampak |
|---|---|---|---|---|
| T01 | Authentication / Session | S — Spoofing | Penyerang memperoleh atau menyalahgunakan kredensial/session pengguna sehingga dapat menyamar sebagai pengguna yang sah. | Akun User, Session |
| T02 | Authentication / Session | E — Elevation of Privilege | Kerentanan pada mekanisme otorisasi dapat menyebabkan pengguna memperoleh akses ke vault atau fungsi yang bukan miliknya. | Akun User, Vault Data |
| T03 | Vault API | T — Tampering | Penyerang mengubah request pengelolaan vault sehingga metadata atau konfigurasi vault berubah tanpa izin. | Metadata Vault |
| T04 | Vault Data | I — Information Disclosure | Data vault atau file sensitif dapat terbaca oleh pihak yang tidak berwenang apabila kontrol akses atau enkripsi penyimpanan tidak diterapkan dengan benar. | File dalam Vault |
| T05 | Vault API | I — Information Disclosure | API dapat mengembalikan data vault milik pengguna lain apabila pemeriksaan authorization berdasarkan kepemilikan vault tidak dilakukan. | File Vault, Metadata Vault |
| T06 | Check-in API | T — Tampering | Penyerang memanipulasi status atau timestamp check-in sehingga sistem menganggap pengguna telah melakukan check-in. | Data Check-in |
| T07 | Scheduler / Release | T — Tampering | Konfigurasi waktu check-in atau release dapat dimanipulasi sehingga waktu release berubah dari konfigurasi yang ditetapkan pengguna. | Data Check-in, Konfigurasi Release |
| T08 | Audit Log | R — Repudiation | Pengguna atau penyerang dapat menyangkal suatu aktivitas apabila aktivitas penting tidak tercatat secara lengkap dan dapat dipercaya. | Audit Log |
| T09 | Audit Log | T — Tampering | Penyerang dengan akses ke penyimpanan log dapat mengubah atau menghapus catatan aktivitas untuk menyembunyikan tindakan. | Audit Log |
| T10 | Recipient Data | I — Information Disclosure | Informasi penerima dapat diketahui oleh pihak yang tidak berhak sehingga dapat mengungkap siapa yang akan menerima data ketika release dilakukan. | Data Recipient |
| T11 | Recipient / Release | S — Spoofing | Penyerang dapat menyamar sebagai recipient atau memanipulasi identitas penerima sehingga data release dikirim kepada pihak yang salah. | Data Recipient, File Vault |
| T12 | API / Web Application | D — Denial of Service | Request berlebihan atau penyalahgunaan endpoint dapat mengganggu ketersediaan aplikasi dan mencegah pengguna melakukan check-in atau mengakses vault. | Layanan LastKey, Check-in |
| T13 | Encryption Key Store | I — Information Disclosure | Kebocoran encryption key dapat memungkinkan pihak yang tidak berwenang memperoleh kemampuan untuk membuka data vault yang dilindungi. | Encryption Key, File Vault |
| T14 | Encryption Key Store | T — Tampering | Perubahan atau penggantian encryption key dapat menyebabkan data tidak dapat dibuka atau membuka peluang penggunaan key yang dikendalikan penyerang. | Encryption Key, File Vault |
| T15 | Notification Service | I — Information Disclosure | Informasi sensitif pada email atau notifikasi dapat terlihat oleh pihak yang tidak seharusnya menerimanya. | Data Recipient, Informasi Release |

---

## 3. Penjelasan Ancaman Utama

### T01 — Session Hijacking / Credential Abuse

**Kategori:** Spoofing

Penyerang yang memperoleh kredensial atau session pengguna dapat menyamar sebagai pengguna yang sah. Kondisi ini berbahaya karena akun LastKey menjadi pintu masuk menuju vault dan konfigurasi Dead Man's Switch.

**Aset terdampak:**
- Akun User
- Session
- Vault Data

---

### T03 — Manipulasi Metadata Vault

**Kategori:** Tampering

Request pengelolaan vault dapat dimanipulasi sehingga nama, konfigurasi, atau metadata vault berubah tanpa izin.

**Aset terdampak:**
- Metadata Vault
- Konfigurasi Vault

---

### T04 — Kebocoran File Vault

**Kategori:** Information Disclosure

File dalam vault merupakan aset utama LastKey. Apabila kontrol akses atau perlindungan penyimpanan tidak diterapkan dengan benar, pihak yang tidak berwenang dapat memperoleh isi file.

**Aset terdampak:**
- File dalam Vault

---

### T06 — Manipulasi Check-in

**Kategori:** Tampering

Penyerang dapat mencoba mengubah status atau timestamp check-in. Jika berhasil, sistem dapat menganggap pengguna masih aktif sehingga mekanisme release tidak berjalan sesuai kondisi sebenarnya.

**Aset terdampak:**
- Data Check-in
- Status Dead Man's Switch

---

### T07 — Manipulasi Jadwal Release

**Kategori:** Tampering

Konfigurasi interval check-in atau grace period dapat dimanipulasi. Hal tersebut dapat menyebabkan release terjadi terlalu cepat atau terlalu lambat.

**Aset terdampak:**
- Data Check-in
- Konfigurasi Release
- File Vault

---

### T09 — Manipulasi Audit Log

**Kategori:** Tampering

Jika penyerang dapat mengubah atau menghapus audit log, aktivitas berbahaya dapat disembunyikan dan proses investigasi menjadi lebih sulit.

**Aset terdampak:**
- Audit Log

---

### T11 — Pemalsuan Recipient

**Kategori:** Spoofing

Identitas recipient dapat dipalsukan atau dimanipulasi sehingga mekanisme release berpotensi mengirim data kepada pihak yang salah.

**Aset terdampak:**
- Data Recipient
- File Vault

---

### T12 — Denial of Service

**Kategori:** Denial of Service

Serangan terhadap endpoint aplikasi dapat menyebabkan LastKey tidak tersedia. Dalam konteks Dead Man's Switch, ketersediaan sangat penting karena pengguna harus dapat melakukan check-in ketika diperlukan.

**Aset terdampak:**
- Layanan LastKey
- Check-in
- Vault Access

---

### T13 — Kebocoran Encryption Key

**Kategori:** Information Disclosure

Encryption key merupakan aset kritis. Jika key diperoleh pihak yang tidak berwenang, perlindungan enkripsi terhadap vault dapat kehilangan efektivitasnya.

**Aset terdampak:**
- Encryption Key
- File Vault

---

### T14 — Manipulasi Encryption Key

**Kategori:** Tampering

Perubahan atau penggantian encryption key dapat menyebabkan data tidak dapat didekripsi atau menyebabkan sistem menggunakan key yang tidak seharusnya.

**Aset terdampak:**
- Encryption Key
- File Vault

---

## 4. Catatan Kondisi Produk

Beberapa ancaman di atas berkaitan dengan komponen backend, database, key management, scheduler, dan notification service yang masih berada pada tahap rancangan pada versi awal LastKey.

Ancaman tersebut tetap dianalisis karena komponen tersebut merupakan bagian dari arsitektur yang direncanakan untuk implementasi produk berikutnya. Penilaian risiko pada tahap berikutnya akan mempertimbangkan kondisi aktual implementasi LastKey saat ini.