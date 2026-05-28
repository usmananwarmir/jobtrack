"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Globe, Lock, Mail, User } from "lucide-react";
import { signIn, signUp } from "@/lib/db";
import { useSession } from "@/lib/hooks";

export default function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session = useSession();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const redirect = searchParams.get("redirect") || "/dashboard";

  useEffect(() => {
    if (session) {
      router.replace(redirect);
    }
  }, [session, router, redirect]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      if (mode === "signup") {
        signUp(name, email, password);
      } else {
        signIn(email, password);
      }
      router.push(redirect);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
    }
  };

  const continueAsGuest = () => {
    try {
      signUp("Guest User", `guest-${Date.now()}@jobtrack.local`, "guest123456");
      router.push(redirect);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start guest session.");
    }
  };

  if (session) {
    return null;
  }

  return (
    <section className="py-10">
      <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
        <div className="glass rounded-3xl p-6">
          <div className="mb-5 flex gap-2">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`rounded-full px-4 py-2 text-sm ${mode === "login" ? "bg-cyan-500/20 text-cyan-500" : ""}`}
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`rounded-full px-4 py-2 text-sm ${mode === "signup" ? "bg-cyan-500/20 text-cyan-500" : ""}`}
            >
              Sign up
            </button>
          </div>

          <h2 className="text-2xl font-semibold">{mode === "login" ? "Welcome back" : "Create account"}</h2>
          <p className="mt-2 text-sm text-muted">Your applications are saved to your account on this device.</p>

          <form onSubmit={onSubmit} className="mt-5 space-y-3">
            {mode === "signup" ? (
              <label className="block text-sm">
                <span className="mb-1 block">Name</span>
                <div className="flex items-center gap-2 rounded-xl border px-3 py-2">
                  <User className="h-4 w-4 text-muted" />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent outline-none"
                    placeholder="Your name"
                    required
                  />
                </div>
              </label>
            ) : null}

            <label className="block text-sm">
              <span className="mb-1 block">Email</span>
              <div className="flex items-center gap-2 rounded-xl border px-3 py-2">
                <Mail className="h-4 w-4 text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent outline-none"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </label>

            <label className="block text-sm">
              <span className="mb-1 block">Password</span>
              <div className="flex items-center gap-2 rounded-xl border px-3 py-2">
                <Lock className="h-4 w-4 text-muted" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent outline-none"
                  placeholder="At least 6 characters"
                  minLength={6}
                  required
                />
              </div>
            </label>

            {error ? <p className="text-sm text-red-400">{error}</p> : null}

            <button type="submit" className="w-full rounded-xl bg-cyan-500 px-4 py-2 font-medium text-slate-950">
              {mode === "login" ? "Log in" : "Create account"}
            </button>
          </form>
        </div>

        <div className="glass rounded-3xl p-6">
          <h2 className="text-2xl font-semibold">Quick start</h2>
          <p className="mt-2 text-sm text-muted">Start immediately without setting up an email account.</p>
          <button
            type="button"
            onClick={continueAsGuest}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 hover:bg-white/10"
          >
            <Globe className="h-4 w-4" />
            Continue as guest
          </button>
          <p className="mt-6 text-sm text-muted">
            Google login can be connected later with Supabase. For now, use email or guest mode.
          </p>
        </div>
      </div>
    </section>
  );
}
