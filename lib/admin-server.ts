const ADMIN_COOKIE = "jts-admin-auth";

export function getAdminEmail(): string {
  return (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "";
}

export function isAdminConfigured(): boolean {
  return Boolean(getAdminEmail() && getAdminPassword());
}

export function validateAdminLogin(email: string, password: string): boolean {
  if (!isAdminConfigured()) {
    return false;
  }

  const normalizedEmail = email.trim().toLowerCase();
  return normalizedEmail === getAdminEmail() && password === getAdminPassword();
}

export { ADMIN_COOKIE };
