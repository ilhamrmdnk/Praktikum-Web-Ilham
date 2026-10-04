import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

/* -------------------------------------------------------------------------- */
/*                                  Mock Data                                  */
/* -------------------------------------------------------------------------- */

type Game = {
  id: number;
  title: string;
  genre: string;
  platforms: string[];
  rating: number;
  year: number;
  cover: string;
  alt: string;
  description: string;
};

const games: Game[] = [
  {
    id: 1,
    title: "Nebula Drift",
    genre: "Sci-Fi Racing",
    platforms: ["PC", "PlayStation"],
    rating: 4.7,
    year: 2025,
    cover: "/games/nebula-drift.svg",
    alt: "Sampul Nebula Drift: pesawat luar angkasa putih melaju di antara bintang dengan latar nebula ungu",
    description:
      "Balapan antarplanet berkecepatan tinggi dengan lintasan dinamis yang berubah setiap putaran.",
  },
  {
    id: 2,
    title: "Kingdom of Ash",
    genre: "Action RPG",
    platforms: ["PC", "Xbox", "PlayStation"],
    rating: 4.9,
    year: 2026,
    cover: "/games/kingdom-of-ash.svg",
    alt: "Sampul Kingdom of Ash: siluet kastel hitam di bawah langit senja berwarna jingga",
    description:
      "Jelajahi kerajaan yang runtuh, lawan bos raksasa, dan bangun kembali peradaban dari abu.",
  },
  {
    id: 3,
    title: "Pixel Farmers",
    genre: "Simulasi",
    platforms: ["PC", "Nintendo Switch", "Mobile"],
    rating: 4.6,
    year: 2024,
    cover: "/games/pixel-farmers.svg",
    alt: "Sampul Pixel Farmers: lumbung merah bergaya piksel di tengah ladang hijau dengan matahari kuning",
    description:
      "Kelola ladang, pelihara hewan, dan jalin persahabatan dengan warga desa yang menawan.",
  },
  {
    id: 4,
    title: "Shadow Protocol",
    genre: "Stealth Action",
    platforms: ["PC", "PlayStation"],
    rating: 4.5,
    year: 2025,
    cover: "/games/shadow-protocol.svg",
    alt: "Sampul Shadow Protocol: siluet agen rahasia berdiri di depan gedung-gedung kota pada malam hari",
    description:
      "Susupi markas musuh tanpa terdeteksi menggunakan gawai canggih dan strategi cerdik.",
  },
  {
    id: 5,
    title: "Turbo Rally X",
    genre: "Racing Arcade",
    platforms: ["Xbox", "Nintendo Switch"],
    rating: 4.3,
    year: 2023,
    cover: "/games/turbo-rally.svg",
    alt: "Sampul Turbo Rally X: mobil reli merah melaju di jalan aspal gurun berlatar kuning",
    description:
      "Aksi reli arkade penuh adrenalin dengan mode multipemain lokal hingga empat orang.",
  },
  {
    id: 6,
    title: "Mystic Puzzle Tower",
    genre: "Puzzle",
    platforms: ["Mobile", "Nintendo Switch"],
    rating: 4.4,
    year: 2024,
    cover: "/games/mystic-tower.svg",
    alt: "Sampul Mystic Puzzle Tower: menara warna-warni tersusun dari balok di bawah langit biru",
    description:
      "Susun balok ajaib untuk mendaki menara misterius dengan ratusan level teka-teki.",
  },
];

const trendingGames = [
  { rank: 1, title: "Kingdom of Ash", players: "1,2 jt pemain", popularity: 100 },
  { rank: 2, title: "Nebula Drift", players: "860 rb pemain", popularity: 72 },
  { rank: 3, title: "Pixel Farmers", players: "720 rb pemain", popularity: 60 },
  { rank: 4, title: "Shadow Protocol", players: "540 rb pemain", popularity: 45 },
  { rank: 5, title: "Mystic Puzzle Tower", players: "410 rb pemain", popularity: 34 },
];

const recommendationSteps = [
  {
    title: "Ceritakan selera bermainmu",
    body: "Pilih genre favorit, platform yang kamu miliki, serta durasi bermain yang kamu sukai — misalnya sesi singkat 15 menit atau petualangan panjang puluhan jam.",
  },
  {
    title: "Kami analisis riwayat & ulasan",
    body: "Sistem GameVault mencocokkan preferensimu dengan ribuan ulasan komunitas, rating kritikus, dan pola bermain pengguna lain yang memiliki selera serupa.",
  },
  {
    title: "Dapatkan rekomendasi personal",
    body: "Kamu menerima daftar game yang diurutkan berdasarkan tingkat kecocokan, lengkap dengan alasan mengapa game tersebut direkomendasikan untukmu.",
  },
  {
    title: "Beri umpan balik, makin akurat",
    body: "Setiap kali kamu menyukai atau melewati rekomendasi, sistem belajar dan menyesuaikan saran berikutnya agar semakin relevan.",
  },
];

