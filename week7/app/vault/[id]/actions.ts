"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "@/lib/auth";
import { encryptVaultField } from "@/crypto/aes-gcm";
import { skemaEditVault, skemaBerkasVault } from "@/lib/validation/vault-schema";

export type StatusForm = {
  pesan?: string;
  galat?: Partial<Record<string, string[]>>;
};

export async function ubahVault(
  id: string,
  _s: StatusForm,
  formData: FormData
): Promise<StatusForm> {
  const session = await getCurrentSession();
  if (!session || session.role !== "OWNER") {
    return { pesan: "Unauthorized: Hanya OWNER yang dapat mengubah Vault." };
  }

  const hasil = skemaEditVault.safeParse(Object.fromEntries(formData));
  if (!hasil.success) {
    return { galat: z.flattenError(hasil.error).fieldErrors };
  }

  const plainDescription =
    hasil.data.description || "Zero-knowledge encrypted vault container";
  const encryptedDescription = encryptVaultField(
    plainDescription,
    id,
    "description"
  );

  await prisma.vault.update({
    where: { id },
    data: {
      name: hasil.data.name,
      description: encryptedDescription,
      checkInInterval: hasil.data.checkInInterval,
      gracePeriod: hasil.data.gracePeriod,
      recipientId: hasil.data.recipientId,
      status: hasil.data.aktif ? "ACTIVE" : "LOCKED",
      lastUpdated: "Updated just now",
    },
  });

  revalidatePath(`/vault/${id}`);
  revalidatePath("/vault");
  return { pesan: "Perubahan disimpan." };
}

export async function hapusVault(id: string) {
  const session = await getCurrentSession();
  if (!session || session.role !== "OWNER") {
    throw new Error("Unauthorized: Hanya OWNER yang dapat menghapus Vault.");
  }

  // Keputusan produk: berkas terenkripsi (VaultFile) di dalam kompartemen ikut
  // terhapus bersama Vault induknya dalam satu transaksi atomik.
  // Keduanya berhasil atau keduanya dibatalkan (rollback).
  await prisma.$transaction([
    prisma.vaultFile.deleteMany({ where: { vaultId: id } }),
    prisma.vault.delete({ where: { id } }),
  ]);

  // Galat tak terduga (misalnya P2025) tidak ditelan:
  // dicatat di terminal server dan ditangkap oleh app/vault/[id]/error.tsx.
  revalidatePath("/vault");
  revalidatePath("/");
  redirect("/vault"); // di luar try/catch karena redirect melempar galat NEXT_REDIRECT
}

export async function tambahBerkasVault(
  vaultId: string,
  _s: StatusForm,
  formData: FormData
): Promise<StatusForm> {
  const session = await getCurrentSession();
  if (!session || session.role !== "OWNER") {
    return { pesan: "Unauthorized: Hanya OWNER yang dapat menambah berkas." };
  }

  const hasil = skemaBerkasVault.safeParse(Object.fromEntries(formData));
  if (!hasil.success) {
    return { galat: z.flattenError(hasil.error).fieldErrors };
  }

  const slug = hasil.data.isi
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 64);
  const formattedName = slug.endsWith(".enc") ? slug : `${slug || "payload"}.enc`;

  await prisma.vaultFile.create({
    data: {
      vaultId,
      name: formattedName,
      size: `${hasil.data.ukuranKB} KB`,
      cipher: "AES-256 GCM",
    },
  });

  revalidatePath(`/vault/${vaultId}`);
  revalidatePath("/vault");
  return { pesan: "Berkas manifest terenkripsi berhasil ditambahkan." };
}
