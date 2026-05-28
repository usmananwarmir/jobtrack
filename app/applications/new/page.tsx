"use client";

import { useRouter } from "next/navigation";
import { ApplicationForm, valuesToApplication } from "@/components/application-form";
import { ProtectedRoute } from "@/components/protected-route";
import { saveApplication } from "@/lib/db";
import { useSession } from "@/lib/hooks";
import type { ApplicationFormValues } from "@/components/application-form";

export default function NewApplicationPage() {
  const router = useRouter();
  const session = useSession();

  const handleCreate = (values: ApplicationFormValues) => {
    if (!session) {
      throw new Error("You must be logged in to create an application.");
    }

    const application = valuesToApplication(session.userId, values);
    saveApplication(application);
    router.push(`/applications/${application.id}`);
  };

  return (
    <ProtectedRoute>
      <section className="py-10">
        <ApplicationForm submitLabel="Create application" onSubmit={handleCreate} />
      </section>
    </ProtectedRoute>
  );
}
