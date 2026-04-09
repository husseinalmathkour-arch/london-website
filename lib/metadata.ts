import type { Metadata } from 'next'
import { getLocaleAlternates, withSiteUrl } from '@/lib/site-url'

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: string
  path: string
  title: string
  description: string
}): Metadata {
  const localeCode = locale === 'tr' ? 'tr_TR' : 'en_GB'
  const alternateLocale = locale === 'tr' ? ['en_GB'] : ['tr_TR']
  const canonicalUrl = withSiteUrl(`/${locale}${path}`)

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: getLocaleAlternates(path),
    },
    openGraph: {
      type: 'website',
      locale: localeCode,
      alternateLocale,
      url: canonicalUrl,
      siteName: 'London Language Academy',
      title,
      description,
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
      title,
      description,
      images: ['/opengraph-image'],
    },
  }
}
