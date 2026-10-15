import Bagian from "@/components/bagian";
import ItemTerbaru from "@/components/ItemTerbaru";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl p-4">
      <h1 className="text-3xl font-bold">Lastkey</h1>

      <Bagian id="terbaru" judul="Item Terbaru">
        <ItemTerbaru />
      </Bagian>

      <Bagian id="fitur" judul="Fitur Utama">
        <p>Aplikasi pemantauan energi dan lingkungan secara terpadu.</p>
      </Bagian>
    </div>
  );
}