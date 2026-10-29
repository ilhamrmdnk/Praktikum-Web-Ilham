# AI Usage Log — LastKey

## Penggunaan AI

Dalam pengerjaan proyek LastKey, AI digunakan sebagai alat bantu untuk memahami materi, menyusun dokumentasi, dan membantu proses perancangan keamanan aplikasi.

## Penggunaan AI pada Cyber Security Latihan 1

AI digunakan untuk membantu:

1. Mengidentifikasi aset dan data yang perlu dilindungi pada aplikasi LastKey.
2. Menentukan klasifikasi Confidentiality (C), Integrity (I), dan Availability (A) beserta alasan awalnya.
3. Membantu menyusun struktur file `security/assets.md`.
4. Membantu merancang DFD awal LastKey yang menunjukkan entitas, proses, data store, aliran data, dan trust boundary.
5. Membantu menjelaskan data yang direncanakan untuk dilindungi menggunakan mekanisme kriptografi.

## Batasan Penggunaan AI

AI digunakan sebagai alat bantu dan bukan sebagai pengganti pemahaman atau pengambilan keputusan mahasiswa.

Hasil dari AI diperiksa dan disesuaikan dengan kondisi serta rancangan aplikasi LastKey. Informasi yang berkaitan dengan implementasi keamanan yang belum dibuat tidak dianggap sebagai fitur yang sudah berjalan.

## File yang Dibantu AI

- `security/assets.md` — penyusunan inventaris aset dan klasifikasi keamanan.
- `security/dfd-awal.png` — diskusi penyusunan rancangan DFD awal dan membantu membuat gambar DFD.
- `AI_LOG.md` — dokumentasi penggunaan AI.

## Penggunaan AI pada Tugas 1 — Threat Modeling

AI digunakan sebagai alat bantu dalam:

1. Memperbarui inventaris aset dan data LastKey.
2. Menyusun rancangan DFD dan trust boundary.
3. Mengidentifikasi ancaman menggunakan metode STRIDE.
4. Membantu menyusun analisis kemungkinan dan dampak risiko.
5. Menyusun rencana kontrol keamanan untuk lima risiko prioritas.
6. Membantu melakukan pengecekan konsistensi antara aset, threat, risiko, dan kontrol.

Hasil analisis diperiksa dan disesuaikan dengan kondisi serta rancangan produk LastKey. Komponen yang belum diimplementasikan pada versi produk saat ini dicatat sebagai rancangan atau target pengembangan dan tidak dianggap sebagai fitur yang sudah berjalan.

## File yang Dibantu AI pada Tugas 1

- `security/assets.md` — pembaruan inventaris aset dan data.
- `security/dfd-arsitektur-sec-0.1.png` — penyusunan rancangan arsitektur, aliran data, dan trust boundary.
- `security/stride.md` — penyusunan identifikasi ancaman berdasarkan STRIDE.
- `security/risk-analysis.md` — penyusunan analisis likelihood, impact, dan lima risiko prioritas.
- `security/control-plan.md` — penyusunan rencana kontrol untuk risiko prioritas.
- `AI_LOG.md` — dokumentasi penggunaan AI.

## Cryptography Task

### AI Usage

AI digunakan sebagai bantuan dalam:
- memahami konsep AES-256-GCM;
- merancang struktur komponen enkripsi dan dekripsi;
- membantu implementasi menggunakan library `@noble/ciphers`;
- membantu membuat automated test;
- membantu memeriksa dokumentasi dan struktur README.

### Human Verification

Kode tidak langsung digunakan tanpa pemeriksaan. Implementasi diverifikasi dengan:
- `npm test`
- `npx tsc --noEmit`
- `npm run build`

Hasil pengujian menunjukkan 4 test berhasil dan build Next.js berhasil.