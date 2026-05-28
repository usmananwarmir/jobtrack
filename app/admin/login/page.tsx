"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { useAdminAccess } from "@/lib/hooks/use-admin-access";

export default function AdminLoginPage() {
  const router = useRouter();
  const { isAdmin, loading, refresh } = useAdminAccess();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && isAdmin) {
      router.replace("/admin");
    }
  }, [isAdmin, loading, router]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      setError("Invalid admin password.");
      return;
    }

    await refresh();
    router.push("/admin");
  };

  return (
    <section className="py-10">
      <div className="glass mx-auto max-w-md rounded-3xl p-6">
        <h1 className="text-2xl font-semibold">Admin sign in</h1>
        <p className="mt-2 text-sm text-muted">
          Owner access only. Your admin email cannot be used on the regular sign up or log in page.
        </p>

        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <label className="block text-sm">
            <span className="mb-1 block">Admin password</span>
            <div className="flex items-center gap-2 rounded-xl border px-3 py-2">
              <Lock className="h-4 w-4 text-muted" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none"
                required
                minLength={8}
              />
            </div>
          </label>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <button type="submit" className="w-full rounded-xl bg-cyan-500 px-4 py-2 font-medium text-slate-950">
            Enter admin panel
          </button>
        </form>
      </div>
    </section>
  );
}
