import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import './globals.css'
import { getMetadataBase } from '@/lib/site-url'

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const localeCookie = cookies().get('NEXT_LOCALE')?.value
  const lang = localeCookie === 'tr' ? 'tr' : 'en'

  return (
    <html lang={lang} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
