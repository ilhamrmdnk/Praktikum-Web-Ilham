import React from "react";

export interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon?: React.ReactNode;
  badge?: string;
  isAccent?: boolean;
}

export function StatCard({
  title,
  value,
  description,
  icon,
  badge,
  isAccent = false,
}: StatCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border p-5 transition-all duration-200 ${
        isAccent
          ? "border-emerald-500/30 bg-emerald-950/10 shadow-[0_0_20px_-12px_rgba(16,185,129,0.2)]"
          : "border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700/80"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-wide uppercase text-zinc-400">
            {title}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
              {value}
            </span>
            {badge && (
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400 border border-emerald-500/20">
                {badge}
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-zinc-400">{description}</p>
        </div>

        {icon && (
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${
              isAccent
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                : "border-zinc-800 bg-zinc-800/40 text-zinc-400"
            }`}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Subtle indicator bar */}
      <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-zinc-800/50">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isAccent ? "w-full bg-emerald-500" : "w-2/3 bg-zinc-700"
          }`}
        />
      </div>
    </div>
  );
}

export default StatCard;
