import type { MetadataRoute } from 'next'
import { createServiceClient } from '@/lib/supabase'
import { getSiteUrl } from '@/lib/site-url'

const BASE_URL = getSiteUrl()
const locales = ['en', 'tr']

const staticRoutes = [
  '',
  '/about',
  '/services',
  '/languages',
  '/study-abroad',
  '/faq',
  '/contact',
  '/level-test',
  '/blog',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'weekly' : 'monthly' as const,
      priority: route === '' ? 1 : route === '/services' || route === '/contact' ? 0.9 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE_URL}/${l}${route}`])
        ),
      },
    }))
  )

  const db = createServiceClient()
  const { data: posts } = await db
    .from('blog_posts')
    .select('slug, updated_at, created_at')
    .eq('published', true)

  const blogEntries: MetadataRoute.Sitemap = (posts ?? []).flatMap((post) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at ?? post.created_at),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE_URL}/${l}/blog/${post.slug}`])
        ),
      },
    }))
  )

  return [...staticEntries, ...blogEntries]
}
