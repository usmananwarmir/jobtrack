"use client";

import { useSyncExternalStore } from "react";
import {
  getApplicationsForUser,
  getProviderKeys,
  getSession,
  getUsers,
  subscribeStore,
} from "./db";
import type { JobApplication, ProviderName } from "./types";

export function useSession() {
  return useSyncExternalStore(subscribeStore, getSession, () => null);
}

export function useApplications(): JobApplication[] {
  return useSyncExternalStore(
    subscribeStore,
    () => {
      const session = getSession();
      return session ? getApplicationsForUser(session.userId) : [];
    },
    () => [],
  );
}

export function useUsers() {
  return useSyncExternalStore(subscribeStore, getUsers, () => []);
}

export function useProviderKeys(): Partial<Record<ProviderName, string>> {
  return useSyncExternalStore(
    subscribeStore,
    () => {
      const session = getSession();
      return session ? getProviderKeys(session.userId) : {};
    },
    (): Partial<Record<ProviderName, string>> => ({}),
  );
}
