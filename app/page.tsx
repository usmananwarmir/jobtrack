"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, WandSparkles } from "lucide-react";
import { useApplications, useSession } from "@/lib/hooks";

export default function Home() {
  const session = useSession();
  const applications = useApplications();

  return (
    <section className="py-12 md:py-20">
      <div className="glass-strong rounded-3xl p-8 md:p-14">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm text-cyan-500">
          <Sparkles className="h-4 w-4" />
          Job application tracker
        </div>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          Track every application with a clean, cinematic interface.
        </h1>
        <p className="mt-6 max-w-2xl text-base text-muted md:text-lg">
          Paste job page content, a URL, or uploads to auto-extract details. Track stages, CV versions, deadlines, and
          notes in one place.
        </p>

        {session ? (
          <p className="mt-4 text-sm text-muted">
            Signed in as <span className="text-foreground">{session.name}</span> with {applications.length}{" "}
            application{applications.length === 1 ? "" : "s"}.
          </p>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-3 font-medium text-slate-950 transition hover:scale-[1.02]"
              >
                Open dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/applications/new"
                className="inline-flex items-center gap-2 rounded-full border px-5 py-3 font-medium transition hover:bg-white/20"
              >
                <WandSparkles className="h-4 w-4" />
                New application
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/auth"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-3 font-medium text-slate-950 transition hover:scale-[1.02]"
              >
                Get started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/auth?redirect=/applications/new"
                className="inline-flex items-center gap-2 rounded-full border px-5 py-3 font-medium transition hover:bg-white/20"
              >
                <WandSparkles className="h-4 w-4" />
                Create application
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
