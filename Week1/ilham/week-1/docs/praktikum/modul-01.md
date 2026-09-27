# Dokumentasi Praktikum Modul 01

## Lingkungan Pengembangan, Git, dan Lalu Lintas HTTP

**Nama:** Moh Ilham Ramadhan Kurniawan  
**NIM:** 105224014  
**Repository:** <https://github.com/ilhamrmdnk/Praktikum-Web-Ilham>

---

## 1. Lingkungan Pengembangan

Lingkungan pengembangan yang digunakan dalam praktikum Modul 01 adalah sebagai berikut.

| Komponen           | Versi / Keterangan |
| ------------------ | ------------------ |
| Sistem Operasi     | Linux Mint         |
| Node.js            | v20.20.2           |
| npm                | 10.8.2             |
| Git                | 2.43.0             |
| Visual Studio Code | 1.129.1            |

Versi perangkat lunak diperiksa menggunakan perintah berikut:

```bash
node -v
npm -v
git --version
code --version
```

Hasil pemeriksaan:

```
Node.js : v20.20.2
npm     : 10.8.2
Git     : 2.43.0
VS Code : 1.129.1
```

Project yang digunakan merupakan project berbasis **Next.js** dengan TypeScript dan Tailwind CSS.

Project dijalankan menggunakan perintah:

```bash
npm run dev
```

Setelah server development berjalan, aplikasi dapat diakses melalui `http://localhost:3000`.

---

## 2. Alur Kerja Git

### 2.1 Riwayat Commit

Project dikelola menggunakan Git dengan branch pengembangan `latihan-w1`.

Riwayat commit diperiksa menggunakan perintah:

```bash
git log --oneline --graph
```

Hasil pemeriksaan:

```
* 5deee3b (HEAD -> latihan-w1) docs: add modul 01 documentation
* 7df1a8b (origin/Week-1, main, Week-1) feat: initialize Next.js project with TypeScript and Tailwind CSS
```

Dari riwayat tersebut terlihat bahwa project memiliki dua commit:

1. `7df1a8b` — inisialisasi project Next.js
2. `5deee3b` — penambahan dokumentasi Modul 01

### 2.2 Pull Request

Setelah perubahan dokumentasi dibuat pada branch `latihan-w1`, branch tersebut dikirim ke repository GitHub menggunakan:

```bash
git push -u origin latihan-w1
```

Kemudian dibuat Pull Request untuk menggabungkan perubahan dari branch `latihan-w1` ke branch `Week-1`. Pull Request berhasil di-merge dengan status **Merged**.

