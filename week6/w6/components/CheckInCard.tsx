"use client";

import React, { useState } from "react";
import { PulseIcon, ShieldCheckIcon, TimerIcon, FingerprintIcon } from "./Icons";

export interface CheckInCardProps {
  nextCheckIn?: string;
  status?: string;
  progressPercentage?: number;
  intervalLabel?: string;
  onCheckIn?: () => void;
}

export function CheckInCard({
  nextCheckIn = "6 days 14 hours",
  status = "ACTIVE",
  progressPercentage = 78,
  intervalLabel = "30-day monitoring cycle",
  onCheckIn,
}: CheckInCardProps) {
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    if (onCheckIn) {
      onCheckIn();
    }
    setTimeout(() => {
      setIsCheckedIn(false);
    }, 3000);
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-zinc-800/90 bg-gradient-to-br from-zinc-900/90 via-zinc-900/40 to-[#0c0e14] p-6 shadow-sm">
      {/* Background subtle glow effect */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-500/5 blur-3xl" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/60 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
            <PulseIcon className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-zinc-100">
              Dead Man&apos;s Switch
            </h2>
            <p className="text-xs text-zinc-400">
              Autonomous fail-safe release trigger
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{status}</span>
          </div>
        </div>
      </div>

      {/* Main Countdown Display */}
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:items-center">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-zinc-400">
            <TimerIcon className="h-3.5 w-3.5 text-zinc-400" />
            <span>Next check-in</span>
          </div>
          <div className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-100 sm:text-4xl">
            {nextCheckIn}
          </div>
          <p className="mt-1 text-xs text-zinc-400">{intervalLabel}</p>
        </div>

        {/* Progress Display */}
        <div className="rounded-lg border border-zinc-800/70 bg-zinc-900/60 p-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400">Cycle Remaining</span>
            <span className="font-mono font-medium text-emerald-400">
              {progressPercentage}%
            </span>
          </div>
          {/* Progress bar */}
          <div
            className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-zinc-800"
            role="progressbar"
            aria-valuenow={progressPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Dead Man's Switch timer progress"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-400">
            <span>Cycle Start</span>
            <span className="text-zinc-400">Switch Triggered</span>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="mt-6 pt-2">
        <button
          type="button"
          onClick={handleCheckIn}
          disabled={isCheckedIn}
          className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-semibold text-zinc-950 transition-all duration-200 hover:bg-emerald-400 hover:shadow-[0_0_24px_rgba(16,185,129,0.3)] focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-zinc-950 active:scale-[0.99] disabled:opacity-80"
        >
          {isCheckedIn ? (
            <>
              <ShieldCheckIcon className="h-5 w-5 text-zinc-950" />
              <span>CHECK-IN CONFIRMED (DEMO)</span>
            </>
          ) : (
            <>
              <FingerprintIcon className="h-5 w-5 text-zinc-950" />
              <span>CHECK IN NOW</span>
            </>
          )}
        </button>

        {/* Sub-text explanation */}
        <p className="mt-3 text-center text-xs leading-relaxed text-zinc-400">
          Checking in confirms that you are still active and resets your release
          timer.
        </p>
      </div>
    </div>
  );
}

export default CheckInCard;
