import type { Metadata } from 'next'
import Image from 'next/image'
import AnimatedSection from '@/components/AnimatedSection'
import CTABanner from '@/components/CTABanner'
import { GlowCard } from '@/components/ui/spotlight-card'
import { Plane, CheckCircle, Globe, Users, BookOpen, Star, Briefcase, GraduationCap, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { getTranslations, getLocale } from 'next-intl/server'
import { createServiceClient } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Study Abroad Programmes | Language Immersion in 12 Countries',
  description: 'Study abroad with London Language Academy — language immersion courses, summer schools, academic placements and internships in Spain, France, Germany, USA and 12+ countries.',
}


const programmeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  language:     BookOpen,
  summer:       Star,
  academic:     GraduationCap,
  'work-travel': Globe,
  internship:   Briefcase,
}

const benefitIcons = [Globe, Users, BookOpen, Star, CheckCircle, Plane]

export default async function StudyAbroadPage() {
  const t = await getTranslations('studyAbroad')
  const benefits = t.raw('benefits') as Array<{ title: string; description: string }>
  const locale = await getLocale()

  const db = createServiceClient()
  const { data: rows } = await db
    .from('study_abroad_programs')
    .select('id,city,country,flag,language,duration,price,description_en,description_tr,highlights_en,highlights_tr,image_url')
    .eq('published', true)
    .order('sort_order')

  const programmes = (rows ?? []).map(p => ({
    id: p.id,
    title: `${p.flag ?? ''} ${p.city}${p.country ? `, ${p.country}` : ''}`.trim(),
    badge: p.language ?? p.duration ?? '',
    description: (locale === 'tr' && p.description_tr) ? p.description_tr : (p.description_en ?? ''),
    highlights: (locale === 'tr' && p.highlights_tr?.length ? p.highlights_tr : p.highlights_en) ?? [],
    image: p.image_url ?? null,
  }))

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-24 lg:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(112,33,44,0.35), rgba(195,171,115,0.12)), url('https://rjnbglsmjcuvlbxozbdq.supabase.co/storage/v1/object/public/images/site/study-abroad-hero.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(195,171,115,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(195,171,115,0.18),transparent_28%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-3 block">
              {t('heroLabel')}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              {t('heroHeading')}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
              {t('heroDescription')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`/${locale}/contact?service=study-abroad`}
                className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-7 py-3.5 rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
              >
                <Plane className="w-4 h-4" /> {t('applyNow')}
              </Link>
              <a
                href="#programmes"
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/10 transition-colors"
              >
                {t('browseLabel')}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Study Abroad */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3 block">
              {t('consultingLabel')}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              {t('consultingHeading')}
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              {t('consultingBody')}
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => {
              const Icon = benefitIcons[i] || Globe
              return (
                <AnimatedSection key={b.title} delay={i * 0.08}>
                  <GlowCard glowColor="red" className="p-6 bg-gray-50 dark:bg-gray-900 h-full">
                    <div className="w-11 h-11 bg-blue-50 dark:bg-blue-950/50 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">{b.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{b.description}</p>
                  </GlowCard>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* Programmes */}
      <section id="programmes" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3 block">
              {t('programmesLabel')}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              {t('programmesHeading')}
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              {t('programmesBody')}
            </p>
          </AnimatedSection>

          <div className="space-y-8">
            {programmes.map((prog, index) => {
              const Icon = BookOpen
              const imgSrc = prog.image ?? 'https://rjnbglsmjcuvlbxozbdq.supabase.co/storage/v1/object/public/images/site/study-abroad-hero.jpg'
              return (
                <AnimatedSection key={prog.id} delay={index * 0.07}>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="grid lg:grid-cols-3">
                      {/* Image */}
                      <div className="relative h-56 lg:h-auto">
                        <Image
                          src={imgSrc}
                          alt={prog.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:bg-gradient-to-r" />
                        <div className="absolute bottom-4 left-4 lg:top-4 lg:bottom-auto">
                          <span className="inline-flex items-center gap-1.5 bg-white/90 dark:bg-gray-900/90 text-blue-600 dark:text-blue-400 text-xs font-bold px-3 py-1.5 rounded-full">
                            {prog.badge}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="lg:col-span-2 p-7 flex flex-col">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/50 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">{prog.title}</h3>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-5 flex-1">
                          {prog.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {prog.highlights.map((h: string) => (
                            <span
                              key={h}
                              className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/60 px-3 py-1.5 rounded-full"
                            >
                              <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                              {h}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-3">
                          <Link
                            href={`/${locale}/contact?service=study-abroad`}
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
                          >
                            <MessageCircle className="w-4 h-4" />
                            {t('getInfo')}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <CTABanner
              title={t('ctaTitle')}
              description={t('ctaDescription')}
              primaryButton={{ label: t('ctaPrimary'), href: `/${locale}/contact?service=study-abroad` }}
              secondaryButton={{ label: t('ctaSecondary'), href: `/${locale}/services` }}
              variant="blue"
            />
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
