"use client";

import { useMemo } from "react";
import Link from "next/link";
import { CalendarClock, ChartColumnIncreasing, CircleAlert, FileText, Plus } from "lucide-react";
import { useApplications } from "@/lib/applications-store";

const statusTone: Record<string, string> = {
  Saved: "bg-slate-500/20 text-slate-300",
  Applied: "bg-cyan-500/20 text-cyan-400",
  "HR Screen": "bg-violet-500/20 text-violet-300",
  "Technical Interview": "bg-amber-500/20 text-amber-300",
  "Final Interview": "bg-fuchsia-500/20 text-fuchsia-300",
  Offer: "bg-emerald-500/20 text-emerald-300",
  Rejected: "bg-red-500/20 text-red-300",
  Withdrawn: "bg-zinc-500/20 text-zinc-300",
};

export default function DashboardPage() {
  const applications = useApplications();

  const stats = useMemo(() => {
    const interviews = applications.filter((app) =>
      ["HR Screen", "Technical Interview", "Final Interview"].includes(app.status),
    ).length;

    const upcomingDeadlines = applications.filter((app) => app.deadline).length;

    return {
      total: applications.length,
      interviews,
      upcomingDeadlines,
    };
  }, [applications]);

  return (
    <section className="py-10">
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Applications", value: String(stats.total), icon: FileText },
          { label: "Interviews", value: String(stats.interviews), icon: ChartColumnIncreasing },
          { label: "With deadlines", value: String(stats.upcomingDeadlines), icon: CalendarClock },
          { label: "Provider keys", value: "Optional", icon: CircleAlert },
        ].map((card) => (
          <article key={card.label} className="glass rounded-2xl p-4">
            <card.icon className="h-5 w-5 text-cyan-500" />
            <p className="mt-2 text-sm text-muted">{card.label}</p>
            <p className="mt-1 text-2xl font-semibold">{card.value}</p>
          </article>
        ))}
      </div>

      <div className="glass mt-6 rounded-3xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">Your applications</h2>
          <Link
            href="/applications/new"
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition hover:bg-white/10"
          >
            <Plus className="h-4 w-4" />
            New application
          </Link>
        </div>

        {applications.length === 0 ? (
          <p className="mt-6 text-sm text-muted">
            No applications yet. Create your first one from the New Application page.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="text-muted">
                <tr>
                  <th className="pb-2">Company</th>
                  <th className="pb-2">Role</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Deadline</th>
                  <th className="pb-2">CV</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((job) => (
                  <tr key={job.id} className="border-t border-white/10">
                    <td className="py-3">{job.company}</td>
                    <td>{job.title}</td>
                    <td>
                      <span className={`rounded-full px-2 py-1 text-xs ${statusTone[job.status] ?? ""}`}>
                        {job.status}
                      </span>
                    </td>
                    <td>{job.deadline ?? "N/A"}</td>
                    <td>{job.cvVersion ?? "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
