# Security Control Plan — LastKey

## 1. Tujuan

Control plan dibuat berdasarkan lima risiko prioritas yang telah diidentifikasi pada analisis risiko LastKey.

Setiap kontrol dirancang untuk menurunkan kemungkinan terjadinya ancaman, mengurangi dampaknya, atau keduanya.

---

## 2. Rencana Kontrol

| ID Risiko | Risiko | Kontrol Utama | Tujuan Kontrol | Dampak terhadap Risiko |
|---|---|---|---|---|
| R01 | Penyalahgunaan credential/session | Password hashing, secure session, rate limiting, dan MFA/passkey | Mencegah penyalahgunaan akun dan session | Menurunkan likelihood |
| R02 | Kebocoran File Vault | Enkripsi file, authorization berbasis kepemilikan, dan secure storage | Mencegah pihak tidak berwenang membaca file | Menurunkan likelihood dan impact |
| R03 | Manipulasi Check-in | Validasi server-side, server-side timestamp, dan authorization | Mencegah manipulasi status dan waktu check-in | Menurunkan likelihood |
| R04 | Pemalsuan Recipient | Verifikasi recipient, authorization, dan validasi perubahan recipient | Mencegah data release dikirim ke pihak yang salah | Menurunkan likelihood dan impact |
| R05 | Kebocoran Encryption Key | Key management terpisah, access control, dan tidak menyimpan key secara plaintext | Mengurangi kemungkinan key dicuri atau digunakan pihak lain | Menurunkan likelihood dan impact |

---

## 3. Penjelasan Kontrol

### R01 — Penyalahgunaan Credential / Session

**Risiko:** T01 — Spoofing

#### Kontrol

1. **Password hashing**

   Password pengguna tidak disimpan dalam bentuk plaintext. Password harus diproses menggunakan password hashing yang sesuai.

2. **Secure session management**

   Session harus dikelola menggunakan mekanisme yang aman dan tidak mempercayai data identitas dari client.

3. **Rate limiting**

   Percobaan login yang berlebihan dibatasi untuk mengurangi risiko brute-force terhadap akun.

4. **MFA atau Passkey**

   Autentikasi tambahan dapat digunakan untuk mengurangi risiko apabila password pengguna berhasil diketahui pihak lain.

#### Alasan

Kontrol tersebut mengurangi kemungkinan penyerang memperoleh akses melalui credential atau session pengguna.

---

### R02 — Kebocoran File Vault

**Risiko:** T04 — Information Disclosure

#### Kontrol

1. **Enkripsi file**

   File sensitif dalam vault harus dienkripsi sebelum atau saat disimpan menggunakan library kriptografi yang terpelihara.

2. **Authorization berdasarkan kepemilikan**

   Setiap request untuk mengakses vault harus memeriksa apakah pengguna memang memiliki hak terhadap vault tersebut.

3. **Secure storage**

   File dan metadata sensitif harus disimpan pada storage yang memiliki pembatasan akses.

4. **Validasi file**

   File upload harus divalidasi berdasarkan tipe, ukuran, dan aturan keamanan yang ditentukan aplikasi.

#### Alasan

Enkripsi mengurangi dampak apabila storage terekspos, sedangkan authorization mencegah pengguna yang tidak berhak mengakses vault melalui aplikasi.

---

### R03 — Manipulasi Check-in

**Risiko:** T06 — Tampering

#### Kontrol

1. **Server-side validation**

   Status check-in tidak boleh hanya ditentukan oleh client.

2. **Server-side timestamp**

   Waktu check-in harus ditentukan oleh server agar client tidak dapat memalsukan timestamp.

3. **Authorization**

   Hanya pemilik akun yang sah yang boleh melakukan check-in terhadap vault miliknya.

4. **Audit logging**

   Aktivitas check-in dicatat sehingga perubahan atau aktivitas mencurigakan dapat ditelusuri.

#### Alasan

Kontrol tersebut mengurangi kemungkinan manipulasi check-in melalui perubahan request atau data pada client.

Hal ini penting karena check-in merupakan bagian dari mekanisme Dead Man's Switch.

---

