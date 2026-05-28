import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, getAdminEmail, validateAdminLogin } from "@/lib/admin-server";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };
  const password = body.password ?? "";
  const email = getAdminEmail();

  if (!validateAdminLogin(email, password)) {
    return NextResponse.json({ error: "Invalid admin credentials." }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ ok: true, email: getAdminEmail() });
}
