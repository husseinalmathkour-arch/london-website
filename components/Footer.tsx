'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

interface FooterProps {
  address?: string
  phone?: string
  email?: string
  facebook?: string
  twitter?: string
  instagram?: string
  linkedin?: string
  youtube?: string
}

export default function Footer({ address, phone, email, facebook, twitter, instagram, linkedin, youtube }: FooterProps) {
  const t = useTranslations('footer')
  const locale = useLocale()
  const fl = useTranslations('footerLinks')
  const localizedHref = (href: string) => `/${locale}${href === '/' ? '' : href}`

  const footerLinks = {
    [fl('courses.heading')]: [
      { href: '/services', label: fl('courses.generalEnglish') },
      { href: '/services', label: fl('courses.examPrep') },
      { href: '/services', label: fl('courses.otherLanguages') },
      { href: '/services', label: fl('courses.oneToOne') },
      { href: '/services', label: fl('courses.online') },
      { href: '/services', label: fl('courses.intensive') },
    ],
    [fl('languages.heading')]: [
      { href: '/languages', label: fl('languages.english') },
      { href: '/languages', label: fl('languages.french') },
      { href: '/languages', label: fl('languages.spanish') },
      { href: '/languages', label: fl('languages.german') },
      { href: '/languages', label: fl('languages.italian') },
      { href: '/languages', label: fl('languages.russian') },
    ],
    [fl('academy.heading')]: [
      { href: '/about', label: fl('academy.about') },
      { href: '/study-abroad', label: fl('academy.studyAbroad') },
      { href: '/level-test', label: fl('academy.levelTest') },
      { href: '/testimonials', label: locale === 'tr' ? 'Öğrenci Yorumları' : 'Student Reviews' },
      { href: '/blog', label: fl('academy.blog') },
      { href: '/faq', label: fl('academy.faq') },
      { href: '/contact', label: fl('academy.contact') },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: facebook, label: 'Facebook' },
    { icon: Twitter, href: twitter, label: 'Twitter' },
    { icon: Instagram, href: instagram, label: 'Instagram' },
    { icon: Linkedin, href: linkedin, label: 'LinkedIn' },
    { icon: Youtube, href: youtube, label: 'YouTube' },
  ].filter(s => s.href)

  const phoneHref = phone ? `tel:${phone.replace(/\s/g, '')}` : undefined
  const emailHref = email ? `mailto:${email}` : undefined

  return (
    <footer className="text-gray-300" style={{ backgroundColor: '#3d0d14' }}>
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href={`/${locale}`} className="flex items-center mb-5 w-fit">
              <Image
                src="/logo.png"
                alt="London Language Academy"
                width={220}
                height={68}
                className="h-40 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              {t('tagline')}
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-6">
              {address && (
                <div className="flex items-start gap-3 text-sm text-gray-400">
                  <MapPin className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>{address}</span>
                </div>
              )}
              {phone && phoneHref && (
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Phone className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <a href={phoneHref} className="hover:text-white transition-colors">{phone}</a>
                </div>
              )}
              {email && emailHref && (
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Mail className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <a href={emailHref} className="hover:text-white transition-colors">{email}</a>
                </div>
              )}
            </div>

            {/* Social links */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-2">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-white font-semibold text-sm mb-4">{heading}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={localizedHref(link.href)}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} {t('copyright')}
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <Link href={`/${locale}/privacy`} className="hover:text-gray-300 transition-colors">{t('privacyPolicy')}</Link>
            <Link href={`/${locale}/terms`} className="hover:text-gray-300 transition-colors">{t('termsOfService')}</Link>
            <Link href={`/${locale}/cookies`} className="hover:text-gray-300 transition-colors">{t('cookiePolicy')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
