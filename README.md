# JobTrack

Web-based job application tracking with multi-user login, team workspaces, admin panel, and optional provider API keys for extraction.

## Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS, Framer Motion, React Three Fiber
- Supabase (auth, Postgres, RLS)

## Features

- Email/password and Google login UI
- Dashboard with application pipeline states
- New application flow: URL, pasted job text, screenshot/PDF upload
- Auto-extraction preview (mock client extraction in v1)
- Provider settings for user-supplied API keys
- Admin panel starter
- Supabase schema in `supabase/schema.sql`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment:

```bash
cp .env.example .env.local
```

Add:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. Run locally:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Deploy to Vercel or any Next.js host. Set the same environment variables in your hosting dashboard.
