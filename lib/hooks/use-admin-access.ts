"use client";

import { useCallback, useEffect, useState } from "react";

async function fetchAdminStatus(): Promise<boolean> {
  const response = await fetch("/api/admin/session", { credentials: "include" });
  const data = (await response.json()) as { isAdmin: boolean };
  return Boolean(data.isAdmin);
}

export function useAdminAccess() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const status = await fetchAdminStatus();
    setIsAdmin(status);
    setLoading(false);
    return status;
  }, []);

  useEffect(() => {
    let active = true;

    fetchAdminStatus()
      .then((status) => {
        if (active) {
          setIsAdmin(status);
        }
      })
      .catch(() => {
        if (active) {
          setIsAdmin(false);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return { isAdmin, loading, refresh };
}
