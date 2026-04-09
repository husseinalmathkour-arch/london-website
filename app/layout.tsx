import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import './globals.css'
import { getMetadataBase } from '@/lib/site-url'

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  const lang = locale === 'tr' ? 'tr' : 'en'

  return (
    <html lang={lang} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
