/** Emails reserved for admin-only access (blocked from normal sign up / log in). */
export function getReservedAdminEmails(): string[] {
  return (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isReservedAdminEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  return getReservedAdminEmails().includes(normalized);
}
