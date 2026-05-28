import { CalendarClock, ChartColumnIncreasing, CircleAlert, FileText } from "lucide-react";
import { sampleApplications } from "@/lib/mock-data";

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
  return (
    <section className="py-10">
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Applications", value: "27", icon: FileText },
          { label: "Interviews", value: "8", icon: ChartColumnIncreasing },
          { label: "Upcoming Deadlines", value: "3", icon: CalendarClock },
          { label: "Missing provider keys", value: "12 users", icon: CircleAlert },
        ].map((card) => (
          <article key={card.label} className="glass rounded-2xl p-4">
            <card.icon className="h-5 w-5 text-cyan-500" />
            <p className="mt-2 text-sm text-muted">{card.label}</p>
            <p className="mt-1 text-2xl font-semibold">{card.value}</p>
          </article>
        ))}
      </div>

      <div className="glass mt-6 rounded-3xl p-5">
        <h2 className="text-xl font-semibold">Recent applications</h2>
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
              {sampleApplications.map((job) => (
                <tr key={job.id} className="border-t border-white/10">
                  <td className="py-3">{job.company}</td>
                  <td>{job.title}</td>
                  <td>
                    <span className={`rounded-full px-2 py-1 text-xs ${statusTone[job.status]}`}>{job.status}</span>
                  </td>
                  <td>{job.deadline ?? "N/A"}</td>
                  <td>{job.cvVersion ?? "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
