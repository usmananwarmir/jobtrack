"use client";

import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import { ProtectedRoute } from "@/components/protected-route";
import { statusTone } from "@/lib/application-utils";
import { deleteApplication } from "@/lib/db";
import { useApplications, useSession } from "@/lib/hooks";

export default function ApplicationsPage() {
  const session = useSession();
  const applications = useApplications();

  const onDelete = (id: string) => {
    if (!session) {
      return;
    }
    if (!window.confirm("Delete this application?")) {
      return;
    }
    deleteApplication(session.userId, id);
  };

  return (
    <ProtectedRoute>
      <section className="py-10">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-semibold">Applications</h1>
          <Link
            href="/applications/new"
            className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950"
          >
            <Plus className="h-4 w-4" />
            New application
          </Link>
        </div>

        {applications.length === 0 ? (
          <div className="glass rounded-3xl p-8 text-center">
            <p className="text-muted">No applications yet.</p>
            <Link href="/applications/new" className="mt-4 inline-block text-cyan-500">
              Create your first application
            </Link>
          </div>
        ) : (
          <div className="glass overflow-x-auto rounded-3xl p-5">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="text-muted">
                <tr>
                  <th className="pb-2">Company</th>
                  <th className="pb-2">Role</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Deadline</th>
                  <th className="pb-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((job) => (
                  <tr key={job.id} className="border-t border-white/10">
                    <td className="py-3">
                      <Link href={`/applications/${job.id}`} className="hover:text-cyan-500">
                        {job.company}
                      </Link>
                    </td>
                    <td>{job.title}</td>
                    <td>
                      <span className={`rounded-full px-2 py-1 text-xs ${statusTone[job.status] ?? ""}`}>
                        {job.status}
                      </span>
                    </td>
                    <td>{job.deadline ?? "N/A"}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Link href={`/applications/${job.id}`} className="rounded-full border px-3 py-1 text-xs">
                          Open
                        </Link>
                        <button
                          type="button"
                          onClick={() => onDelete(job.id)}
                          className="rounded-full border px-2 py-1 text-xs text-red-400"
                          aria-label={`Delete ${job.company}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </ProtectedRoute>
  );
}
