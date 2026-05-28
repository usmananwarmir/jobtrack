"use client";

import { useState } from "react";
import { CheckCircle2, Sparkles, UploadCloud } from "lucide-react";
import { extractJobFromText } from "@/lib/extract-job";
import { isApplicationStatus, STATUS_OPTIONS } from "@/lib/application-utils";
import type { ApplicationStatus, JobApplication } from "@/lib/types";

export interface ApplicationFormValues {
  company: string;
  title: string;
  jobDescription: string;
  location: string;
  salary: string;
  datePosted: string;
  deadline: string;
  status: ApplicationStatus;
  cvText: string;
  notes: string;
  sourceUrl: string;
  attachmentName: string;
}

const emptyValues: ApplicationFormValues = {
  company: "",
  title: "",
  jobDescription: "",
  location: "",
  salary: "",
  datePosted: "",
  deadline: "",
  status: "Saved",
  cvText: "",
  notes: "",
  sourceUrl: "",
  attachmentName: "",
};

interface ApplicationFormProps {
  initialValues?: Partial<ApplicationFormValues>;
  submitLabel: string;
  onSubmit: (values: ApplicationFormValues, rawPaste: string) => void;
}

export function ApplicationForm({ initialValues, submitLabel, onSubmit }: ApplicationFormProps) {
  const [rawPaste, setRawPaste] = useState("");
  const [fields, setFields] = useState<ApplicationFormValues>({ ...emptyValues, ...initialValues });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const runExtraction = () => {
    const extracted = extractJobFromText(rawPaste, fields.sourceUrl);
    setFields((prev) => ({
      ...prev,
      company: extracted.company || prev.company,
      title: extracted.title || prev.title,
      jobDescription: extracted.jobDescription || prev.jobDescription,
      location: extracted.location || prev.location,
      salary: extracted.salary || prev.salary,
      datePosted: extracted.datePosted || prev.datePosted,
      deadline: extracted.deadline || prev.deadline,
    }));
    setMessage("Details extracted. Review and save.");
    setError("");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const status = isApplicationStatus(fields.status) ? fields.status : "Saved";
      onSubmit({ ...fields, status }, rawPaste);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save application.");
    }
  };

  const textFields = ["company", "title", "location", "salary", "datePosted", "deadline", "cvText"] as const;

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      <article className="glass rounded-3xl p-5">
        <h2 className="text-2xl font-semibold">Job source</h2>
        <p className="mt-2 text-sm text-muted">Paste content, add a URL, or attach a file. All fields are optional.</p>

        <div className="mt-5 space-y-3">
          <label className="block text-sm">
            Job URL
            <input
              value={fields.sourceUrl}
              onChange={(e) => setFields((prev) => ({ ...prev, sourceUrl: e.target.value }))}
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
            {fields.attachmentName || "Upload screenshot or PDF"}
            <input
              type="file"
              className="hidden"
              accept="image/*,.pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setFields((prev) => ({ ...prev, attachmentName: file?.name ?? "" }));
              }}
            />
          </label>

          <button
            type="button"
            onClick={runExtraction}
            className="inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm transition hover:bg-white/10"
          >
            <Sparkles className="h-4 w-4" />
            Auto-extract details
          </button>
        </div>
      </article>

      <article className="glass rounded-3xl p-5">
        <h3 className="text-lg font-semibold">Application details</h3>

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

          <label className="block">
            <span className="mb-1 block text-muted">Notes</span>
            <textarea
              value={fields.notes}
              onChange={(e) => setFields((prev) => ({ ...prev, notes: e.target.value }))}
              className="min-h-20 w-full rounded-lg border bg-transparent px-3 py-2 outline-none"
            />
          </label>
        </div>

        {message ? <p className="mt-3 text-sm text-cyan-500">{message}</p> : null}
        {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}

        <button
          type="submit"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-500 px-5 py-3 font-medium text-slate-950 transition hover:scale-[1.01]"
        >
          <CheckCircle2 className="h-4 w-4" />
          {submitLabel}
        </button>
      </article>
    </form>
  );
}

export function valuesToApplication(
  userId: string,
  values: ApplicationFormValues,
  existing?: JobApplication,
): JobApplication {
  const now = new Date().toISOString();
  const company = values.company.trim() || "Untitled company";
  const title = values.title.trim() || "Untitled role";

  return {
    id: existing?.id ?? `app-${Date.now()}`,
    userId,
    company,
    title,
    status: values.status,
    datePosted: values.datePosted.trim() || undefined,
    deadline: values.deadline.trim() || undefined,
    location: values.location.trim() || undefined,
    sourceUrl: values.sourceUrl.trim() || undefined,
    salary: values.salary.trim() || undefined,
    description: values.jobDescription.trim() || undefined,
    cvText: values.cvText.trim() || undefined,
    cvVersion: values.cvText.trim() ? values.cvText.trim().slice(0, 40) : undefined,
    notes: values.notes.trim() || undefined,
    attachmentName: values.attachmentName.trim() || undefined,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
}
