# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (http://localhost:3000)
npm run build     # Production build
npm run lint      # ESLint
```

No test suite is configured.

## Architecture Overview

This is a **Next.js 14 App Router** site for a London language academy, with a public-facing multilingual website and a built-in admin dashboard.

### Routing Structure

- **`app/[locale]/`** — Public pages, wrapped in next-intl locale routing (`en`, `tr`). The middleware in `middleware.ts` intercepts all non-API, non-admin routes and injects the locale prefix.
- **`app/admin/`** — Admin dashboard. Excluded from i18n middleware (see `matcher` in `middleware.ts`). Auth is handled by checking the `admin_users` Supabase table on each page load (no JWT session — just localStorage).
- **`app/api/`** — API routes for contact form, newsletter, level test, testimonials, and admin user creation.

### i18n

Uses `next-intl` v3. Translation files are in `messages/en.json` and `messages/tr.json`. The admin UI has its own separate translation system in `lib/admin-i18n.ts` with a `AdminLangContext` that persists the selected language to localStorage under the key `admin-lang`.

### Backend: Supabase

`lib/supabase.ts` exports two clients:
- `supabase` — anon key, used client-side
- `createServiceClient()` — service role key, used only in API routes and server components

Key tables: `admin_users`, `blog_posts`, `courses`, `languages_offered`, `branches`, `testimonials`, `level_test_submissions`, `contact_enquiries`, `newsletter_subscribers`.

All content tables have bilingual fields (e.g. `title_en`, `title_tr`), a `published` boolean, and a `sort_order` integer.

### Admin Dashboard

- Lives entirely in `app/admin/` and is all client-side (`'use client'`)
- Auth: login page checks credentials against `admin_users` table; session state is held in component state and localStorage — there's no middleware protecting admin routes
- Roles: `admin` and `super_admin`; only super admins can create/delete other admins
- All CRUD uses modal dialogs with in-component form state (no form library)
- Creating admins uses the service role key via `/api/admin/create-admin`

### Styling

Tailwind CSS with dark mode via `class`. Brand colors are defined in `tailwind.config.ts`:
- Primary: `#70212c` (maroon), Light: `#c94055`, Dark: `#5a1a23`
- Gold: `#c3ab73`

Utility composition uses `clsx` + `tailwind-merge` (see `lib/utils.ts`).

### GlowCard — Spotlight Border Effect

`components/ui/spotlight-card.tsx` — interactive glowing border card component.

- Works on **desktop** (pointermove) and **mobile** (touchstart/touchmove/touchend)
- Uses a singleton pattern: one set of global listeners shared across all instances
- All listeners are `passive: true` — never blocks scrolling
- Technique: 2px gradient wrapper div; inner card sits inside, revealing the gradient as a glowing border
- Brand glow color: `hsl(352, 65%, 42%)` (maroon) — use `glowColor="red"`

**Used in:** `ServiceCard` (non-popular only), `LanguageCard`, `TestimonialCard`, and directly in the "Why Choose Us" section of `page.tsx`.

**Usage:**
```tsx
<GlowCard glowColor="red" className="bg-white dark:bg-gray-900 p-6 h-full">
  {/* card content */}
</GlowCard>
```

Do **not** add `overflow-hidden` to the GlowCard outer wrapper — it clips the border effect. Put `overflow-hidden` on the `className` (inner div) only if needed.

### Email Notifications

When a contact enquiry is submitted, `app/api/contact/route.ts` fetches all emails from `admin_users` and sends each one a notification via **Resend** (`resend` package).

Currently sends from `onboarding@resend.dev` (Resend free plan limitation — no verified domain yet). The loop already handles all admins dynamically. **When going live:** verify `londonlanguageacademy.net` in Resend and change `from` to `noreply@londonlanguageacademy.net`.

### Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY
```
