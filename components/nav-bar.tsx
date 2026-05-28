"use client";

import Link from "next/link";
import { BriefcaseBusiness, LogOut, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { isAdminSession } from "@/lib/admin";
import { signOut } from "@/lib/db";
import { useSession } from "@/lib/hooks";
import { ThemeToggle } from "./theme-toggle";

const publicLinks = [{ href: "/", label: "Home" }];

const basePrivateLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/applications", label: "Applications" },
  { href: "/applications/new", label: "New" },
  { href: "/settings/providers", label: "Providers" },
];

const adminLink = { href: "/admin", label: "Admin" };

export function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();
  const [open, setOpen] = useState(false);

  const privateLinks = session && isAdminSession(session) ? [...basePrivateLinks, adminLink] : basePrivateLinks;
  const links = session ? [...publicLinks, ...privateLinks] : [...publicLinks, { href: "/auth", label: "Log in" }];

  const onLogout = () => {
    signOut();
    setOpen(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 py-4">
      <div className="glass-strong mx-auto flex w-full max-w-7xl items-center justify-between rounded-2xl px-4 py-3">
        <Link href="/" className="inline-flex items-center gap-2 font-semibold">
          <BriefcaseBusiness className="h-5 w-5 text-cyan-500" />
          JobTrack
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  active ? "bg-cyan-500/20 text-cyan-500" : "hover:bg-white/20"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {session ? (
            <button
              type="button"
              onClick={onLogout}
              className="hidden items-center gap-1 rounded-full border px-3 py-2 text-sm lg:inline-flex"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          ) : null}
          <ThemeToggle />
          <button
            type="button"
            className="rounded-full border p-2 lg:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="glass-strong mx-auto mt-2 flex max-w-7xl flex-col gap-2 rounded-2xl p-3 lg:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2 text-sm hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
          {session ? (
            <button type="button" onClick={onLogout} className="rounded-xl px-3 py-2 text-left text-sm">
              Log out
            </button>
          ) : null}
        </div>
      ) : null}
    </header>
  );
}
