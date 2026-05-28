"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("jts-theme", dark ? "dark" : "light");
  }, [dark]);

  const onToggle = () => {
    setDark((prev) => !prev);
  };

  return (
    <button
      type="button"
      onClick={onToggle}
      className="glass inline-flex h-10 w-10 items-center justify-center rounded-full transition hover:scale-105"
      aria-label="Toggle theme"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
