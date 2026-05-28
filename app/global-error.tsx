"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-white">
        <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
          <h1 className="text-2xl font-semibold">This page could not load</h1>
          <p className="mt-2 text-sm text-slate-300">Reload to try again, or go back.</p>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="rounded-full bg-white px-5 py-2 text-sm font-medium text-slate-950"
            >
              Reload
            </button>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="rounded-full border border-white/40 px-5 py-2 text-sm"
            >
              Back
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
