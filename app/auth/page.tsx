import { Mail, Lock, Globe } from "lucide-react";

export default function AuthPage() {
  return (
    <section className="py-10">
      <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
        <div className="glass rounded-3xl p-6">
          <h2 className="text-2xl font-semibold">Create account</h2>
          <p className="mt-2 text-sm text-muted">Email/password and Google login are both enabled.</p>
          <form className="mt-5 space-y-3">
            <label className="block text-sm">
              <span className="mb-1 block">Email</span>
              <div className="flex items-center gap-2 rounded-xl border px-3 py-2">
                <Mail className="h-4 w-4 text-muted" />
                <input className="w-full bg-transparent outline-none" placeholder="you@example.com" />
              </div>
            </label>
            <label className="block text-sm">
              <span className="mb-1 block">Password</span>
              <div className="flex items-center gap-2 rounded-xl border px-3 py-2">
                <Lock className="h-4 w-4 text-muted" />
                <input type="password" className="w-full bg-transparent outline-none" placeholder="********" />
              </div>
            </label>
            <button className="w-full rounded-xl bg-cyan-500 px-4 py-2 font-medium text-slate-950">Sign up</button>
          </form>
        </div>
        <div className="glass rounded-3xl p-6">
          <h2 className="text-2xl font-semibold">Continue with Google</h2>
          <p className="mt-2 text-sm text-muted">One-click login for faster onboarding.</p>
          <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 hover:bg-white/20">
            <Globe className="h-4 w-4" />
            Continue with Google
          </button>
          <p className="mt-8 text-sm text-muted">
            Supabase integration is wired. Add your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to
            `.env.local` to make auth live.
          </p>
        </div>
      </div>
    </section>
  );
}
