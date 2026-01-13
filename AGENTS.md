# Repository Guidelines

## Project Structure & Module Organization
- `src/app` uses the Next.js App Router (`page.tsx` home, `blog/page.tsx` list, `blog/[slug]/page.tsx` detail, `layout.tsx` shell, `globals.css` for Tailwind-based styles).
- `src/lib/supabase.ts` configures the Supabase client and shared `BlogPost` type; expects env vars at runtime.
- `public/` holds static assets; `supabase-schema.sql` and `insert-sample-posts.sql` manage database schema/seed.
- Config roots: `package.json` scripts, `tsconfig.json` (alias `@/*` -> `src/*`), `eslint.config.mjs` (Next core-web-vitals), `postcss.config.mjs`, `next.config.ts`.

## Build, Test, and Development Commands
- `npm install` — install dependencies (Node >= 20.9 recommended by Next 16).
- `npm run dev` — start the dev server at http://localhost:3000.
- `npm run build` — create a production build; used by Vercel.
- `npm run start` — serve the production build locally.
- `npm run lint` — run ESLint with Next.js/TypeScript rules.
- No automated test command is defined yet.

## Coding Style & Naming Conventions
- TypeScript with strict mode; prefer functional components in App Router.
- Follow Next routing conventions (`page.tsx`, `layout.tsx`, folder names kebab/lowercase).
- Use the `@/*` import alias for modules under `src/`; favor single quotes to match existing files.
- Tailwind CSS (via `@tailwindcss/postcss`) for styling; keep utility classes concise and semantic.
- Run `npm run lint` before pushes; no Prettier config is present.

## Testing Guidelines
- Currently lint-only; perform manual checks for home and blog pages after changes.
- If adding tests, use `*.test.ts`/`*.test.tsx` naming under `src` or `tests`, and document commands in `package.json`.
- For database changes, verify Supabase queries against `blog_posts` with sample data from the seed SQL.

## Commit & Pull Request Guidelines
- Existing history uses short descriptive summaries (e.g., `Fix: Add environment variable validation for Supabase client`); continue with clear, imperative titles.
- Mention linked issues, environment or schema changes, and manual test notes in the commit/PR body.
- PRs should include a brief change description, screenshots for UI tweaks, and confirmation that `npm run lint` passes.

## Environment & Data
- Required: set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local` (not tracked; see `.gitignore`).
- Apply `supabase-schema.sql` to provision `blog_posts`; optionally seed demo content with `insert-sample-posts.sql`.
- Avoid committing `.next/`, `node_modules/`, build artifacts, and secrets; align deploys with `vercel.json` defaults (dev/build/start commands).