🔗 [Pull Request #1](https://github.com/ilhamrmdnk/Praktikum-Web-Ilham/pull/1)

### 2.3 Konflik Git

Selama proses pengerjaan praktikum tidak ditemukan merge conflict. Perubahan pada branch `latihan-w1` dapat digabungkan ke branch `Week-1` tanpa konflik, sehingga tidak diperlukan penyelesaian konflik secara manual.

---

## 3. Pengamatan Lalu Lintas HTTP

Pengamatan lalu lintas HTTP dilakukan menggunakan **browser DevTools** (tab Network) dan perintah `curl` pada terminal.

Project dijalankan terlebih dahulu menggunakan:

```bash
npm run dev
```

Kemudian aplikasi dibuka melalui `http://localhost:3000`.

### 3.1 Ringkasan Hasil Pengamatan

| No. | URL                             | Method | Status                | Content-Type               | Cache-Control               |
| --- | ------------------------------- | ------ | --------------------- | -------------------------- | --------------------------- |
| 1   | `http://localhost:3000/`        | GET    | 200 OK                | `text/html; charset=utf-8` | `no-cache, must-revalidate` |
| 2   | `http://localhost:3000/blabla`  | GET    | 404 Not Found         | `text/html; charset=utf-8` | `no-cache, must-revalidate` |
| 3   | File CSS localhost               | GET    | 200 OK                | `text/css; charset=UTF-8`  | `no-cache, must-revalidate` |
| 4   | `http://github.com`             | HEAD   | 301 Moved Permanently | —                          | —                           |
| 5   | `https://developer.mozilla.org` | GET    | 200 / 304             | —                          | —                           |

### 3.2 Request Halaman Utama

**URL:** `http://localhost:3000/`

```
Method        : GET
Status        : 200 OK
Content-Type  : text/html; charset=utf-8
Cache-Control : no-cache, must-revalidate
```

- Method `GET` digunakan browser untuk meminta resource dari server.
- Status `200 OK` menunjukkan request berhasil dan halaman utama berhasil diberikan.
- `Content-Type: text/html; charset=utf-8` menunjukkan response berupa dokumen HTML dengan encoding UTF-8.
- `Cache-Control: no-cache, must-revalidate` menunjukkan aturan caching yang ditetapkan server.

### 3.3 Request Halaman yang Tidak Ditemukan

**URL:** `http://localhost:3000/blabla`

```
Method        : GET
Status        : 404 Not Found
Content-Type  : text/html; charset=utf-8
Cache-Control : no-cache, must-revalidate
```

Status `404 Not Found` menunjukkan bahwa server menerima request, namun resource yang diminta tidak ditemukan. URL `/blabla` sengaja digunakan sebagai halaman yang tidak tersedia pada project.

### 3.4 Request File CSS

**URL:** `http://localhost:3000/_next/static/chunks/%5Broot-of-the-server%5D__0cbk-n2._css`

```
Method        : GET
Status        : 200 OK
Content-Type  : text/css; charset=UTF-8
Cache-Control : no-cache, must-revalidate
```

- `Content-Type: text/css` menunjukkan bahwa response merupakan resource stylesheet CSS.

### 3.5 Pengujian `http://github.com` dengan `curl -I`

```bash
curl -I http://github.com
```

Hasil:

```
HTTP/1.1 301 Moved Permanently
Content-Length: 0
Location: https://github.com/
```

Status `301 Moved Permanently` menunjukkan pengalihan permanen ke alamat lain. Header `Location` menunjukkan tujuan pengalihan, yaitu `https://github.com/`. Request HTTP diarahkan ke HTTPS.

```
http://github.com  →(301)→  https://github.com/
```

> **Mengapa `curl -I` menggunakan method HEAD?**  
> Option `-I` pada `curl` melakukan request dengan method `HEAD`, yang hanya mengambil header response tanpa response body. Cara ini cocok untuk memeriksa status dan header HTTP secara ringkas.

### 3.6 Pengamatan Cache pada Developer Mozilla

Pengamatan dilakukan terhadap `https://developer.mozilla.org` menggunakan DevTools Network dengan membandingkan dua kondisi:

| Kondisi                    | Status yang Ditemukan |
| -------------------------- | --------------------- |
| **Disable cache** aktif    | `200`, `201`          |
| Cache browser digunakan    | `304 Not Modified`    |

Status `304 Not Modified` menunjukkan bahwa resource tidak mengalami perubahan setelah proses validasi cache, sehingga browser dapat menggunakan resource yang sudah tersimpan di cache tanpa mengunduh ulang.

### 3.7 Pengujian `curl -v`

```bash
curl -v https://example.com
```

Option `-v` menampilkan detail komunikasi antara client dan server:

- Baris diawali `>` → data/header yang **dikirim** oleh client:

```
> GET / HTTP/2
> Host: example.com
> User-Agent: curl/8.5.0
> Accept: */*
```

- Baris diawali `<` → **response** yang diterima dari server:

```
< HTTP/2 200
< content-type: text/html
< server: cloudflare
< cf-cache-status: HIT
```

Header `cf-cache-status: HIT` menunjukkan response dilayani dari cache Cloudflare.

### 3.8 Analisis Status HTTP

| Status                  | Analisis                                                                                                              |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `200 OK`                | Request berhasil dan resource berhasil diberikan kepada client.                                                       |
| `201 Created`           | Request berhasil dan resource baru berhasil dibuat (ditemukan pada Developer Mozilla).                                |
| `301 Moved Permanently` | Request dialihkan secara permanen ke alamat lain. Tujuan redirect ditunjukkan oleh header `Location`.                |
| `304 Not Modified`      | Resource tidak berubah setelah validasi cache; browser dapat menggunakan resource yang sudah ada pada cache.          |
| `404 Not Found`         | Resource yang diminta tidak ditemukan. Terjadi saat membuka `/blabla` pada localhost.                                 |

---

## 4. Kendala dan Penyelesaian

### 4.1 Kebingungan Mengenai File Dokumentasi

Pada awal pengerjaan terdapat kebingungan mengenai tempat membuat dokumentasi teknis. Dokumentasi teknis tidak menggantikan README, melainkan dibuat sebagai file tersendiri di `docs/praktikum/modul-01.md` sesuai struktur yang ditentukan pada Modul 01.

### 4.2 Kebingungan Mengenai Git dan Pull Request

Project sudah berhasil di-push ke GitHub, tetapi Pull Request belum dibuat. Setelah memahami alurnya, branch `latihan-w1` dikirim menggunakan:

```bash
git push -u origin latihan-w1
```

Kemudian Pull Request dari `latihan-w1` ke `Week-1` dibuat dan berhasil di-merge.

Pemahaman yang diperoleh: `git push` dan Pull Request merupakan dua hal yang berbeda. `git push` mengirim commit dari repository lokal ke repository remote, sedangkan Pull Request digunakan untuk mengajukan penggabungan perubahan dari satu branch ke branch lainnya.

### 4.3 Kebingungan Memahami Status HTTP

Beberapa status HTTP seperti `200`, `301`, `304`, dan `404` dipahami dengan membandingkan request dan response yang diperoleh selama pengamatan:

```
http://localhost:3000/       → 200 OK            (halaman berhasil diberikan)
http://localhost:3000/blabla → 404 Not Found      (resource tidak ditemukan)
http://github.com            → 301 Moved Permanently → https://github.com/
```

### 4.4 Kebingungan Memahami Cache

Perbedaan response ketika cache browser digunakan dan ketika cache dinonaktifkan dipahami dengan menggunakan DevTools Network dan membandingkan hasil pada kondisi **Disable cache** aktif dan tidak aktif. Ditemukannya response `304 Not Modified` membantu memahami mekanisme validasi cache browser.

---

## 5. Catatan Pemanfaatan AI

Dalam pengerjaan dokumentasi praktikum ini digunakan **ChatGPT** sebagai alat bantu untuk:

1. Memahami instruksi dan struktur Modul 01.
2. Memahami konsep Git: `git status`, `git add`, `git commit`, branch, `git push`, dan Pull Request.
3. Memahami konsep HTTP: method, status code, header, redirect, dan cache.
4. Menjelaskan hasil pengamatan dari DevTools Network.
5. Menjelaskan hasil pengujian menggunakan `curl`.
6. Menyusun dokumentasi dalam format Markdown.

Perintah-perintah yang digunakan selama praktikum:

```bash
npm run dev
git status
git add docs/
git commit -m "docs: add modul 01 documentation"
git log --oneline --graph
git push -u origin latihan-w1
curl -I http://localhost:3000
curl -I http://github.com
curl -v https://example.com
```

Hasil yang diberikan oleh AI tidak digunakan sebagai pengganti pengujian langsung. Seluruh hasil pengamatan HTTP diverifikasi menggunakan browser DevTools dan terminal, serta hasil Git diperiksa melalui perintah Git pada repository lokal maupun melalui GitHub.
