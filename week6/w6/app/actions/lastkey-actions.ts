"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { vaultSchema } from "@/lib/validation/vault-schema";
import {
  INITIAL_VAULTS,
  MOCK_RECIPIENTS,
  type VaultItem,
  type MockRecipient,
} from "@/components/VaultCard";
import {
  DEFAULT_ACTIVITIES,
  type ActivityItem,
} from "@/components/ActivityList";

export interface CheckInState {
  id: string;
  status: "ACTIVE" | "WARNING" | "RELEASED";
  nextCheckIn: string;
  cyclePercent: number;
  verifiedAt: string;
  method: string;
}

type PrismaVaultWithRelations = Prisma.VaultGetPayload<{
  include: {
    recipient: true;
    files: true;
  };
}>;

/**
 * Helper: Map Prisma Vault model (with recipient and files) to UI VaultItem
 */
function mapPrismaVaultToItem(vault: PrismaVaultWithRelations): VaultItem {
  const fileCountNum = vault.files.length;
  const validStatus: "ACTIVE" | "LOCKED" | "PENDING" =
    vault.status === "ACTIVE" ||
    vault.status === "LOCKED" ||
    vault.status === "PENDING"
      ? vault.status
      : "ACTIVE";

  return {
    id: vault.id,
    name: vault.name,
    fileCount: `${fileCountNum} encrypted file${fileCountNum === 1 ? "" : "s"}`,
    status: validStatus,
    encryptionStatus: vault.encryptionStatus,
    lastUpdated: vault.lastUpdated,
    description: vault.description ?? undefined,
    recipient: vault.recipient
      ? {
          id: vault.recipient.id,
          name: vault.recipient.name,
          role: vault.recipient.role,
          email: vault.recipient.email,
        }
      : undefined,
    checkInInterval: vault.checkInInterval,
    gracePeriod: vault.gracePeriod,
    nextCheckIn: vault.nextCheckIn ?? `${vault.checkInInterval} remaining`,
    lastCheckIn: vault.lastCheckIn ?? "Just now",
    files: vault.files.map((f) => ({
      id: f.id,
      name: f.name,
      size: f.size,
      cipher: f.cipher,
    })),
  };
}

/**
 * Helper: Format Prisma / Database errors into safe user-facing messages
 */
function formatDatabaseError(error: unknown): string {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return "Email recipient sudah terdaftar. Gunakan alamat email yang berbeda.";
      case "P2025":
        return "Data yang diminta tidak ditemukan di database.";
      case "P2003":
        return "Relasi data tidak valid (Recipient atau Vault terkait tidak ditemukan).";
      case "P1001":
      case "P1002":
        return "Tidak dapat terhubung ke database PostgreSQL. Pastikan layanan PostgreSQL berjalan.";
      default:
        return `Terjadi kesalahan operasional database (${error.code}).`;
    }
  }
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return "Gagal menginisialisasi koneksi ke database PostgreSQL.";
  }
  if (error instanceof Prisma.PrismaClientValidationError) {
    return "Format data yang dikirim ke database tidak valid.";
  }
  return "Terjadi kesalahan server saat memproses permintaan database.";
}

// ============================================================================
// A. VAULT OPERATIONS (CRUD)
// ============================================================================

