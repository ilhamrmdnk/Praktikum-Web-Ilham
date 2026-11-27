"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ubahVault, type StatusForm } from "@/app/vault/[id]/actions";
import type { VaultItem, MockRecipient } from "@/components/VaultCard";

export default function FormEditVault({
  vault,
  recipients,
}: {
  vault: VaultItem;
  recipients: MockRecipient[];
}) {
  const [state, formAction, pending] = useActionState<StatusForm, FormData>(
    ubahVault.bind(null, vault.id),
    {}
  );

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-6"
    >
      <div>
        <label htmlFor="name" className="block text-xs font-medium text-zinc-200">
          Nama Kompartemen Vault
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={vault.name}
          required
          className="mt-1.5 block w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3.5 py-2.5 text-xs text-zinc-100"
        />
        {state.galat?.name && (
          <p className="mt-1 text-xs text-rose-400">{state.galat.name[0]}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-xs font-medium text-zinc-200"
        >
          Deskripsi Payload (Terenkripsi AES-256-GCM)
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={vault.description ?? ""}
          className="mt-1.5 block w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3.5 py-2.5 text-xs text-zinc-100"
        />
        {state.galat?.description && (
          <p className="mt-1 text-xs text-rose-400">
            {state.galat.description[0]}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="checkInInterval"
            className="block text-xs font-medium text-zinc-200"
          >
            Check-in Interval
          </label>
          <select
            id="checkInInterval"
            name="checkInInterval"
            defaultValue={vault.checkInInterval ?? "30 days"}
            className="mt-1.5 block w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3.5 py-2.5 text-xs text-zinc-100"
          >
            <option value="7 days">7 days</option>
            <option value="14 days">14 days</option>
            <option value="30 days">30 days</option>
          </select>
          {state.galat?.checkInInterval && (
            <p className="mt-1 text-xs text-rose-400">
              {state.galat.checkInInterval[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="gracePeriod"
            className="block text-xs font-medium text-zinc-200"
          >
            Grace Period
          </label>
          <select
            id="gracePeriod"
            name="gracePeriod"
            defaultValue={vault.gracePeriod ?? "48 hours"}
            className="mt-1.5 block w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3.5 py-2.5 text-xs text-zinc-100"
          >
            <option value="24 hours">24 hours</option>
            <option value="48 hours">48 hours</option>
            <option value="72 hours">72 hours</option>
          </select>
          {state.galat?.gracePeriod && (
            <p className="mt-1 text-xs text-rose-400">
              {state.galat.gracePeriod[0]}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="recipientId"
            className="block text-xs font-medium text-zinc-200"
          >
            Emergency Recipient
          </label>
          <select
            id="recipientId"
            name="recipientId"
            defaultValue={vault.recipient?.id ?? recipients[0]?.id ?? ""}
            className="mt-1.5 block w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3.5 py-2.5 text-xs text-zinc-100"
          >
            {recipients.map((rec) => (
              <option key={rec.id} value={rec.id}>
                {rec.name} ({rec.role})
              </option>
            ))}
          </select>
          {state.galat?.recipientId && (
            <p className="mt-1 text-xs text-rose-400">
              {state.galat.recipientId[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="aktif"
            className="block text-xs font-medium text-zinc-200"
          >
            Ketersediaan Switch (Status Aktif)
          </label>
          <select
            id="aktif"
            name="aktif"
            defaultValue={String(vault.status === "ACTIVE")}
            className="mt-1.5 block w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3.5 py-2.5 text-xs text-zinc-100"
          >
            <option value="true">Aktif (Switch Armed)</option>
            <option value="false">Tidak aktif (Sementara dikunci)</option>
          </select>
          {state.galat?.aktif && (
            <p className="mt-1 text-xs text-rose-400">{state.galat.aktif[0]}</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800/80 pt-4">
        <Link
          href={`/vault/${vault.id}`}
          className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white"
        >
          &larr; Buka Detail /vault/{vault.id}
        </Link>

        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-emerald-500 px-5 py-2 text-xs font-semibold text-zinc-950 hover:bg-emerald-400 disabled:opacity-60"
        >
          {pending ? "Menyimpan..." : "Simpan"}
        </button>
      </div>

      {state.pesan && (
        <p
          role="status"
          className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 px-4 py-2.5 text-xs font-medium text-emerald-300"
        >
          {state.pesan}
        </p>
      )}
    </form>
  );
}
