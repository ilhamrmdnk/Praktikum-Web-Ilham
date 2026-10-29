import { z } from "zod";

export const vaultSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Vault Name minimal 3 karakter.")
      .max(50, "Vault Name maksimal 50 karakter."),

    description: z
      .string()
      .trim()
      .max(200, "Description maksimal 200 karakter."),

    recipient: z
      .string()
      .min(1, "Recipient harus dipilih."),

    checkInInterval: z.enum(["7 days", "14 days", "30 days"], {
      error: "Check-in Interval harus dipilih.",
    }),

    gracePeriod: z.enum(["24 hours", "48 hours", "72 hours"], {
      error: "Grace Period harus dipilih.",
    }),

    confirmation: z
      .boolean()
      .refine((value) => value === true, {
        message: "Anda harus mengonfirmasi bahwa data vault sudah benar.",
      }),
  })
  .refine(
    (data) => {
      const intervalHours: Record<string, number> = {
        "7 days": 7 * 24,
        "14 days": 14 * 24,
        "30 days": 30 * 24,
      };

      const graceHours: Record<string, number> = {
        "24 hours": 24,
        "48 hours": 48,
        "72 hours": 72,
      };

      return graceHours[data.gracePeriod] < intervalHours[data.checkInInterval];
    },
    {
      message: "Grace Period harus lebih pendek daripada Check-in Interval.",
      path: ["gracePeriod"],
    }
  );

export type VaultFormData = z.infer<typeof vaultSchema>;