export async function getVaultsFromDb(): Promise<VaultItem[]> {
  try {
    const vaults = await prisma.vault.findMany({
      include: {
        recipient: true,
        files: {
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (vaults.length === 0) {
      return INITIAL_VAULTS;
    }

    return vaults.map(mapPrismaVaultToItem);
  } catch (error) {
    console.error("[LastKey DB] Error fetching vaults, using fallback:", error);
    return INITIAL_VAULTS;
  }
}

export async function getVaultByIdFromDb(
  id: string
): Promise<VaultItem | null> {
  try {
    const vault = await prisma.vault.findUnique({
      where: { id },
      include: {
        recipient: true,
        files: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!vault) {
      return null;
    }

    return mapPrismaVaultToItem(vault);
  } catch (error) {
    console.error(
      `[LastKey DB] Error fetching vault ${id}, checking fallback:`,
      error
    );
    const fallback = INITIAL_VAULTS.find((v) => v.id === id);
    return fallback ?? null;
  }
}

export interface CreateVaultActionInput {
  name: string;
  description: string;
  recipient: string;
  checkInInterval: string;
  gracePeriod: string;
  confirmation: boolean;
}

export async function createVaultAction(input: CreateVaultActionInput): Promise<{
  success: boolean;
  vault?: VaultItem;
  error?: string;
  fieldErrors?: Record<string, string>;
}> {
  // 1. Validate with existing Zod 4 schema
  const result = vaultSchema.safeParse(input);

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string | undefined;
      if (field && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return {
      success: false,
      error: "Validasi data vault gagal. Periksa kembali input Anda.",
      fieldErrors,
    };
  }

  const validData = result.data;

  try {
    // 2. Determine next sequential vault ID (e.g. v-7, v-8...)
    const existingVaults = await prisma.vault.findMany({
      select: { id: true },
    });

    let maxNum = 6;
    for (const v of existingVaults) {
      const match = /^v-(\d+)$/.exec(v.id);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNum) maxNum = num;
      }
    }
    const nextVaultId = `v-${maxNum + 1}`;

    // 3. Create Vault in PostgreSQL with initial encrypted metadata file
    const createdVault = await prisma.vault.create({
      data: {
        id: nextVaultId,
        name: validData.name,
        description:
          validData.description ||
          "Zero-knowledge encrypted vault container",
        status: "ACTIVE",
        encryptionStatus: "AES-256 GCM",
        checkInInterval: validData.checkInInterval,
        gracePeriod: validData.gracePeriod,
        lastUpdated: "Just now",
        nextCheckIn: `${validData.checkInInterval} 00 hours`,
        lastCheckIn: "Just now (Initialized)",
        recipientId: validData.recipient,
        files: {
          create: [
            {
              name: `${validData.name.toLowerCase().replace(/[^a-z0-9]+/g, "_")}_manifest.enc`,
              size: "128 KB",
              cipher: "AES-256 GCM",
            },
          ],
        },
      },
      include: {
        recipient: true,
        files: true,
      },
    });

    // 4. Record Activity in PostgreSQL
    await prisma.activity.create({
      data: {
        title: "Vault created",
        description: `${validData.name} vault was created`,
        timestamp: "Just now",
        type: "vault",
      },
    });

    revalidatePath("/vault");
    revalidatePath("/");

    return {
      success: true,
      vault: mapPrismaVaultToItem(createdVault),
    };
  } catch (error) {
    console.error("[LastKey DB] createVaultAction error:", error);
    return {
      success: false,
      error: formatDatabaseError(error),
    };
  }
}

export interface UpdateVaultActionInput {
  name: string;
  description: string;
  status: "ACTIVE" | "LOCKED" | "PENDING";
  recipientId: string;
  checkInInterval: string;
  gracePeriod: string;
}

export async function updateVaultAction(
  id: string,
  input: UpdateVaultActionInput
): Promise<{
  success: boolean;
  vault?: VaultItem;
  error?: string;
}> {
  const trimmedName = input.name.trim();
  const trimmedDesc = input.description.trim();

  if (trimmedName.length < 3 || trimmedName.length > 50) {
    return {
      success: false,
      error: "Vault Name harus berusia antara 3 hingga 50 karakter.",
    };
  }
  if (trimmedDesc.length > 200) {
    return {
      success: false,
      error: "Description maksimal 200 karakter.",
    };
  }
  if (!input.recipientId) {
    return {
      success: false,
      error: "Recipient harus dipilih.",
    };
  }

  try {
    const updatedVault = await prisma.vault.update({
      where: { id },
      data: {
        name: trimmedName,
        description: trimmedDesc || null,
        status: input.status,
        recipientId: input.recipientId,
        checkInInterval: input.checkInInterval,
        gracePeriod: input.gracePeriod,
        lastUpdated: "Updated just now",
      },
      include: {
        recipient: true,
        files: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    await prisma.activity.create({
      data: {
        title: "Vault updated",
        description: `${updatedVault.name} (${id}) configuration was updated`,
        timestamp: "Just now",
        type: "vault",
      },
    });

    revalidatePath("/vault");
    revalidatePath(`/vault/${id}`);
    revalidatePath("/");

    return {
      success: true,
      vault: mapPrismaVaultToItem(updatedVault),
    };
  } catch (error) {
    console.error("[LastKey DB] updateVaultAction error:", error);
    return {
      success: false,
      error: formatDatabaseError(error),
    };
  }
}

export async function deleteVaultAction(id: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const deleted = await prisma.vault.delete({
      where: { id },
    });

    await prisma.activity.create({
      data: {
        title: "Vault deleted",
        description: `${deleted.name} (${id}) was removed from storage`,
        timestamp: "Just now",
        type: "vault",
      },
    });

    revalidatePath("/vault");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("[LastKey DB] deleteVaultAction error:", error);
    return {
      success: false,
      error: formatDatabaseError(error),
    };
  }
}

// ============================================================================
// B. RECIPIENT OPERATIONS
// ============================================================================

export async function getRecipientsFromDb(): Promise<MockRecipient[]> {
  try {
    const recipients = await prisma.recipient.findMany({
      orderBy: { createdAt: "asc" },
    });

    if (recipients.length === 0) {
      return MOCK_RECIPIENTS;
    }

    return recipients.map((r) => ({
      id: r.id,
      name: r.name,
      role: r.role,
      email: r.email,
    }));
  } catch (error) {
    console.error(
      "[LastKey DB] Error fetching recipients, using fallback:",
      error
    );
    return MOCK_RECIPIENTS;
  }
}

export async function createRecipientAction(input: {
  name: string;
  role: string;
  email: string;
}): Promise<{
  success: boolean;
  recipient?: MockRecipient;
  error?: string;
}> {
  const name = input.name.trim();
  const role = input.role.trim();
  const email = input.email.trim().toLowerCase();

  if (name.length < 2) {
    return { success: false, error: "Nama recipient minimal 2 karakter." };
  }
  if (role.length < 2) {
    return { success: false, error: "Peran/role recipient wajib diisi." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Format alamat email tidak valid." };
  }

  try {
    const created = await prisma.recipient.create({
      data: {
        name,
        role,
        email,
      },
    });

    await prisma.activity.create({
      data: {
        title: "Recipient updated",
        description: `Trusted recipient ${created.name} (${created.email}) registered`,
        timestamp: "Just now",
        type: "recipient",
      },
    });

    revalidatePath("/vault");
    revalidatePath("/");

    return {
      success: true,
      recipient: {
        id: created.id,
        name: created.name,
        role: created.role,
        email: created.email,
      },
    };
  } catch (error) {
    console.error("[LastKey DB] createRecipientAction error:", error);
    return {
      success: false,
      error: formatDatabaseError(error),
    };
  }
}

// ============================================================================
// C. VAULT FILE OPERATIONS
// ============================================================================

export async function addVaultFileAction(
  vaultId: string,
  input: { name: string; size: string; cipher?: string }
): Promise<{
  success: boolean;
  vault?: VaultItem;
  error?: string;
}> {
  const rawName = input.name.trim();
  const rawSize = input.size.trim() || "256 KB";
  const cipher = input.cipher?.trim() || "AES-256 GCM";

  if (rawName.length < 2) {
    return {
      success: false,
      error: "Nama file minimal 2 karakter.",
    };
  }

  const formattedName = rawName.endsWith(".enc") ? rawName : `${rawName}.enc`;

  try {
    await prisma.vaultFile.create({
      data: {
        vaultId,
        name: formattedName,
        size: rawSize,
        cipher,
      },
    });

    const updatedVault = await prisma.vault.update({
      where: { id: vaultId },
      data: {
        lastUpdated: "Updated just now",
      },
      include: {
        recipient: true,
        files: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    await prisma.activity.create({
      data: {
        title: "File encrypted",
        description: `${formattedName} was encrypted in ${updatedVault.name}`,
        timestamp: "Just now",
        type: "file",
      },
    });

    revalidatePath("/vault");
    revalidatePath(`/vault/${vaultId}`);
    revalidatePath("/");

    return {
      success: true,
      vault: mapPrismaVaultToItem(updatedVault),
    };
  } catch (error) {
    console.error("[LastKey DB] addVaultFileAction error:", error);
    return {
      success: false,
      error: formatDatabaseError(error),
    };
  }
}

// ============================================================================
// D. ACTIVITY OPERATIONS
// ============================================================================

export async function getActivitiesFromDb(): Promise<ActivityItem[]> {
  try {
    const records = await prisma.activity.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
    });

    if (records.length === 0) {
      return DEFAULT_ACTIVITIES;
    }

    return records.map((act) => {
      const validType: ActivityItem["type"] =
        act.type === "vault" ||
        act.type === "file" ||
        act.type === "checkin" ||
        act.type === "recipient"
          ? act.type
          : "vault";

      return {
        id: act.id,
        title: act.title,
        description: act.description,
        timestamp: act.timestamp,
        type: validType,
      };
    });
  } catch (error) {
    console.error(
      "[LastKey DB] Error fetching activities, using fallback:",
      error
    );
    return DEFAULT_ACTIVITIES;
  }
}

// ============================================================================
// E. CHECK-IN OPERATIONS
// ============================================================================

export async function getCheckInStatusFromDb(): Promise<CheckInState> {
  try {
    const latest = await prisma.checkIn.findFirst({
      orderBy: { verifiedAt: "desc" },
    });

    if (!latest) {
      return {
        id: "default-checkin",
        status: "ACTIVE",
        nextCheckIn: "6 days 14 hours",
        cyclePercent: 78,
        verifiedAt: "3 days ago (11:24 UTC)",
        method: "Hardware Security Token / Passkey (AES-GCM Authenticated)",
      };
    }

    const validStatus: CheckInState["status"] =
      latest.status === "ACTIVE" ||
      latest.status === "WARNING" ||
      latest.status === "RELEASED"
        ? latest.status
        : "ACTIVE";

    return {
      id: latest.id,
      status: validStatus,
      nextCheckIn: latest.nextCheckIn,
      cyclePercent: latest.cyclePercent,
      verifiedAt:
        latest.cyclePercent === 100
          ? "Just now (Verified)"
          : "3 days ago (11:24 UTC)",
      method: latest.method,
    };
  } catch (error) {
    console.error(
      "[LastKey DB] Error fetching check-in status, using fallback:",
      error
    );
    return {
      id: "fallback-checkin",
      status: "ACTIVE",
      nextCheckIn: "6 days 14 hours",
      cyclePercent: 78,
      verifiedAt: "3 days ago (11:24 UTC)",
      method: "Hardware Security Token / Passkey (AES-GCM Authenticated)",
    };
  }
}

export async function performCheckInAction(): Promise<{
  success: boolean;
  checkIn?: CheckInState;
  error?: string;
}> {
  try {
    const existing = await prisma.checkIn.findFirst({
      orderBy: { verifiedAt: "desc" },
    });

    const record = existing
      ? await prisma.checkIn.update({
          where: { id: existing.id },
          data: {
            status: "ACTIVE",
            nextCheckIn: "30 days 00 hours",
            cyclePercent: 100,
            verifiedAt: new Date(),
          },
        })
      : await prisma.checkIn.create({
          data: {
            status: "ACTIVE",
            nextCheckIn: "30 days 00 hours",
            cyclePercent: 100,
            verifiedAt: new Date(),
            method:
              "Hardware Security Token / Passkey (AES-GCM Authenticated)",
          },
        });

    await prisma.activity.create({
      data: {
        title: "Check-in completed",
        description: "Dead Man's Switch timer was reset to 30 days 00 hours",
        timestamp: "Just now",
        type: "checkin",
      },
    });

    revalidatePath("/check-in");
    revalidatePath("/");

    return {
      success: true,
      checkIn: {
        id: record.id,
        status: "ACTIVE",
        nextCheckIn: record.nextCheckIn,
        cyclePercent: record.cyclePercent,
        verifiedAt: "Just now (Verified)",
        method: record.method,
      },
    };
  } catch (error) {
    console.error("[LastKey DB] performCheckInAction error:", error);
    return {
      success: false,
      error: formatDatabaseError(error),
    };
  }
}

export async function resetCheckInDemoAction(): Promise<{
  success: boolean;
  checkIn?: CheckInState;
  error?: string;
}> {
  try {
    const existing = await prisma.checkIn.findFirst({
      orderBy: { verifiedAt: "desc" },
    });

    const record = existing
      ? await prisma.checkIn.update({
          where: { id: existing.id },
          data: {
            status: "ACTIVE",
            nextCheckIn: "6 days 14 hours",
            cyclePercent: 78,
            verifiedAt: new Date(),
          },
        })
      : await prisma.checkIn.create({
          data: {
            status: "ACTIVE",
            nextCheckIn: "6 days 14 hours",
            cyclePercent: 78,
            verifiedAt: new Date(),
            method:
              "Hardware Security Token / Passkey (AES-GCM Authenticated)",
          },
        });

    revalidatePath("/check-in");
    revalidatePath("/");

    return {
      success: true,
      checkIn: {
        id: record.id,
        status: "ACTIVE",
        nextCheckIn: record.nextCheckIn,
        cyclePercent: record.cyclePercent,
        verifiedAt: "3 days ago (11:24 UTC)",
        method: record.method,
      },
    };
  } catch (error) {
    console.error("[LastKey DB] resetCheckInDemoAction error:", error);
    return {
      success: false,
      error: formatDatabaseError(error),
    };
  }
}

