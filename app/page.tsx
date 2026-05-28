import Link from "next/link";
import { ArrowRight, Sparkles, WandSparkles } from "lucide-react";

export default function Home() {
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
          Paste job page content, a URL, or uploads to auto-extract details. Track every application stage, CV versions,
          deadlines, and collaboration in shared workspaces.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-3 font-medium text-slate-950 transition hover:scale-[1.02]"
          >
            Open Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/applications/new"
            className="inline-flex items-center gap-2 rounded-full border px-5 py-3 font-medium transition hover:bg-white/20"
          >
            <WandSparkles className="h-4 w-4" />
            Create New Application
          </Link>
        </div>
      </div>
    </section>
  );
}
