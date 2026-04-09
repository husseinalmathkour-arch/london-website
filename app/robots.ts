import { withSiteUrl } from '@/lib/site-url'

export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: withSiteUrl('/sitemap.xml'),
  }
}
