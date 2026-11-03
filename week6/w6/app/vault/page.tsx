import type { Metadata } from "next";
import VaultClient from "@/components/VaultClient";
import {
  getVaultsFromDb,
  getRecipientsFromDb,
} from "@/app/actions/lastkey-actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "My Vault — LastKey Secure Digital Vault",
  description:
    "Manage zero-knowledge encrypted compartments and Dead Man's Switch release rules.",
};

/**
 * VaultPage (app/vault/page.tsx)
 *
 * Server Component yang bertugas mengambil data Vault dan Recipient
 * dari PostgreSQL melalui Prisma Client di sisi server, kemudian
 * mendelegasikan interaksi client-side (state pencarian, filter status,
 * dan form modal CRUD) kepada VaultClient.
 */
export default async function VaultPage() {
  const [vaults, recipients] = await Promise.all([
    getVaultsFromDb(),
    getRecipientsFromDb(),
  ]);

  return (
    <VaultClient
      initialVaults={vaults}
      initialRecipients={recipients}
    />
  );
}
