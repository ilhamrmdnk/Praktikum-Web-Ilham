-- DropForeignKey
ALTER TABLE "VaultFile" DROP CONSTRAINT "VaultFile_vaultId_fkey";

-- AddForeignKey
ALTER TABLE "VaultFile" ADD CONSTRAINT "VaultFile_vaultId_fkey" FOREIGN KEY ("vaultId") REFERENCES "Vault"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
