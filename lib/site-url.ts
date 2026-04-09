const DEFAULT_SITE_URL = 'https://londonlanguageacademy.com'

export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL
  return raw.replace(/\/+$/, '')
}

export function getMetadataBase() {
  return new URL(getSiteUrl())
}

export function withSiteUrl(path = '/') {
  return new URL(path, getMetadataBase()).toString()
}

export function getLocaleAlternates(path = '') {
  const normalized = path.startsWith('/') ? path : `/${path}`

  return {
    en: withSiteUrl(`/en${normalized}`),
    tr: withSiteUrl(`/tr${normalized}`),
    'x-default': withSiteUrl(`/en${normalized}`),
  }
}
