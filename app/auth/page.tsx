import { Suspense } from "react";
import AuthForm from "./auth-form";

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center">
          <p className="text-sm text-muted">Loading...</p>
        </div>
      }
    >
      <AuthForm />
    </Suspense>
  );
}
