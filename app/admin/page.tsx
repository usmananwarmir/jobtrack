"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ProtectedRoute } from "@/components/protected-route";
import { isAdminSession } from "@/lib/admin";
import { getApplicationsForUser, getProviderKeys, getUsers } from "@/lib/db";
import { useSession } from "@/lib/hooks";

export default function AdminPage() {
  const session = useSession();
  const router = useRouter();
  const isAdmin = isAdminSession(session);

  useEffect(() => {
    if (session && !isAdmin) {
      router.replace("/dashboard");
    }
  }, [session, isAdmin, router]);

  return (
    <ProtectedRoute>
      <section className="py-10">
        {!isAdmin ? (
          <div className="glass rounded-3xl p-8 text-center">
            <p className="text-muted">You do not have access to this page.</p>
            <Link href="/dashboard" className="mt-3 inline-block text-cyan-500">
              Back to dashboard
            </Link>
          </div>
        ) : (
          <div className="glass rounded-3xl p-6">
            <h2 className="text-2xl font-semibold">Admin panel</h2>
            <p className="mt-2 text-sm text-muted">Overview of accounts stored on this device.</p>
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
          </div>
        )}
      </section>
    </ProtectedRoute>
  );
}
