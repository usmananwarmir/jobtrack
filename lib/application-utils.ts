import type { ApplicationStatus } from "./types";

export const STATUS_OPTIONS: ApplicationStatus[] = [
  "Saved",
  "Applied",
  "HR Screen",
  "Technical Interview",
  "Final Interview",
  "Offer",
  "Rejected",
  "Withdrawn",
];

export function isApplicationStatus(value: string): value is ApplicationStatus {
  return STATUS_OPTIONS.includes(value as ApplicationStatus);
}

export const statusTone: Record<string, string> = {
  Saved: "bg-slate-500/20 text-slate-300",
  Applied: "bg-cyan-500/20 text-cyan-400",
  "HR Screen": "bg-violet-500/20 text-violet-300",
  "Technical Interview": "bg-amber-500/20 text-amber-300",
  "Final Interview": "bg-fuchsia-500/20 text-fuchsia-300",
  Offer: "bg-emerald-500/20 text-emerald-300",
  Rejected: "bg-red-500/20 text-red-400",
  Withdrawn: "bg-zinc-500/20 text-zinc-300",
};
