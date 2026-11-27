import Link from "next/link";
import { notFound } from "next/navigation";
import SessionBanner from "@/components/SessionBanner";
import FormEditVault from "@/components/FormEditVault";
import {
  getVaultByIdFromDb,
  getRecipientsFromDb,
} from "@/app/actions/lastkey-actions";
import { getCurrentSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function EditVaultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [session, vault, recipients] = await Promise.all([
    getCurrentSession(),
    getVaultByIdFromDb(id),
    getRecipientsFromDb(),
  ]);

  if (!vault) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <SessionBanner session={session} />

      <div className="flex items-center justify-between border-b border-zinc-800/60 pb-4">
        <div>
          <p className="font-mono text-xs text-emerald-400">
            EDIT VAULT COMPARTMENT • {vault.id}
          </p>
          <h1 className="mt-1 text-2xl font-bold text-zinc-100">
            Ubah Konfigurasi {vault.name}
          </h1>
        </div>
        <Link
          href={`/vault/${vault.id}`}
          className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-2 text-xs font-medium text-zinc-300 hover:text-white"
        >
          Batal
        </Link>
      </div>

      <FormEditVault vault={vault} recipients={recipients} />
    </div>
  );
}
