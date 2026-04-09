'use client'

import { motion, useAnimationFrame } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, PlayCircle, Star } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { useState } from 'react'
import Typewriter from './Typewriter'
import { BeamsCanvas } from './ui/beams-background'
import RotatingEarth from './ui/wireframe-dotted-globe'
import LanguageFlag from './LanguageFlag'

const typewriterWords = ['English', 'Français', 'Español', 'Deutsch', 'Italiano', 'العربية', 'Português', '中文']
const heroLanguages = [
  { country: 'gb', lang: 'English', students: '2,400+' },
  { country: 'de', lang: 'German', students: '340+' },
  { country: 'es', lang: 'Spanish', students: '310+' },
  { country: 'fr', lang: 'French', students: '290+' },
  { country: 'it', lang: 'Italian', students: '280+' },
  { country: 'ru', lang: 'Russian', students: '170+' },
] as const

function HeroLanguageCard({
  country,
  lang,
  students,
  card,
  orbitTime,
}: {
  country: typeof heroLanguages[number]['country']
  lang: string
  students: string
  card: { angle: number; radiusX: number; radiusY: number; driftX: number; driftY: number; speed: number }
  orbitTime: number
}) {
  const theta = card.angle - orbitTime * card.speed
  const depth = Math.sin(theta)
  const baseX = Math.cos(theta) * card.radiusX
  const baseY = Math.sin(theta) * card.radiusY
  const x = baseX
  const y = baseY
  const normalizedDepth = (depth + 1) / 2
  const easedDepth = normalizedDepth * normalizedDepth * (3 - 2 * normalizedDepth)
  const opacity = 0.1 + easedDepth * 0.9
  const scale = 0.74 + easedDepth * 0.34
  const blur = (1 - easedDepth) * 2.4
  const zIndex = 5 + Math.round(easedDepth * 35)

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 z-10"
      style={{
        x,
        y,
        opacity,
        scale,
        zIndex,
        filter: `blur(${blur}px)`,
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        className="relative"
        style={{ x: '-50%', y: '-50%', transformStyle: 'preserve-3d' }}
      >
        <motion.div
          animate={{ y: [0, -8, 0, 8, 0] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.06 }}
          className="min-w-[180px] px-2 py-2"
        >
          <div className="flex items-center gap-3 drop-shadow-[0_10px_24px_rgba(0,0,0,0.28)]">
            <div style={{ transform: 'translateZ(24px)' }}>
              <LanguageFlag
                id={country}
                name={lang}
                className="h-8 w-12"
              />
            </div>
            <div style={{ transform: 'translateZ(18px)' }}>
              <p className="font-bold text-white text-sm leading-none">{lang}</p>
              <p className="mt-1 text-xs text-white/70">{students} students</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function HeroSection() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const [orbitTime, setOrbitTime] = useState(0)
  const orbitCards = [
    { angle: -Math.PI / 2, radiusX: 270, radiusY: 8, driftX: -12, driftY: -10, speed: 0.2 },
    { angle: -Math.PI / 6, radiusX: 260, radiusY: 12, driftX: 14, driftY: -8, speed: 0.2 },
    { angle: Math.PI / 6, radiusX: 274, radiusY: 10, driftX: 14, driftY: 5, speed: 0.2 },
    { angle: Math.PI / 2, radiusX: 266, radiusY: 8, driftX: 10, driftY: 8, speed: 0.2 },
    { angle: (5 * Math.PI) / 6, radiusX: 258, radiusY: 10, driftX: -12, driftY: 8, speed: 0.2 },
    { angle: (7 * Math.PI) / 6, radiusX: 272, radiusY: 12, driftX: -14, driftY: 4, speed: 0.2 },
  ] as const

  useAnimationFrame((time) => {
    setOrbitTime(time / 1000)
  })

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: '#70212c' }}>
      {/* Animated beams background */}
      <BeamsCanvas intensity="medium" />

      {/* Subtle overlay blobs */}
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(195,171,115,0.08)' }} />
      <div className="absolute bottom-20 left-0 w-80 h-80 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(195,171,115,0.06)' }} />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c3ab73' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            {/* Headline with typewriter */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6"
            >
              <span style={{ color: '#c3ab73' }}>
                {t('subheadline')}
              </span>
              <br />
              {t('learnPrefix') && <span className="text-white">{t('learnPrefix')}{' '}</span>}
              <Typewriter
                words={typewriterWords}
                className="text-white"
                typingSpeed={90}
                deletingSpeed={50}
                pauseDuration={1800}
              />
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg leading-relaxed mb-8 max-w-xl" style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              {t('description')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-semibold rounded-xl transition-all text-white"
                style={{ backgroundColor: '#c3ab73' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#a8925f')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#c3ab73')}
              >
                {t('ctaPrimary')}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`/${locale}/level-test`}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-semibold rounded-xl transition-colors border border-white/30 text-white hover:bg-white/10"
              >
                <PlayCircle className="w-5 h-5" style={{ color: '#c3ab73' }} />
                {t('ctaSecondary')}
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {['MS', 'AA', 'YT', 'EP', 'CM'].map((initials) => (
                  <div
                    key={initials}
                    className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: '#a8925f' }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <span className="font-semibold text-white">4.9/5</span> {t('socialProof')}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right content — Globe with orbiting language cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative hidden lg:block h-[680px]"
            style={{ perspective: '1200px' }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex h-[580px] w-[580px] items-center justify-center bg-[radial-gradient(circle_at_center,rgba(195,171,115,0.18),rgba(195,171,115,0.02)_45%,transparent_68%)]">
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(195,171,115,0.12),transparent_60%)] blur-3xl" />
                <RotatingEarth
                  width={580}
                  height={580}
                  className="relative z-[1] h-[580px] w-[580px]"
                  strokeColor="#c3ab73"
                  dotColor="rgba(195,171,115,0.76)"
                />
              </div>
            </div>

            {heroLanguages.map((item, i) => (
              <HeroLanguageCard
                key={item.lang}
                country={item.country}
                lang={item.lang}
                students={item.students}
                card={orbitCards[i]}
                orbitTime={orbitTime}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80L60 72C120 64 240 48 360 44C480 40 600 48 720 52C840 56 960 56 1080 52C1200 48 1320 40 1380 36L1440 32V80H0Z" className="fill-gray-50 dark:fill-gray-900" />
        </svg>
      </div>
    </section>
  )
}
