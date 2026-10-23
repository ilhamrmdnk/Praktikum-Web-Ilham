import React from "react";
import { KeyIcon } from "./Icons";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-zinc-800/80 bg-[#090a0f] py-6 text-xs text-zinc-400">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <KeyIcon className="h-4 w-4 text-emerald-400" />
          <span className="font-mono font-bold tracking-wider text-zinc-200">
            LastKey
          </span>
          <span className="text-zinc-500">—</span>
          <span className="text-zinc-400">Secure your digital legacy.</span>
        </div>

        <div className="flex items-center gap-4 text-zinc-400">
          <span>&copy; 2026 LastKey</span>
          <span className="text-zinc-400">•</span>
          <span className="text-[11px] text-emerald-400/90 font-medium">
            Dead Man&apos;s Switch Active
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
