'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, LayoutGrid } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { navLinks } from '@/lib/data'
import { useLocale, useTranslations } from 'next-intl'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('nav')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'tr' : 'en'
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  // Build locale-prefixed href for nav links
  const localizedHref = (href: string) => `/${locale}${href === '/' ? '' : href}`

  // Map nav link hrefs to translation keys
  const navLabelMap: Record<string, string> = {
    '/': t('home'),
    '/about': t('about'),
    '/services': t('services'),
    '/languages': t('languages'),
    '/study-abroad': t('studyAbroad'),
    '/level-test': t('levelTest'),
    '/blog': t('blog'),
    '/faq': t('faq'),
    '/contact': t('contact'),
  }

  return (
    <header className="fixed top-9 left-0 right-0 z-40 shadow-md" style={{ backgroundColor: '#70212c', borderBottom: '3px solid #c3ab73' }}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center group flex-shrink-0 -ml-16">
            <Image
              src="/logo.png"
              alt="London Language Academy"
              width={260}
              height={80}
              className="h-40 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0">
            {navLinks.map((link) => {
              const href = localizedHref(link.href)
              return (
                <Link
                  key={link.href}
                  href={href}
                  className={`px-2 py-2 rounded-lg text-xs font-medium transition-colors duration-150 whitespace-nowrap ${
                    pathname === href
                      ? 'text-yellow-300 bg-white/10'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {navLabelMap[link.href] ?? link.label}
                </Link>
              )
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Language toggle */}
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/30 text-white text-xs font-bold hover:bg-white/10 transition-colors whitespace-nowrap"
              aria-label="Toggle language"
            >
              {locale === 'en' ? 'EN' : 'TR'}
              <span className="text-white/40">|</span>
              {locale === 'en' ? 'TR' : 'EN'}
            </button>
            <ThemeToggle />
            <a
              href="https://obs.londonlanguageacademy.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all whitespace-nowrap hover:bg-white/10"
              style={{ borderColor: '#c3ab73', color: '#c3ab73' }}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              {t('studentPortal')}
            </a>
            <Link
              href={`/${locale}/contact`}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 bg-yellow-500 hover:bg-yellow-400 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm whitespace-nowrap"
            >
              {t('enrolNow')}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-[100px] z-40 overflow-y-auto" style={{ backgroundColor: '#70212c' }}>
          <div className="px-4 py-6 space-y-1">
            {navLinks.map((link) => {
              const href = localizedHref(link.href)
              return (
                <Link
                  key={link.href}
                  href={href}
                  className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    pathname === href
                      ? 'text-yellow-300 bg-white/10'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {navLabelMap[link.href] ?? link.label}
                </Link>
              )
            })}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 mt-4 space-y-3">
              <button
                onClick={toggleLocale}
                className="flex items-center justify-center w-full gap-1 py-3 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors text-sm"
              >
                {locale === 'en' ? '🇬🇧 EN' : '🇹🇷 TR'}
                <span className="text-white/40 mx-1">|</span>
                {locale === 'en' ? 'Switch to TR' : 'Switch to EN'}
              </button>
              <a
                href="https://obs.londonlanguageacademy.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border font-semibold transition-colors hover:bg-white/10"
                style={{ borderColor: '#c3ab73', color: '#c3ab73' }}
              >
                <LayoutGrid className="w-4 h-4" />
                {t('studentPortal')}
              </a>
              <Link
                href={`/${locale}/contact`}
                className="flex items-center justify-center w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-white font-semibold rounded-xl transition-colors"
              >
                {t('enrolNow')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
