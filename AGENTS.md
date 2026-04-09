# Repository Guidelines

## Project Structure & Module Organization
This repository is a Next.js 14 App Router app. Public routes live in `app/[locale]/` and non-localized routes such as `app/admin/`, `app/api/`, and root pages live directly under `app/`. Shared UI lives in `components/`, with admin-specific UI in `components/admin/` and lower-level primitives in `components/ui/`. Shared logic and data helpers live in `lib/`, React context providers in `context/`, locale wiring in `i18n/`, translation dictionaries in `messages/`, static assets in `public/`, and Supabase SQL/bootstrap scripts at the repository root.

## Build, Test, and Development Commands
Use `npm run dev` to start the local dev server on port 3000. Use `npm run build` to produce a production build and catch type or route issues before merging. Use `npm run start` to serve the production build locally. Use `npm run lint` to run the Next.js ESLint checks; treat lint warnings as merge blockers.

## Coding Style & Naming Conventions
The codebase uses TypeScript with `strict` mode enabled and the `@/*` path alias from `tsconfig.json`. Follow the existing style: 2-space indentation, semicolon-free statements, single quotes, and functional React components. Use `PascalCase` for components such as `HeroSection.tsx`, `camelCase` for helpers and hooks, and lowercase route segment names under `app/`. Keep locale content in `messages/en.json` and `messages/tr.json` aligned by key.

## Testing Guidelines
There is currently no automated test suite configured. Until one is added, verify changes with `npm run lint`, `npm run build`, and targeted manual checks for the affected route flows, especially localized pages, admin CRUD screens, and API routes. If you add tests later, place them next to the feature or in a dedicated `tests/` directory and use `*.test.ts(x)` naming.

## Commit & Pull Request Guidelines
Git history is not available in this workspace, so no local commit convention could be inferred. Use short, imperative commit subjects such as `Add Turkish blog filters` or `Fix admin login redirect`. Pull requests should include a concise description, affected routes or tables, environment-variable changes, linked issues, and screenshots for UI work. Call out any Supabase schema or seed-script updates explicitly.

## Security & Configuration Tips
Do not expose `SUPABASE_SERVICE_ROLE_KEY` in client code; keep it inside API routes or server-only modules such as `lib/supabase.ts`. Required environment variables are `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and `RESEND_API_KEY`.
