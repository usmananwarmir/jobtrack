"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/protected-route";
import { saveProviderKey } from "@/lib/db";
import { useProviderKeys, useSession } from "@/lib/hooks";
import type { ProviderName } from "@/lib/types";

const providers: ProviderName[] = ["OpenAI", "Anthropic", "Google Gemini"];

export default function ProviderSettingsPage() {
  const session = useSession();
  const savedKeys = useProviderKeys();
  const [draftKeys, setDraftKeys] = useState<Partial<Record<ProviderName, string>>>({});
  const [message, setMessage] = useState("");

  const onSave = (provider: ProviderName) => {
    if (!session) {
      return;
    }

    const apiKey = (draftKeys[provider] ?? savedKeys[provider] ?? "").trim();
    if (!apiKey) {
      setMessage(`Enter a key for ${provider} first.`);
      return;
    }

    saveProviderKey(session.userId, provider, apiKey);
    setMessage(`${provider} key saved.`);
  };

  return (
    <ProtectedRoute>
      <section className="py-10">
        <div className="glass mx-auto max-w-3xl rounded-3xl p-6">
          <h2 className="text-2xl font-semibold">Provider settings</h2>
          <p className="mt-2 text-sm text-muted">
            Add your own API key per provider. Without a key, the app uses local rule-based parsing only.
          </p>

          <div className="mt-6 space-y-4">
            {providers.map((provider) => (
              <div key={provider} className="rounded-2xl border p-4">
                <p className="font-medium">{provider}</p>
                <label className="mt-2 block text-sm">
                  API key
                  <input
                    type="password"
                    value={draftKeys[provider] ?? savedKeys[provider] ?? ""}
                    onChange={(e) =>
                      setDraftKeys((prev) => ({
                        ...prev,
                        [provider]: e.target.value,
                      }))
                    }
                    className="mt-1 w-full rounded-xl border bg-transparent px-3 py-2 outline-none"
                    placeholder={`Enter ${provider} key`}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => onSave(provider)}
                  className="mt-3 rounded-full border px-4 py-2 text-sm hover:bg-white/10"
                >
                  Save key
                </button>
              </div>
            ))}
          </div>

          {message ? <p className="mt-4 text-sm text-cyan-500">{message}</p> : null}
        </div>
      </section>
    </ProtectedRoute>
  );
}
