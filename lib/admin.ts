import type { Session } from "./types";

function getAdminEmails(): string[] {
  return (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  const adminEmails = getAdminEmails();

  if (adminEmails.length === 0) {
    return false;
  }

  return adminEmails.includes(normalized);
}

export function isAdminSession(session: Session | null): boolean {
  if (!session) {
    return false;
  }

  return isAdminEmail(session.email);
}
