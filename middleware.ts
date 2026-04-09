import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en', 'tr'],
  defaultLocale: 'en',
  localeDetection: true,
})

export const config = {
  matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)'],
}
