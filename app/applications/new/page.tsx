"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Sparkles, UploadCloud } from "lucide-react";
import { saveApplication, isApplicationStatus } from "@/lib/applications-store";
import { extractJobFromText } from "@/lib/extract-job";
import type { ApplicationStatus, JobApplication } from "@/lib/types";

const STATUS_OPTIONS: ApplicationStatus[] = [
  "Saved",
  "Applied",
  "HR Screen",
  "Technical Interview",
  "Final Interview",
  "Offer",
  "Rejected",
  "Withdrawn",
];

const initialFields = {
  company: "",
  title: "",
  jobDescription: "",
  location: "",
  salary: "",
  datePosted: "",
  deadline: "",
  status: "Saved" as ApplicationStatus,
  cvText: "",
};

export default function NewApplicationPage() {
  const router = useRouter();
  const [rawPaste, setRawPaste] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [fields, setFields] = useState(initialFields);
  const [message, setMessage] = useState("");

  const canExtract = useMemo(() => rawPaste.trim().length > 20 || jobUrl.trim().length > 0, [jobUrl, rawPaste]);

  const runExtraction = () => {
    const extracted = extractJobFromText(rawPaste, jobUrl);
    setFields((prev) => ({
      ...prev,
      ...extracted,
      status: prev.status,
      cvText: prev.cvText,
    }));
    setMessage("Details extracted. Review and edit before saving.");
  };

  const handleCreate = () => {
    const company = fields.company.trim() || "Untitled company";
    const title = fields.title.trim() || "Untitled role";
    const status = isApplicationStatus(fields.status) ? fields.status : "Saved";

    const application: JobApplication = {
      id: `app-${Date.now()}`,
      company,
      title,
      status,
      datePosted: fields.datePosted.trim() || undefined,
      deadline: fields.deadline.trim() || undefined,
      location: fields.location.trim() || undefined,
      sourceUrl: jobUrl.trim() || undefined,
      salary: fields.salary.trim() || undefined,
      description: fields.jobDescription.trim() || undefined,
      cvText: fields.cvText.trim() || undefined,
      cvVersion: fields.cvText.trim() ? fields.cvText.trim().slice(0, 40) : undefined,
      createdAt: new Date().toISOString(),
    };

    saveApplication(application);
    router.push("/dashboard");
  };

  const textFields = ["company", "title", "location", "salary", "datePosted", "deadline", "cvText"] as const;

  return (
    <section className="py-10">
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <article className="glass rounded-3xl p-5">
          <h2 className="text-2xl font-semibold">Create job application</h2>
          <p className="mt-2 text-sm text-muted">
            All fields are optional. Paste full job page content, include URL, and upload screenshot or PDF for best
            extraction.
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
              <input type="file" className="hidden" accept="image/*,.pdf" />
            </label>

            <button
              type="button"
              disabled={!canExtract}
              onClick={runExtraction}
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
            {textFields.map((key) => (
              <label key={key} className="block">
                <span className="mb-1 block capitalize text-muted">{key}</span>
                <input
                  value={fields[key]}
                  onChange={(e) => setFields((prev) => ({ ...prev, [key]: e.target.value }))}
                  className="w-full rounded-lg border bg-transparent px-3 py-2 outline-none"
                />
              </label>
            ))}

            <label className="block">
              <span className="mb-1 block text-muted">Status</span>
              <select
                value={fields.status}
                onChange={(e) =>
                  setFields((prev) => ({
                    ...prev,
                    status: e.target.value as ApplicationStatus,
                  }))
                }
                className="w-full rounded-lg border bg-transparent px-3 py-2 outline-none"
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-muted">Job description</span>
              <textarea
                value={fields.jobDescription}
                onChange={(e) => setFields((prev) => ({ ...prev, jobDescription: e.target.value }))}
                className="min-h-28 w-full rounded-lg border bg-transparent px-3 py-2 outline-none"
              />
            </label>
          </div>

          {message ? <p className="mt-3 text-sm text-cyan-500">{message}</p> : null}

          <button
            type="button"
            onClick={handleCreate}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-500 px-5 py-3 font-medium text-slate-950 transition hover:scale-[1.01]"
          >
            <CheckCircle2 className="h-4 w-4" />
            Create application
          </button>
        </article>
      </div>
    </section>
  );
}
