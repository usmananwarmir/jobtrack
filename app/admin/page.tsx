"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getApplicationsForUser, getProviderKeys, getUsers } from "@/lib/db";
import { useAdminAccess } from "@/lib/hooks/use-admin-access";

export default function AdminPage() {
  const router = useRouter();
  const { isAdmin, loading } = useAdminAccess();

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.replace("/admin/login");
    }
  }, [isAdmin, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-muted">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <section className="py-10">
      <div className="glass rounded-3xl p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold">Admin panel</h2>
          <button
            type="button"
            onClick={async () => {
              await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
              router.push("/");
            }}
            className="rounded-full border px-4 py-2 text-sm"
          >
            Admin logout
          </button>
        </div>
        <p className="text-sm text-muted">Overview of accounts stored on this device.</p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="text-muted">
              <tr>
                <th className="pb-2">User</th>
                <th className="pb-2">Email</th>
                <th className="pb-2">Role</th>
                <th className="pb-2">Applications</th>
                <th className="pb-2">Provider keys</th>
              </tr>
            </thead>
            <tbody>
              {getUsers().map((user) => {
                const apps = getApplicationsForUser(user.id);
                const keys = getProviderKeys(user.id);
                const keyCount = Object.values(keys).filter(Boolean).length;

                return (
                  <tr key={user.id} className="border-t border-white/10">
                    <td className="py-3">{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{apps.length}</td>
                    <td>{keyCount > 0 ? `${keyCount} connected` : "None"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Link href="/dashboard" className="mt-6 inline-block text-sm text-cyan-500">
          Back to app
        </Link>
      </div>
    </section>
  );
}
