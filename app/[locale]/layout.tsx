export const revalidate = 3600

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'

const inter = Inter({ subsets: ['latin'], display: 'swap' })
import { getMessages } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TopBar from '@/components/TopBar'
import WhatsAppButton from '@/components/WhatsAppButton'
import { BranchProvider } from '@/context/BranchContext'
import { OrganizationSchema, LocalBusinessSchema } from '@/components/JsonLd'
import CookieBanner from '@/components/CookieBanner'
import BackToTop from '@/components/BackToTop'
import PageTransition from '@/components/PageTransition'
import { createServiceClient } from '@/lib/supabase'
import { getLocaleAlternates, getMetadataBase, withSiteUrl } from '@/lib/site-url'

export const metadata: Metadata = {
  title: {
    default: 'London Language Academy — Expert Language Courses in Central London',
    template: '%s | London Language Academy',
  },
  description:
    'London Language Academy offers world-class language courses in Central London. English, French, Spanish, German, Italian and more. IELTS, Cambridge, and Business Language specialists.',
  keywords: [
    'London language school',
    'English courses London',
    'IELTS preparation London',
    'Cambridge exam preparation',
    'Business English London',
    'French courses London',
    'Spanish courses London',
    'language academy Covent Garden',
    'study abroad London',
    'language school Bursa',
    'language school Istanbul',
  ],
  authors: [{ name: 'London Language Academy' }],
  creator: 'London Language Academy',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    alternateLocale: ['tr_TR'],
    url: withSiteUrl('/'),
    siteName: 'London Language Academy',
    title: 'London Language Academy — Expert Language Courses',
    description: 'World-class language courses in Central London. Expert teachers, proven results.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'London Language Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'London Language Academy',
    description: 'Expert language courses in Central London.',
    images: ['/opengraph-image'],
  },
  metadataBase: getMetadataBase(),
  alternates: {
    canonical: withSiteUrl('/'),
    languages: getLocaleAlternates(''),
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'tr' }]
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()
  const db = createServiceClient()
  const [{ data: settingsRows }, { data: branchRows }] = await Promise.all([
    db.from('site_settings').select('key,value'),
    db.from('branches').select('id,name_en,name_tr,address_en,address_tr,phone,whatsapp,hours,maps_url').eq('published', true).order('sort_order'),
  ])
  const s: Record<string, string> = {}
  ;(settingsRows ?? []).forEach((r: { key: string; value: string | null }) => { s[r.key] = r.value ?? '' })

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <BranchProvider initialBranches={branchRows ?? []}>
          <OrganizationSchema />
          <LocalBusinessSchema />
          <TopBar />
          <Navbar />
          <main className={`min-h-screen pt-9 ${inter.className}`}>
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer
            address={s.address_london_en || ''}
            phone={s.phone_london || ''}
            email={s.email_general || ''}
            facebook={s.facebook || ''}
            twitter={s.twitter || ''}
            instagram={s.instagram || ''}
            linkedin={s.linkedin || ''}
            youtube={s.youtube || ''}
          />
          <WhatsAppButton />
          <CookieBanner />
          <BackToTop />
        </BranchProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}
