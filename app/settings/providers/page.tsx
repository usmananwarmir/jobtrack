const providers = ["OpenAI", "Anthropic", "Google Gemini"];

export default function ProviderSettingsPage() {
  return (
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
                  className="mt-1 w-full rounded-xl border bg-transparent px-3 py-2 outline-none"
                  placeholder={`Enter ${provider} key`}
                />
              </label>
              <button className="mt-3 rounded-full border px-4 py-2 text-sm hover:bg-white/20">Save key</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
