import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting LastKey database seeding...");

  // 1. Bersihkan database yang ada (opsional / reset)
  await prisma.vaultFile.deleteMany();
  await prisma.vault.deleteMany();
  await prisma.recipient.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.checkIn.deleteMany();

  // 2. Seed Trusted Recipients
  const recipients = await Promise.all([
    prisma.recipient.create({
      data: {
        id: "rec-1",
        name: "Sarah Connor",
        role: "Emergency Trustee",
        email: "sarah@trustee-key.org",
      },
    }),
    prisma.recipient.create({
      data: {
        id: "rec-2",
        name: "Alex Vance",
        role: "Legal Counsel",
        email: "alex@vance-legal.com",
      },
    }),
    prisma.recipient.create({
      data: {
        id: "rec-3",
        name: "Michael Scott",
        role: "Next of Kin",
        email: "m.scott@familyvault.net",
      },
    }),
    prisma.recipient.create({
      data: {
        id: "rec-4",
        name: "Elena Rostova",
        role: "Cryptographic Escrow",
        email: "elena@escrow-keys.io",
      },
    }),
  ]);
  console.log(`✅ ${recipients.length} Emergency Recipients created.`);

  // 3. Seed Vaults with Encrypted Files
  const vaultsData = [
    {
      id: "v-1",
      name: "Important Documents",
      description: "Legal papers, credentials, and identity certificates",
      status: "ACTIVE",
      encryptionStatus: "AES-256 GCM",
      checkInInterval: "30 days (Standard 30-day release cycle)",
      gracePeriod: "48 hours (Standard grace period)",
      lastUpdated: "Updated 2 hours ago",
      nextCheckIn: "6 days 14 hours",
      lastCheckIn: "3 days ago (11:24 UTC)",
      recipientId: "rec-1",
      files: [
        { name: "passport_scan_verified.pdf.enc", size: "2.4 MB", cipher: "AES-256 GCM" },
        { name: "birth_certificate_notarized.pdf.enc", size: "1.8 MB", cipher: "AES-256 GCM" },
        { name: "tax_identification_2025.pdf.enc", size: "850 KB", cipher: "AES-256 GCM" },
      ],
    },
    {
      id: "v-2",
      name: "Personal Archive",
      description: "Private keys, personal memoirs, and digital journals",
      status: "ACTIVE",
      encryptionStatus: "AES-256 GCM",
      checkInInterval: "14 days (Bi-weekly heartbeat)",
      gracePeriod: "48 hours (Standard grace period)",
      lastUpdated: "Updated yesterday",
      nextCheckIn: "11 days 08 hours",
      lastCheckIn: "Yesterday (18:40 UTC)",
      recipientId: "rec-3",
      files: [
        { name: "personal_memoirs_vol1.enc", size: "4.2 MB", cipher: "AES-256 GCM" },
        { name: "pgp_private_keyring.asc.enc", size: "128 KB", cipher: "AES-256 GCM" },
        { name: "digital_diary_encrypted.sqlite.enc", size: "14.5 MB", cipher: "AES-256 GCM" },
      ],
    },
    {
      id: "v-3",
      name: "Emergency Data",
      description: "Emergency contacts, health records, and estate instructions",
      status: "ACTIVE",
      encryptionStatus: "AES-256 GCM",
      checkInInterval: "7 days (Weekly heartbeat)",
      gracePeriod: "24 hours (Urgent fail-safe window)",
      lastUpdated: "Updated 3 days ago",
      nextCheckIn: "4 days 02 hours",
      lastCheckIn: "3 days ago (09:15 UTC)",
      recipientId: "rec-2",
      files: [
        { name: "emergency_medical_directives.pdf.enc", size: "1.1 MB", cipher: "AES-256 GCM" },
        { name: "estate_trustee_contact_dossier.pdf.enc", size: "640 KB", cipher: "AES-256 GCM" },
      ],
    },
    {
      id: "v-4",
      name: "Crypto Cold Storage",
      description: "Hardware wallet seeds, BIP-39 mnemonics, and multi-sig recovery shards",
      status: "ACTIVE",
      encryptionStatus: "AES-256 GCM",
      checkInInterval: "30 days (Standard 30-day release cycle)",
      gracePeriod: "72 hours (Extended emergency buffer)",
      lastUpdated: "Updated 4 days ago",
      nextCheckIn: "26 days 00 hours",
      lastCheckIn: "4 days ago (14:05 UTC)",
      recipientId: "rec-4",
      files: [
        { name: "ledger_bip39_master_seed.txt.enc", size: "16 KB", cipher: "AES-256 GCM" },
        { name: "multisig_descriptor_2of3.json.enc", size: "42 KB", cipher: "AES-256 GCM" },
        { name: "coldcard_backup_shard_a.bin.enc", size: "128 KB", cipher: "AES-256 GCM" },
      ],
    },
    {
      id: "v-5",
      name: "Financial & Asset Deeds",
      description: "Tax returns, title deeds, insurance policies, and offshore bank accounts",
      status: "ACTIVE",
      encryptionStatus: "AES-256 GCM",
      checkInInterval: "30 days (Standard 30-day release cycle)",
      gracePeriod: "72 hours (Extended emergency buffer)",
      lastUpdated: "Updated 1 week ago",
      nextCheckIn: "23 days 10 hours",
      lastCheckIn: "7 days ago (08:30 UTC)",
      recipientId: "rec-2",
      files: [
        { name: "property_title_deed_jakarta.pdf.enc", size: "5.6 MB", cipher: "AES-256 GCM" },
        { name: "annual_tax_returns_2025.pdf.enc", size: "3.1 MB", cipher: "AES-256 GCM" },
        { name: "life_insurance_policy_escrow.pdf.enc", size: "1.9 MB", cipher: "AES-256 GCM" },
      ],
    },
    {
      id: "v-6",
      name: "Master Recovery Escrow",
      description: "Secondary emergency split-key shards awaiting recipient confirmation",
      status: "PENDING",
      encryptionStatus: "ChaCha20-Poly1305",
      checkInInterval: "14 days (Bi-weekly heartbeat)",
      gracePeriod: "48 hours (Standard grace period)",
      lastUpdated: "Pending verification",
      nextCheckIn: "Awaiting recipient key handshake",
      lastCheckIn: "Pending initial activation",
      recipientId: "rec-4",
      files: [
        { name: "shamir_master_escrow_shard_01.key.enc", size: "64 KB", cipher: "ChaCha20-Poly1305" },
      ],
    },
  ];

  for (const v of vaultsData) {
    const { files, ...vaultFields } = v;
    await prisma.vault.create({
      data: {
        ...vaultFields,
        files: {
          create: files,
        },
      },
    });
  }
  console.log(`✅ ${vaultsData.length} Vaults created with encrypted files.`);

  // 4. Seed Activities
  const activities = [
    {
      title: "Vault created",
      description: "Important Documents vault was created",
      timestamp: "2 hours ago",
      type: "vault",
    },
    {
      title: "File encrypted",
      description: "document.pdf was encrypted",
      timestamp: "Yesterday",
      type: "file",
    },
    {
      title: "Check-in completed",
      description: "Dead Man's Switch timer was reset",
      timestamp: "3 days ago",
      type: "checkin",
    },
    {
      title: "Recipient updated",
      description: "Trusted recipient information was updated",
      timestamp: "5 days ago",
      type: "recipient",
    },
  ];

  for (const act of activities) {
    await prisma.activity.create({ data: act });
  }
  console.log(`✅ ${activities.length} Activity log entries created.`);

  // 5. Seed CheckIn Status
  await prisma.checkIn.create({
    data: {
      status: "ACTIVE",
      nextCheckIn: "6 days 14 hours",
      cyclePercent: 78,
      method: "Hardware Security Token / Passkey (AES-GCM Authenticated)",
    },
  });
  console.log("✅ Dead Man's Switch check-in status created.");

  console.log("🚀 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

