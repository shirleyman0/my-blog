# Project Context: Personal Blog System

## 1. Project Overview
This is a personal blog application built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS**, using **Supabase** as the backend for data storage and authentication. The project is designed to be deployed on **Vercel**.

## 2. Tech Stack
- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (planned/implemented)
- **Linting**: ESLint

## 3. Architecture
The application follows a standard Next.js App Router architecture:
- **Frontend**: Server Components (RSC) for data fetching and initial rendering, Client Components for interactivity.
- **Backend**: Next.js API Routes (Server Actions) and Supabase Client for direct database access.
- **Data Flow**: The app fetches blog posts from Supabase `blog_posts` table.
- **Rendering**:
    - **Home**: Static Generation (SSG)
    - **Blog List**: Server-Side Rendering (SSR) for pagination/filtering
    - **Blog Detail**: SSG + ISR (Incremental Static Regeneration)

## 4. Directory Structure
```
/
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── page.tsx        # Homepage
│   │   ├── blog/           # Blog section
│   │   │   ├── page.tsx    # Blog listing
│   │   │   └── [slug]/     # Blog post detail
│   │   └── layout.tsx      # Root layout
│   ├── lib/                # Shared libraries & utilities
│   │   └── supabase.ts     # Supabase client & types
│   └── components/         # (Planned) Shared UI components
├── docs/                   # Documentation (System Design, Requirements)
├── public/                 # Static assets
├── supabase-schema.sql     # Database schema definition
└── package.json            # Project dependencies & scripts
```

## 5. Key Commands
- **Install Dependencies**: `npm install`
- **Start Dev Server**: `npm run dev` (Runs on http://localhost:3000)
- **Build for Production**: `npm run build`
- **Start Production Server**: `npm run start`
- **Lint Code**: `npm run lint`

## 6. Development Guidelines
- **Imports**: Use the `@/` alias for imports from `src/` (e.g., `import { supabase } from '@/lib/supabase'`).
- **Styling**: Use Tailwind CSS utility classes. Avoid inline styles or separate CSS files unless necessary.
- **Type Safety**: Strictly adhere to TypeScript types. Defined interfaces (e.g., `BlogPost`) should be used for data.
- **Environment Variables**:
    - `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous public key
    - Ensure these are set in `.env.local` for local development.

## 7. Database (Supabase)
- **Table**: `blog_posts`
- **Schema**:
    - `id`: UUID (Primary Key)
    - `title`: Text
    - `slug`: Text (Unique)
    - `content`: Text (Markdown)
    - `excerpt`: Text
    - `author`: Text
    - `published_at`: Timestamp (Nullable)
    - `tags`: Array of Text
- **Setup**: Use `supabase-schema.sql` to create the table and `insert-sample-posts.sql` for seed data.

## 8. Documentation Resources
- `docs/system-design.md`: Detailed architectural design.
- `AGENTS.md`: Specific instructions for AI agents (Reference this for coding conventions).
- `CLAUDE.md`: Another agent context file.