const platformOptions = [
  { id: "platform-pc", value: "pc", label: "PC" },
  { id: "platform-playstation", value: "playstation", label: "PlayStation" },
  { id: "platform-xbox", value: "xbox", label: "Xbox" },
  { id: "platform-switch", value: "switch", label: "Nintendo Switch" },
  { id: "platform-mobile", value: "mobile", label: "Mobile" },
];

/* -------------------------------------------------------------------------- */
/*                              Shared class names                             */
/* -------------------------------------------------------------------------- */

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

const inputClass = `mt-1 block w-full rounded-lg border border-line-strong bg-void px-3 py-2 text-fg placeholder:text-muted ${focusRing}`;

/** Label kecil bergaya arcade di atas judul section, mis. "LEVEL 01". */
function LevelLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-pixel text-[0.65rem] uppercase tracking-widest text-neon sm:text-xs">
      {children}
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    Page                                     */
/* -------------------------------------------------------------------------- */

export default function Home() {
  return (
    <>
      {/* Skip link — tersembunyi hingga mendapat fokus keyboard */}
      <a
        href="#konten"
        className={`sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:font-semibold focus:text-on-brand focus:shadow-lg ${focusRing}`}
      >
        Lewati ke konten utama
      </a>

      {/* ============================ HEADER / NAV ============================ */}
      <header className="sticky top-0 z-40 border-b border-line bg-void/95 backdrop-blur">
        <div className="max-w-6xl mx-auto p-4">
          <nav
            aria-label="Navigasi utama"
            className="flex flex-wrap items-center justify-between gap-3"
          >
            <Link
              href="/"
              className={`flex items-center gap-3 rounded-md text-fg ${focusRing}`}
            >
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-accent to-brand font-pixel text-xs text-on-brand shadow-[0_0_16px_-2px_var(--glow-brand)]"
              >
                GV
              </span>
              <span className="font-pixel text-sm sm:text-base">
                Game<span className="text-brand">Vault</span>
              </span>
            </Link>

            <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-muted sm:gap-x-6 sm:text-base">
              <li>
                <Link
                  href="/"
                  aria-current="page"
                  className={`rounded-md text-brand underline decoration-2 underline-offset-8 ${focusRing}`}
                >
                  Beranda
                </Link>
              </li>
              <li>
                <a href="#katalog" className={`rounded-md hover:text-brand ${focusRing}`}>
                  Katalog
                </a>
              </li>
              <li>
                <a href="#cara-kerja" className={`rounded-md hover:text-brand ${focusRing}`}>
                  Rekomendasi
                </a>
              </li>
              <li>
                <a href="#saran" className={`rounded-md hover:text-brand ${focusRing}`}>
                  Kontak
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* ================================ MAIN ================================ */}
      <main id="konten" tabIndex={-1} className="max-w-6xl mx-auto w-full p-4 focus:outline-none">
        {/* ------------------------------ HERO ------------------------------ */}
        {/* Hero memuat satu-satunya <h1>; sengaja memakai <div> agar setiap <section> berjudul <h2> */}
        <div className="relative isolate my-6 overflow-hidden rounded-2xl border border-line bg-surface px-6 py-12 sm:px-10 md:py-16">
          {/* Dekorasi: grid ala arena + cahaya neon (disembunyikan dari pembaca layar) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--line)_1px,transparent_1px),linear-gradient(to_bottom,var(--line)_1px,transparent_1px)] bg-size-[36px_36px] opacity-60"
          />
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-28 -left-20 -z-10 h-72 w-72 rounded-full bg-brand/20 blur-3xl"
          />

          <LevelLabel>▶ Press Start</LevelLabel>
          <h1
            id="judul-utama"
            className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight text-fg sm:text-4xl lg:text-5xl"
          >
            Temukan game favorit berikutnya,{" "}
            <span className="text-brand">dipilih khusus untukmu.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-fg-soft sm:text-lg">
            GameVault mengumpulkan ribuan judul dari PC, konsol, dan mobile, lalu
            memberikan rekomendasi personal berdasarkan genre, platform, dan gaya
            bermainmu — tanpa perlu menebak-nebak lagi.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#katalog"
              className={`inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 font-bold text-on-brand shadow-[0_0_20px_-4px_var(--glow-brand)] hover:bg-brand-hover ${focusRing}`}
            >
              Jelajahi Katalog <span aria-hidden="true">→</span>
            </a>
            <a
              href="#saran"
              className={`inline-flex items-center justify-center rounded-lg border-2 border-accent px-5 py-3 font-bold text-accent hover:bg-accent hover:text-on-accent ${focusRing}`}
            >
              Kirim Saran Game
            </a>
          </div>

          {/* Statistik bergaya HUD */}
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6">
            <div className="flex flex-col-reverse gap-1">
              <dt className="text-xs text-muted sm:text-sm">Judul game</dt>
              <dd className="font-pixel text-sm text-brand sm:text-lg">10K+</dd>
            </div>
            <div className="flex flex-col-reverse gap-1">
              <dt className="text-xs text-muted sm:text-sm">Gamer aktif</dt>
              <dd className="font-pixel text-sm text-accent sm:text-lg">500K</dd>
            </div>
            <div className="flex flex-col-reverse gap-1">
              <dt className="text-xs text-muted sm:text-sm">Akurasi saran</dt>
              <dd className="font-pixel text-sm text-neon sm:text-lg">94%</dd>
            </div>
          </dl>
        </div>

        {/* ---------------------------- KATALOG ---------------------------- */}
        <section aria-labelledby="judul-katalog" id="katalog" className="scroll-mt-24 py-8">
          <LevelLabel>Level 01</LevelLabel>
          <h2 id="judul-katalog" className="mt-2 text-2xl font-bold text-fg sm:text-3xl">
            Katalog Game Pilihan
          </h2>
          <p className="mt-2 text-muted">
            Judul-judul populer yang sedang banyak dimainkan komunitas GameVault.
          </p>

          <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <li key={game.id}>
                <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition duration-200 hover:border-brand hover:shadow-[0_0_24px_-6px_var(--glow-brand)] motion-safe:hover:-translate-y-1">
                  <Image
                    src={game.cover}
                    alt={game.alt}
                    width={400}
                    height={225}
                    className="aspect-video h-auto w-full object-cover"
                  />
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full border border-accent px-3 py-1 text-xs font-semibold text-accent">
                        {game.genre}
                      </span>
                      <span className="text-sm font-bold text-gold">
                        <span aria-hidden="true">★ </span>
                        <span className="sr-only">Rating </span>
                        {game.rating.toFixed(1)}
                        <span className="sr-only"> dari 5</span>
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-fg group-hover:text-brand">
                      {game.title}
                    </h3>
                    <p className="mt-1 flex-1 text-sm text-muted">{game.description}</p>
                    <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 border-t border-line pt-3 text-sm">
                      <dt className="font-medium text-fg-soft">Platform</dt>
                      <dd className="text-muted">{game.platforms.join(", ")}</dd>
                      <dt className="font-medium text-fg-soft">Rilis</dt>
                      <dd className="text-muted">{game.year}</dd>
                    </dl>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------ DUA KOLOM: KONTEN + SIDEBAR ------------------ */}
        <div className="grid grid-cols-1 gap-8 py-8 lg:grid-cols-[2fr_1fr]">
          <section aria-labelledby="judul-cara-kerja" id="cara-kerja" className="scroll-mt-24">
            <LevelLabel>Level 02</LevelLabel>
            <h2 id="judul-cara-kerja" className="mt-2 text-2xl font-bold text-fg sm:text-3xl">
              Bagaimana Rekomendasi GameVault Bekerja
            </h2>
            <p className="mt-2 text-muted">
              Mesin rekomendasi kami menggabungkan preferensi pribadi dan
              kebijaksanaan komunitas untuk menyajikan game yang benar-benar
              cocok denganmu.
            </p>

            <ol className="mt-6 space-y-4">
              {recommendationSteps.map((step, index) => (
                <li key={step.title}>
                  <article className="flex gap-4 rounded-xl border border-line bg-surface p-4 sm:p-5">
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-brand to-neon font-pixel text-xs text-on-brand"
                    >
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-fg">
                        <span className="sr-only">Langkah {index + 1}: </span>
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted sm:text-base">{step.body}</p>
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </section>

          <aside
            aria-label="Game trending minggu ini"
            className="h-fit rounded-xl border border-accent/60 bg-surface-2 p-5 shadow-[0_0_28px_-10px_var(--glow-accent)]"
          >
            <p className="font-pixel text-[0.65rem] uppercase tracking-widest text-accent sm:text-xs">
              Leaderboard
            </p>
            <h2 className="mt-2 text-xl font-bold text-fg">🔥 Trending Minggu Ini</h2>
            <ol className="mt-4 divide-y divide-line">
              {trendingGames.map((item) => (
                <li key={item.rank} className="flex items-center gap-3 py-3">
                  <span
                    aria-hidden="true"
                    className={`w-7 font-pixel text-sm ${item.rank === 1 ? "text-gold" : "text-brand"}`}
                  >
                    {item.rank}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-fg">
                      <span className="sr-only">Peringkat {item.rank}: </span>
                      {item.title}
                    </p>
                    <p className="text-sm text-muted">{item.players}</p>
                    {/* Bar popularitas ala HUD — dekoratif, info sudah ada di teks */}
                    <div aria-hidden="true" className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-void">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-accent to-brand"
                        style={{ width: `${item.popularity}%` }}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-muted">
              Data diperbarui setiap Senin berdasarkan jumlah pemain aktif.
            </p>
          </aside>
        </div>

        {/* ------------------------- FORM SARAN ------------------------- */}
        <section aria-labelledby="judul-saran" id="saran" className="scroll-mt-24 py-8">
          <LevelLabel>Level 03</LevelLabel>
          <h2 id="judul-saran" className="mt-2 text-2xl font-bold text-fg sm:text-3xl">
            Sarankan Game / Hubungi Kami
          </h2>
          <p className="mt-2 max-w-2xl text-muted">
            Punya game favorit yang belum ada di katalog? Kirimkan saranmu dan
            tim kurator kami akan meninjaunya.
          </p>

          <form
            action="#saran"
            method="get"
            className="mt-6 max-w-2xl space-y-5 rounded-xl border border-line bg-surface p-5 sm:p-6"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="nama" className="block font-medium text-fg">
                  Nama lengkap
                </label>
                <input
                  id="nama"
                  name="nama"
                  type="text"
                  autoComplete="name"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-medium text-fg">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  aria-describedby="email-bantuan"
                  className={inputClass}
                />
                <p id="email-bantuan" className="mt-1 text-sm text-muted">
                  Kami hanya menggunakan email untuk membalas saranmu.
                </p>
              </div>
            </div>

            <div>
              <label htmlFor="judul-game" className="block font-medium text-fg">
                Judul game yang disarankan
              </label>
              <input
                id="judul-game"
                name="judul-game"
                type="text"
                autoComplete="off"
                aria-describedby="judul-game-bantuan"
                className={inputClass}
              />
              <p id="judul-game-bantuan" className="mt-1 text-sm text-muted">
                Opsional. Tulis judul lengkap, misalnya &quot;Hollow Knight: Silksong&quot;.
              </p>
            </div>

            <fieldset>
              <legend className="font-medium text-fg">Platform utama yang kamu gunakan</legend>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {platformOptions.map((option, index) => (
                  <div
                    key={option.id}
                    className="flex items-center gap-2 rounded-lg border border-line bg-void px-3 py-2 has-checked:border-brand"
                  >
                    <input
                      id={option.id}
                      name="platform"
                      type="radio"
                      value={option.value}
                      defaultChecked={index === 0}
                      className={`h-4 w-4 accent-brand ${focusRing}`}
                    />
                    <label htmlFor={option.id} className="text-fg-soft">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="pesan" className="block font-medium text-fg">
                Pesan
              </label>
              <textarea
                id="pesan"
                name="pesan"
                rows={5}
                autoComplete="off"
                required
                aria-describedby="pesan-bantuan"
                className={inputClass}
              />
              <p id="pesan-bantuan" className="mt-1 text-sm text-muted">
                Ceritakan alasan kamu menyukai game ini atau pertanyaan untuk tim
                GameVault (maksimal 500 karakter).
              </p>
            </div>

            <button
              type="submit"
              className={`inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 font-bold text-on-accent shadow-[0_0_20px_-4px_var(--glow-accent)] hover:brightness-110 sm:w-auto ${focusRing}`}
            >
              Kirim Saran <span aria-hidden="true">▶</span>
            </button>
          </form>
        </section>
      </main>

      {/* =============================== FOOTER =============================== */}
      <footer className="mt-auto border-t border-line bg-surface text-muted">
        <div aria-hidden="true" className="h-1 bg-linear-to-r from-accent via-brand to-neon" />
        <div className="max-w-6xl mx-auto p-4 py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="font-pixel text-sm text-fg">
                Game<span className="text-brand">Vault</span>
              </p>
              <p className="mt-2 max-w-sm text-sm">
                Katalog dan rekomendasi game untuk semua jenis pemain.
              </p>
            </div>
            <nav aria-label="Navigasi footer">
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <li>
                  <Link href="/" className={`rounded-md hover:text-brand hover:underline ${focusRing}`}>
                    Beranda
                  </Link>
                </li>
                <li>
                  <a href="#katalog" className={`rounded-md hover:text-brand hover:underline ${focusRing}`}>
                    Katalog
                  </a>
                </li>
                <li>
                  <a href="#saran" className={`rounded-md hover:text-brand hover:underline ${focusRing}`}>
                    Kontak
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <p className="mt-8 border-t border-line pt-4 text-sm">
            &copy; 2026 GameVault. Praktikum Pengembangan Aplikasi Web — Modul 2.
          </p>
        </div>
      </footer>
    </>
  );
}
