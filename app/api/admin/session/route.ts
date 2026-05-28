import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/admin-server";

export async function GET() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get(ADMIN_COOKIE)?.value === "1";

  return NextResponse.json({ isAdmin });
}
