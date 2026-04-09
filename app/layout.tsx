import type { Metadata } from 'next'
import './globals.css'
import { getMetadataBase } from '@/lib/site-url'

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
