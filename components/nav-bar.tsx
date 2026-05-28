"use client";

import Link from "next/link";
import { BriefcaseBusiness } from "lucide-react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/auth", label: "Auth" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/applications/new", label: "New Application" },
  { href: "/settings/providers", label: "Providers" },
  { href: "/admin", label: "Admin" },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full px-4 py-4">
      <div className="glass-strong mx-auto flex w-full max-w-7xl items-center justify-between rounded-2xl px-4 py-3">
        <Link href="/" className="inline-flex items-center gap-2 font-semibold">
          <BriefcaseBusiness className="h-5 w-5 text-cyan-500" />
          JobTrack
        </Link>
        <nav className="hidden gap-2 lg:flex">
          {links.map((link) => {
            const active = pathname === link.href;
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
        <ThemeToggle />
      </div>
    </header>
  );
}
