"use client";

import { useActionState, useState } from "react";
import { tambahBerkasVault, type StatusForm } from "@/app/vault/[id]/actions";

export default function FormBerkasVault({ vaultId }: { vaultId: string }) {
  const [state, formAction, pending] = useActionState<StatusForm, FormData>(
    tambahBerkasVault.bind(null, vaultId),
    {}
  );
  const [isi, setIsi] = useState("");
  const sisa = 280 - isi.length; // nilai turunan: dihitung setiap render

  return (
    <form
      action={formAction}
      className="mt-5 space-y-3 rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-4"
    >
      <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
        Tambah Catatan / Berkas Manifest Terenkripsi
      </h3>

      <div>
        <label htmlFor="isi" className="block text-xs font-medium text-zinc-200">
          Nama / Catatan Manifest Berkas
        </label>
        <textarea
          id="isi"
          name="isi"
          rows={2}
          value={isi}
          maxLength={280}
          onChange={(e) => setIsi(e.target.value)}
          placeholder="Contoh: recovery_seed_hardware_wallet_2026"
          className="mt-1 block w-full rounded-lg border border-zinc-800 bg-zinc-900/90 p-2.5 text-xs text-zinc-100"
        />
        <p className="mt-1 text-xs text-zinc-400">{sisa} karakter tersisa</p>
        {state.galat?.isi && (
          <p className="mt-1 text-xs text-rose-400">{state.galat.isi[0]}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="ukuranKB"
          className="block text-xs font-medium text-zinc-200"
        >
          Ukuran Payload (1–10240 KB)
        </label>
        <input
          id="ukuranKB"
          name="ukuranKB"
          type="number"
          min={1}
          max={10240}
          defaultValue={128}
          required
          className="mt-1 block w-32 rounded-lg border border-zinc-800 bg-zinc-900/90 px-3 py-2 text-xs text-zinc-100"
        />
        {state.galat?.ukuranKB && (
          <p className="mt-1 text-xs text-rose-400">{state.galat.ukuranKB[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-emerald-400 disabled:opacity-60"
      >
        {pending ? "Menyimpan..." : "Kirim ke Manifest"}
      </button>

      {state.pesan && (
        <p role="status" className="text-xs font-medium text-emerald-300">
          {state.pesan}
        </p>
      )}
    </form>
  );
}
