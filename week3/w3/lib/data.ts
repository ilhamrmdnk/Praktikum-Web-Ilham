import type { Item } from "./tipe";
 
export const daftarItem: Item[] = [
  {
    id: 1,
    judul: "Panel surya atap",
    kategori: "energi",
    deskripsi: "Pemantauan produksi listrik harian.",
    tersedia: true,
  },
  {
    id: 2,
    judul: "Inverter Listrik Smart",
    kategori: "energi",
    deskripsi: "Mengubah arus DC dari panel menjadi AC untuk kebutuhan rumah.",
    tersedia: true,
  },
  {
    id: 3,
    judul: "Baterai Penyimpan Energi",
    kategori: "energi",
    deskripsi: "Menyimpan kelebihan daya listrik untuk digunakan pada malam hari.",
    tersedia: false,
  },
  {
    id: 4,
    judul: "Sensor Konsumsi Listrik",
    kategori: "energi",
    deskripsi: "Mencatat penggunaan energi alat elektronik secara real-time.",
    tersedia: true,
  },
  {
    id: 5,
    judul: "Pengisi Daya Kendaraan Listrik",
    kategori: "energi",
    deskripsi: "Stasiun pengisian daya cepat untuk mobil dan motor listrik.",
    tersedia: true,
  },
  {
    id: 6,
    judul: "Sakelar Pintar IoT",
    kategori: "energi",
    deskripsi: "Mematikan dan menghidupkan aliran listrik otomatis via aplikasi.",
    tersedia: false,
  },
];