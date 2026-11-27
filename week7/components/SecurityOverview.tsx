import React from "react";
import {
  ShieldCheckIcon,
  LockIcon,
  VaultIcon,
  FingerprintIcon,
  EyeIcon,
  CheckCircleIcon,
} from "./Icons";

export interface SecurityItem {
  id: string;
  title: string;
  status: string;
  icon: React.ReactNode;
  detail?: string;
}

export interface SecurityOverviewProps {
  items?: SecurityItem[];
}

const DEFAULT_SECURITY_ITEMS: SecurityItem[] = [
  {
    id: "encryption",
    title: "Encryption",
    status: "Enabled",
    icon: <LockIcon className="h-4 w-4 text-emerald-400" />,
    detail: "AES-256 Vault Ciphers",
  },
  {
    id: "vault-protection",
    title: "Vault Protection",
    status: "Active",
    icon: <VaultIcon className="h-4 w-4 text-emerald-400" />,
    detail: "Zero-knowledge containment",
  },
  {
    id: "authentication",
    title: "Authentication",
    status: "Protected",
    icon: <FingerprintIcon className="h-4 w-4 text-emerald-400" />,
    detail: "Hardware 2FA / Passkey verified",
  },
  {
    id: "audit-logging",
    title: "Audit Logging",
    status: "Enabled",
    icon: <EyeIcon className="h-4 w-4 text-emerald-400" />,
    detail: "Tamper-evident event audit",
  },
];

export function SecurityOverview({
  items = DEFAULT_SECURITY_ITEMS,
}: SecurityOverviewProps) {
  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheckIcon className="h-4 w-4 text-emerald-400" />
          <h3 className="text-sm font-semibold text-zinc-100">
            Security Overview
          </h3>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          All Systems Secure
        </span>
      </div>

      {/* List */}
      <div className="mt-3 divide-y divide-zinc-800/50">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between py-2.5 first:pt-1 last:pb-1"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-800 bg-zinc-800/50">
                {item.icon}
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-200">
                  {item.title}
                </p>
                {item.detail && (
                  <p className="text-[11px] text-zinc-400">{item.detail}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
              <CheckCircleIcon className="h-3 w-3" />
              <span>{item.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SecurityOverview;
