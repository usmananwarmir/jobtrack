"use client";

import { useSyncExternalStore } from "react";
import {
  getApplicationsSnapshot,
  getProviderKeysSnapshot,
  getSession,
  getUsersSnapshot,
  subscribeStore,
} from "./db";
import type { ProviderName } from "./types";

export function useSession() {
  return useSyncExternalStore(subscribeStore, getSession, () => null);
}

export function useApplications() {
  return useSyncExternalStore(subscribeStore, getApplicationsSnapshot, () => []);
}

export function useUsers() {
  return useSyncExternalStore(subscribeStore, getUsersSnapshot, () => []);
}

export function useProviderKeys(): Partial<Record<ProviderName, string>> {
  return useSyncExternalStore(
    subscribeStore,
    getProviderKeysSnapshot,
    (): Partial<Record<ProviderName, string>> => ({}),
  );
}
