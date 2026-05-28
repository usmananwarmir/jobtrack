"use client";

import { useSyncExternalStore } from "react";
import type { ApplicationStatus, JobApplication } from "./types";

const STORAGE_KEY = "jts-applications";

export function getApplications(): JobApplication[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    return JSON.parse(raw) as JobApplication[];
  } catch {
    return [];
  }
}

export function saveApplication(application: JobApplication): void {
  const existing = getApplications();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([application, ...existing]));
  window.dispatchEvent(new Event("jts-applications-updated"));
}

export function isApplicationStatus(value: string): value is ApplicationStatus {
  return [
    "Saved",
    "Applied",
    "HR Screen",
    "Technical Interview",
    "Final Interview",
    "Offer",
    "Rejected",
    "Withdrawn",
  ].includes(value);
}

function subscribe(callback: () => void) {
  const onUpdate = () => callback();
  window.addEventListener("jts-applications-updated", onUpdate);
  window.addEventListener("storage", onUpdate);
  return () => {
    window.removeEventListener("jts-applications-updated", onUpdate);
    window.removeEventListener("storage", onUpdate);
  };
}

export function useApplications() {
  return useSyncExternalStore(subscribe, getApplications, () => []);
}
