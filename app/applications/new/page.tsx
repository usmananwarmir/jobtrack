"use client";

import { useMemo, useState } from "react";
import { Sparkles, UploadCloud } from "lucide-react";

const initialFields = {
  company: "",
  title: "",
  jobDescription: "",
  location: "",
  salary: "",
  datePosted: "",
  deadline: "",
  status: "Saved",
  cvText: "",
};

export default function NewApplicationPage() {
  const [rawPaste, setRawPaste] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [fields, setFields] = useState(initialFields);

  const canExtract = useMemo(() => rawPaste.trim().length > 20 || jobUrl.trim().length > 0, [jobUrl, rawPaste]);

  const runMockExtraction = () => {
    setFields({
      company: "Auto-detected company",
      title: "Auto-detected role title",
      jobDescription: rawPaste.slice(0, 450),
      location: "Remote",
      salary: "Not specified",
      datePosted: "",
      deadline: "",
      status: "Saved",
      cvText: "",
    });
  };

  return (
    <section className="py-10">
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <article className="glass rounded-3xl p-5">
          <h2 className="text-2xl font-semibold">Create job application</h2>
          <p className="mt-2 text-sm text-muted">
            All fields are optional. Paste full job page content, include URL, and upload screenshot/PDF for best AI
            accuracy.
          </p>

          <div className="mt-5 space-y-3">
            <label className="block text-sm">
              Job URL (optional)
              <input
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
                className="mt-1 w-full rounded-xl border bg-transparent px-3 py-2 outline-none"
                placeholder="https://company.com/job/role"
              />
            </label>

            <label className="block text-sm">
              Paste job webpage content
              <textarea
                value={rawPaste}
                onChange={(e) => setRawPaste(e.target.value)}
                className="mt-1 min-h-56 w-full rounded-xl border bg-transparent px-3 py-2 outline-none"
                placeholder="Paste all text copied from the job page..."
              />
            </label>

            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed px-3 py-5 text-sm hover:bg-white/10">
              <UploadCloud className="h-4 w-4" />
              Upload screenshot or PDF
              <input type="file" className="hidden" />
            </label>

            <button
              type="button"
              disabled={!canExtract}
              onClick={runMockExtraction}
              className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-2 font-medium text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Sparkles className="h-4 w-4" />
              Auto-extract details
            </button>
          </div>
        </article>

        <article className="glass rounded-3xl p-5">
          <h3 className="text-lg font-semibold">Extracted details (editable)</h3>
          <div className="mt-4 space-y-2 text-sm">
            {Object.entries(fields).map(([key, value]) => (
              <label key={key} className="block">
                <span className="mb-1 block capitalize text-muted">{key}</span>
                <input
                  value={value}
                  onChange={(e) => setFields((prev) => ({ ...prev, [key]: e.target.value }))}
                  className="w-full rounded-lg border bg-transparent px-3 py-2 outline-none"
                />
              </label>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
