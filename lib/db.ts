"use client";

import type { AppDatabase, JobApplication, ProviderName, Session, User } from "./types";

const DB_KEY = "jts-db";
const SESSION_KEY = "jts-session";
const LEGACY_APPS_KEY = "jts-applications";

const EMPTY_DB: AppDatabase = {
  users: [],
  applications: [],
  providerKeys: {},
};

function readDb(): AppDatabase {
  if (typeof window === "undefined") {
    return EMPTY_DB;
  }

  try {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) {
      return EMPTY_DB;
    }
    return JSON.parse(raw) as AppDatabase;
  } catch {
    return EMPTY_DB;
  }
}

function writeDb(db: AppDatabase) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
  window.dispatchEvent(new Event("jts-store-updated"));
}

function migrateLegacyApplications(userId: string) {
  try {
    const legacyRaw = localStorage.getItem(LEGACY_APPS_KEY);
    if (!legacyRaw) {
      return;
    }

    const legacyApps = JSON.parse(legacyRaw) as JobApplication[];
    const db = readDb();
    const existingIds = new Set(db.applications.map((app) => app.id));
    const now = new Date().toISOString();

    for (const app of legacyApps) {
      if (existingIds.has(app.id)) {
        continue;
      }
      db.applications.push({
        ...app,
        userId,
        createdAt: app.createdAt ?? now,
        updatedAt: now,
      });
    }

    writeDb(db);
    localStorage.removeItem(LEGACY_APPS_KEY);
  } catch {
    // ignore broken legacy data
  }
}

export function getSession(): Session | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function setSession(session: Session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  migrateLegacyApplications(session.userId);
  window.dispatchEvent(new Event("jts-store-updated"));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event("jts-store-updated"));
}

export function signUp(name: string, email: string, password: string): Session {
  const db = readDb();
  const normalizedEmail = email.trim().toLowerCase();

  if (!name.trim() || !normalizedEmail || password.length < 6) {
    throw new Error("Enter name, valid email, and password with at least 6 characters.");
  }

  if (db.users.some((user) => user.email === normalizedEmail)) {
    throw new Error("An account with this email already exists.");
  }

  const user: User = {
    id: `user-${Date.now()}`,
    email: normalizedEmail,
    password,
    name: name.trim(),
    role: db.users.length === 0 ? "admin" : "user",
    createdAt: new Date().toISOString(),
  };

  db.users.push(user);
  writeDb(db);

  const session: Session = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
  setSession(session);
  return session;
}

export function signIn(email: string, password: string): Session {
  const db = readDb();
  const normalizedEmail = email.trim().toLowerCase();
  const user = db.users.find((entry) => entry.email === normalizedEmail && entry.password === password);

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const session: Session = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
  setSession(session);
  return session;
}

export function signOut() {
  clearSession();
}

export function getApplicationsForUser(userId: string): JobApplication[] {
  return readDb()
    .applications.filter((app) => app.userId === userId)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export function getApplicationById(userId: string, id: string): JobApplication | null {
  return readDb().applications.find((app) => app.userId === userId && app.id === id) ?? null;
}

export function saveApplication(application: JobApplication) {
  const db = readDb();
  const index = db.applications.findIndex((app) => app.id === application.id);

  if (index >= 0) {
    db.applications[index] = application;
  } else {
    db.applications.unshift(application);
  }

  writeDb(db);
}

export function deleteApplication(userId: string, id: string) {
  const db = readDb();
  db.applications = db.applications.filter((app) => !(app.userId === userId && app.id === id));
  writeDb(db);
}

export function getUsers(): User[] {
  return readDb().users;
}

export function getProviderKeys(userId: string): Partial<Record<ProviderName, string>> {
  return readDb().providerKeys[userId] ?? {};
}

export function saveProviderKey(userId: string, provider: ProviderName, apiKey: string) {
  const db = readDb();
  if (!db.providerKeys[userId]) {
    db.providerKeys[userId] = {};
  }
  db.providerKeys[userId][provider] = apiKey;
  writeDb(db);
}

export function subscribeStore(callback: () => void) {
  const onUpdate = () => callback();
  window.addEventListener("jts-store-updated", onUpdate);
  window.addEventListener("storage", onUpdate);
  return () => {
    window.removeEventListener("jts-store-updated", onUpdate);
    window.removeEventListener("storage", onUpdate);
  };
}
