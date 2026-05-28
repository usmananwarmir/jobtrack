"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { ApplicationForm, valuesToApplication } from "@/components/application-form";
import { ProtectedRoute } from "@/components/protected-route";
import { deleteApplication, getApplicationById, saveApplication } from "@/lib/db";
import { useApplications, useSession } from "@/lib/hooks";
import type { ApplicationFormValues } from "@/components/application-form";

export default function ApplicationDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const session = useSession();
  const applications = useApplications();

  const application = useMemo(() => {
    if (!session) {
      return null;
    }
    return applications.find((app) => app.id === params.id) ?? getApplicationById(session.userId, params.id);
  }, [applications, params.id, session]);

  const initialValues: Partial<ApplicationFormValues> | undefined = application
    ? {
        company: application.company,
        title: application.title,
        jobDescription: application.description ?? "",
        location: application.location ?? "",
        salary: application.salary ?? "",
        datePosted: application.datePosted ?? "",
        deadline: application.deadline ?? "",
        status: application.status,
        cvText: application.cvText ?? "",
        notes: application.notes ?? "",
        sourceUrl: application.sourceUrl ?? "",
        attachmentName: application.attachmentName ?? "",
      }
    : undefined;

  const handleSave = (values: ApplicationFormValues) => {
    if (!session || !application) {
      throw new Error("Application not found.");
    }

    const updated = valuesToApplication(session.userId, values, application);
    saveApplication(updated);
    router.push("/applications");
  };

  const handleDelete = () => {
    if (!session || !application) {
      return;
    }
    if (!window.confirm("Delete this application permanently?")) {
      return;
    }
    deleteApplication(session.userId, application.id);
    router.push("/applications");
  };

  return (
    <ProtectedRoute>
      <section className="py-10">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link href="/applications" className="inline-flex items-center gap-2 text-sm text-muted hover:text-cyan-500">
            <ArrowLeft className="h-4 w-4" />
            Back to applications
          </Link>
          {application ? (
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center gap-2 rounded-full border border-red-400/40 px-4 py-2 text-sm text-red-400"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          ) : null}
        </div>

        {!application ? (
          <div className="glass rounded-3xl p-8 text-center">
            <p className="text-muted">Application not found.</p>
            <Link href="/applications" className="mt-3 inline-block text-cyan-500">
              Go to applications
            </Link>
          </div>
        ) : (
          <ApplicationForm
            key={application.id}
            initialValues={initialValues}
            submitLabel="Save changes"
            onSubmit={handleSave}
          />
        )}
      </section>
    </ProtectedRoute>
  );
}