### R04 — Pemalsuan Recipient

**Risiko:** T11 — Spoofing

#### Kontrol

1. **Recipient verification**

   Sistem harus memverifikasi identitas atau alamat recipient sebelum recipient dapat digunakan untuk proses release.

2. **Authorization**

   Perubahan recipient hanya boleh dilakukan oleh pemilik vault yang sah.

3. **Konfirmasi perubahan**

   Perubahan recipient dapat memerlukan konfirmasi tambahan untuk mengurangi risiko perubahan tidak sah.

4. **Audit logging**

   Penambahan, perubahan, dan penghapusan recipient dicatat dalam audit log.

#### Alasan

Kontrol tersebut mengurangi kemungkinan recipient diganti oleh pihak yang tidak berwenang dan mengurangi risiko data dikirim kepada pihak yang salah.

---

### R05 — Kebocoran Encryption Key

**Risiko:** T13 — Information Disclosure

#### Kontrol

1. **Key management terpisah**

   Encryption key tidak disimpan bersama file dalam bentuk yang mudah diakses.

2. **Access control**

   Hanya proses atau komponen yang membutuhkan key yang boleh mengaksesnya.

3. **Tidak menyimpan key dalam plaintext**

   Key tidak boleh disimpan di source code, repository Git, atau konfigurasi yang dapat diakses secara tidak sah.

4. **Key rotation / lifecycle management**

   Pengelolaan lifecycle key harus dirancang agar key dapat dibuat, digunakan, dan dihentikan dengan aman.

#### Alasan

Encryption key merupakan aset kritis. Perlindungan key mengurangi kemungkinan pihak lain memperoleh kemampuan untuk membuka file vault yang telah dienkripsi.

---

## 4. Prioritas Implementasi Kontrol

Kontrol keamanan diprioritaskan berdasarkan risiko yang telah diidentifikasi.

### Prioritas 1 — Authentication & Session

Kontrol:

- Password hashing
- Secure session
- Rate limiting
- MFA/passkey

**Alasan:** R01 memiliki risk score tertinggi yaitu 9 dan authentication merupakan titik akses utama menuju data pengguna.

### Prioritas 2 — Perlindungan File Vault

Kontrol:

- Enkripsi file
- Authorization
- Secure storage
- File validation

**Alasan:** File vault merupakan aset utama LastKey dan memiliki nilai kerahasiaan yang tinggi.

### Prioritas 3 — Perlindungan Check-in

Kontrol:

- Server-side validation
- Server-side timestamp
- Authorization
- Audit logging

**Alasan:** Manipulasi check-in dapat memengaruhi keputusan Dead Man's Switch.

### Prioritas 4 — Perlindungan Recipient

Kontrol:

- Recipient verification
- Authorization
- Confirmation
- Audit logging

**Alasan:** Recipient menentukan pihak yang akan menerima data ketika release dilakukan.

### Prioritas 5 — Key Management

Kontrol:

- Secure key storage
- Access control
- Key lifecycle management
- Tidak menyimpan key dalam source code

**Alasan:** Kebocoran encryption key dapat menyebabkan perlindungan enkripsi terhadap vault kehilangan efektivitasnya.

---

## 5. Kondisi Implementasi

Kontrol pada dokumen ini merupakan rencana keamanan untuk pengembangan LastKey.

Sebagian kontrol belum diterapkan pada versi awal produk karena backend, database, autentikasi server-side, key management, dan mekanisme secure release masih dalam tahap pengembangan.

Kontrol akan diterapkan secara bertahap pada milestone pengembangan berikutnya.

---

## 6. Ringkasan

Lima risiko prioritas LastKey memiliki kontrol utama sebagai berikut:

| Risiko | Kontrol Utama |
|---|---|
| Credential / Session Abuse | Secure authentication, session management, rate limiting, MFA/passkey |
| File Vault Disclosure | Encryption + authorization + secure storage |
| Check-in Tampering | Server-side validation + server timestamp + authorization |
| Recipient Spoofing | Recipient verification + authorization + confirmation |
| Encryption Key Disclosure | Secure key management + access control + key lifecycle |