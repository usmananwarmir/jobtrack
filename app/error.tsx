"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-5xl">!</p>
      <h1 className="mt-4 text-2xl font-semibold">This page could not load</h1>
      <p className="mt-2 max-w-md text-sm text-muted">
        {error.message || "Something went wrong while rendering this page."}
      </p>
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full bg-cyan-500 px-5 py-2 text-sm font-medium text-slate-950"
        >
          Reload
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="rounded-full border px-5 py-2 text-sm"
        >
          Back
        </button>
      </div>
    </section>
  );
}
