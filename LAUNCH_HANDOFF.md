## Launch Handoff

Date: 2026-04-09

### Current live status

- Primary live site works: `https://www.londonlanguageacademy.com`
- Live admin login: `https://www.londonlanguageacademy.com/admin/login`
- Vercel project is deployed from GitHub repo:
  - `https://github.com/husseinalmathkour-arch/london-website`

### Latest production fixes already pushed

- `27842f2` Fix Supabase env loading for Vercel build
- `967bb26` Defer homepage hero animations until mount
- `6c01a15` Fix client-side Supabase env resolution

The production homepage crash was resolved after `6c01a15`.

### Domains

Working now:

- `www.londonlanguageacademy.com`
- `londonlanguageacademy.net` -> redirects to `https://www.londonlanguageacademy.com`

Still pending in Vercel at end of day:

- `londonlanguageacademy.com`
- `londonlanguageacademy.com.tr`
- `londonla.com.tr`

Vercel still expects the same DNS for each pending root domain:

- Type: `A`
- Name: `@`
- Value: `216.198.79.1`

Main domain `www.londonlanguageacademy.com` is valid in Vercel.

### DNS provider notes

- `londonlanguageacademy.com` DNS managed in Veridyen
- `londonlanguageacademy.com.tr` DNS managed in Veridyen
- `londonla.com.tr` DNS managed in Veridyen
- `londonlanguageacademy.net` registered at GoDaddy but DNS managed in Cloudflare

Cloudflare setup done for `.net`:

- root `A` record points to `216.198.79.1`
- proxy disabled (`DNS only`)
- `www` also set to `DNS only`

### Vercel env vars configured

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `NEXT_PUBLIC_SITE_URL=https://www.londonlanguageacademy.com`
- `REVALIDATE_SECRET`

### Important security follow-up

The following secrets were exposed in screenshots and must be rotated:

- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`

### Next steps for tomorrow

1. Check Vercel Domains again and refresh:
   - `londonlanguageacademy.com`
   - `londonlanguageacademy.com.tr`
   - `londonla.com.tr`
2. If still invalid after propagation window, verify Veridyen root `A` records publicly resolve to `216.198.79.1`.
3. Rotate exposed secrets:
   - Supabase service role key
   - Resend API key
4. Update the rotated secrets in Vercel env vars.
5. Set up Google Search Console for `https://www.londonlanguageacademy.com`
6. Submit sitemap:
   - `https://www.londonlanguageacademy.com/sitemap.xml`

### Local machine status

- Local `next dev` processes were stopped
- `ngrok` processes were stopped

