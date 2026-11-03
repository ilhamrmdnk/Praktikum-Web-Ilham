# Risk Analysis — LastKey

## 1. Tujuan

Analisis risiko dilakukan untuk menentukan ancaman yang paling perlu diprioritaskan pada LastKey berdasarkan kemungkinan terjadinya dan dampaknya terhadap produk.

Penilaian menggunakan dua faktor:

- **Likelihood:** kemungkinan ancaman terjadi.
- **Impact:** tingkat dampak apabila ancaman berhasil terjadi.

Skala yang digunakan:

### Likelihood

| Nilai | Tingkat | Deskripsi |
|---|---|---|
| 1 | Rendah | Kemungkinan terjadi relatif kecil pada kondisi produk saat ini. |
| 2 | Sedang | Memungkinkan terjadi dan terdapat kondisi yang dapat mendukung terjadinya ancaman. |
| 3 | Tinggi | Relatif mudah terjadi atau terdapat kelemahan yang meningkatkan kemungkinan serangan. |

### Impact

| Nilai | Tingkat | Deskripsi |
|---|---|---|
| 1 | Rendah | Dampak terbatas dan tidak mengganggu fungsi utama LastKey. |
| 2 | Sedang | Mengganggu sebagian fungsi atau menyebabkan dampak keamanan yang signifikan. |
| 3 | Tinggi | Dapat menyebabkan kebocoran atau manipulasi aset utama dan mengganggu tujuan utama LastKey. |

### Perhitungan Risiko

Nilai risiko dihitung dengan:

**Risk Score = Likelihood × Impact**

| Score | Prioritas |
|---|---|
| 1–2 | Rendah |
| 3–4 | Sedang |
| 6–9 | Tinggi |

---

## 2. Lima Risiko Prioritas

| ID | Threat | Likelihood | Impact | Score | Prioritas |
|---|---|---:|---:|---:|---|
| R01 | T01 — Penyalahgunaan credential/session | 3 | 3 | 9 | Tinggi |
| R02 | T04 — Kebocoran File Vault | 2 | 3 | 6 | Tinggi |
| R03 | T06 — Manipulasi Check-in | 2 | 3 | 6 | Tinggi |
| R04 | T11 — Pemalsuan Recipient | 2 | 3 | 6 | Tinggi |
| R05 | T13 — Kebocoran Encryption Key | 2 | 3 | 6 | Tinggi |

---

## 3. Justifikasi Risiko

### R01 — Penyalahgunaan Credential / Session

**Threat:** T01 — Spoofing

**Likelihood: Tinggi (3)**

Pada kondisi pengembangan saat ini, autentikasi server-side dan session management belum diimplementasikan. LastKey masih berada pada tahap awal pengembangan sehingga mekanisme autentikasi dan perlindungan session belum tersedia secara nyata.

Kondisi tersebut membuat area autentikasi menjadi salah satu risiko utama ketika fitur akun mulai diimplementasikan.

**Impact: Tinggi (3)**

Apabila penyerang berhasil menyamar sebagai pengguna, penyerang berpotensi memperoleh akses terhadap vault, konfigurasi recipient, dan fitur check-in.

Hal tersebut dapat mengancam kerahasiaan dan integritas data utama LastKey.

**Risk Score: 9 — Tinggi**

---

### R02 — Kebocoran File Vault

**Threat:** T04 — Information Disclosure

**Likelihood: Sedang (2)**

File vault merupakan aset utama yang nantinya disimpan oleh sistem. Pada versi awal, backend, database, dan mekanisme enkripsi file belum diimplementasikan.

Karena mekanisme perlindungan penyimpanan belum tersedia secara nyata, risiko kebocoran perlu menjadi perhatian utama ketika penyimpanan data mulai diimplementasikan.

**Impact: Tinggi (3)**

Kebocoran file dapat langsung menghilangkan tujuan utama LastKey sebagai digital vault yang melindungi data penting pengguna.

**Risk Score: 6 — Tinggi**

---

### R03 — Manipulasi Check-in

**Threat:** T06 — Tampering

**Likelihood: Sedang (2)**

Fitur check-in sudah tersedia pada sisi antarmuka, tetapi mekanisme timer dan validasi check-in server-side belum diimplementasikan.

Pada tahap pengembangan berikutnya, apabila status atau timestamp check-in hanya dipercaya dari sisi client, terdapat peluang manipulasi.

**Impact: Tinggi (3)**

Check-in merupakan bagian penting dari konsep Dead Man's Switch. Manipulasi status dapat menyebabkan sistem salah menentukan apakah pengguna masih aktif dan berpotensi mengubah keputusan release.

**Risk Score: 6 — Tinggi**

---

### R04 — Pemalsuan Recipient

**Threat:** T11 — Spoofing

**Likelihood: Sedang (2)**

LastKey sudah memiliki konsep recipient, tetapi validasi identitas recipient dan mekanisme pengiriman secure release belum diimplementasikan secara nyata.

Apabila identitas recipient tidak diverifikasi dengan benar, penyerang dapat mencoba mengubah penerima menjadi pihak yang tidak berhak.

**Impact: Tinggi (3)**

Recipient merupakan pihak yang akan menerima data ketika mekanisme release dijalankan. Kesalahan identitas recipient dapat menyebabkan data sensitif dikirim kepada pihak yang salah.

**Risk Score: 6 — Tinggi**

---

### R05 — Kebocoran Encryption Key

**Threat:** T13 — Information Disclosure

**Likelihood: Sedang (2)**

Encryption key belum digunakan dan dikelola secara nyata pada versi awal LastKey. Ketika fitur enkripsi mulai diimplementasikan, key management akan menjadi komponen kritis yang perlu diamankan.

**Impact: Tinggi (3)**

Jika encryption key bocor, penyerang berpotensi memperoleh kemampuan untuk membuka data vault yang seharusnya terlindungi.

Dampaknya dapat menghilangkan efektivitas perlindungan enkripsi terhadap file vault.

**Risk Score: 6 — Tinggi**

---

## 4. Prioritas Risiko

Berdasarkan hasil penilaian, risiko dengan prioritas tertinggi adalah:

1. **R01 — Penyalahgunaan Credential / Session (Score 9)**
2. **R02 — Kebocoran File Vault (Score 6)**
3. **R03 — Manipulasi Check-in (Score 6)**
4. **R04 — Pemalsuan Recipient (Score 6)**
5. **R05 — Kebocoran Encryption Key (Score 6)**

R01 memiliki skor tertinggi karena autentikasi dan session merupakan titik akses utama menuju fitur LastKey.

Risiko lainnya memiliki impact tinggi karena secara langsung dapat memengaruhi file vault, mekanisme Dead Man's Switch, recipient, atau encryption key.

---

## 5. Catatan

Penilaian risiko ini dibuat berdasarkan kondisi pengembangan LastKey pada milestone `sec-0.1`. Beberapa komponen keamanan seperti backend, database, autentikasi server-side, key management, dan secure release masih berada pada tahap rancangan.

Oleh karena itu, likelihood dan impact tidak dimaksudkan sebagai statistik empiris, tetapi sebagai penilaian awal berdasarkan kondisi arsitektur dan tingkat kepentingan aset pada produk.