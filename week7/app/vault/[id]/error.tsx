"use client"; // error boundary harus berupa Client Component

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangleIcon } from "@/components/Icons";

export default function GalatDetailVault({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      role="alert"
      className="mx-auto max-w-xl rounded-2xl border border-rose-500/30 bg-zinc-900/80 p-6 shadow-xl"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-400">
        <AlertTriangleIcon className="h-3.5 w-3.5" />
        <span>VAULT SEGMENT ERROR BOUNDARY</span>
      </div>

      <h2 className="mt-4 text-xl font-bold text-zinc-100">
        Kompartemen Vault gagal diproses
      </h2>

      <p className="mt-2 text-xs leading-relaxed text-zinc-400">
        Operasi pada kompartemen brankas tidak dapat diselesaikan. Kompartemen
        mungkin sudah dihapus pada sesi atau tab lain.
      </p>

      <p className="mt-2 font-mono text-xs text-zinc-400">
        Kode rujukan: {error.digest ?? "tidak ada"}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => retry()}
          className="rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-zinc-950 transition-colors hover:bg-emerald-400"
        >
          Coba lagi
        </button>

        <Link
          href="/vault"
          className="rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-2 text-xs font-medium text-zinc-200 transition-colors hover:text-white"
        >
          Kembali ke /vault
        </Link>
      </div>
    </div>
  );
}
