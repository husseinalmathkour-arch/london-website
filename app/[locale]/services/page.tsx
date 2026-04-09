import type { Metadata } from 'next'
import AnimatedSection from '@/components/AnimatedSection'
import ServiceCard from '@/components/ServiceCard'
import CTABanner from '@/components/CTABanner'
import { GlowCard } from '@/components/ui/spotlight-card'
import { services } from '@/lib/data'
import { createServiceClient } from '@/lib/supabase'
import { Clock, Users, Award, CheckCircle, BookOpen, ArrowRight } from 'lucide-react'
import { getTranslations, getLocale } from 'next-intl/server'
import { getLocaleAlternates, withSiteUrl } from '@/lib/site-url'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const isTR = locale === 'tr'
  const path = '/services'

  return {
    title: isTR
      ? 'Londra Dil Kursları | IELTS, İngilizce ve Daha Fazlası'
      : 'Language Courses in London | IELTS, English & More',
    description: isTR
      ? 'London Language Academy’deki tüm dil kurslarını keşfedin. General English, IELTS ve Cambridge hazırlık, Business English, birebir dersler, online kurslar ve yoğun programlar Central London’da.'
      : 'Explore all language courses at London Language Academy — General English, IELTS & Cambridge Exam Prep, Business English, One-to-One Tuition, Online Courses, and Intensive Programmes in Central London.',
    alternates: {
      canonical: withSiteUrl(`/${locale}${path}`),
      languages: getLocaleAlternates(path),
    },
  }
}

export default async function ServicesPage() {
  const t = await getTranslations('services')
  const tRaw = await getTranslations()
  const sc = await getTranslations('serviceCards')

  const processSteps = tRaw.raw('services.processSteps') as Array<{ step: string; title: string; description: string }>
  const levelDescriptions = tRaw.raw('services.generalEnglishLevels') as Array<{ description: string }>
  const locale = await getLocale()
  const db = createServiceClient()

  // Load editable level data and courses in parallel
  const levelsKey = locale === 'tr' ? 'services_levels_tr' : 'services_levels_en'
  const [{ data: levelsRow }, { data: courseRows }] = await Promise.all([
    db.from('site_settings').select('value').eq('key', levelsKey).maybeSingle(),
    db
      .from('courses')
      .select('id,title_en,title_tr,description_en,description_tr,features_en,features_tr,price,popular')
      .eq('published', true)
      .order('sort_order'),
  ])
  let customLevels: Array<{ name: string; group: string; hours: string; duration: string; description: string }> | null = null
  if (levelsRow?.value) {
    try { customLevels = JSON.parse(levelsRow.value) } catch { /* use defaults */ }
  }
  const dbCourses = (courseRows ?? []).map(c => ({
    id: c.id,
    title: (locale === 'tr' && c.title_tr) ? c.title_tr : c.title_en,
    description: (locale === 'tr' && c.description_tr) ? c.description_tr : (c.description_en ?? ''),
    features: (locale === 'tr' && c.features_tr?.length ? c.features_tr : c.features_en) ?? [],
    price: c.price ?? '',
    icon: 'BookOpen',
    popular: c.popular,
  }))

  const courseIncludes = [
    t('includes.materials'),
    t('includes.portal'),
    t('includes.assessments'),
    t('includes.conversation'),
    t('includes.feedback'),
    t('includes.tutorial'),
    t('includes.community'),
    t('includes.certificate'),
  ]

  const generalEnglishNames = locale === 'tr'
    ? ['Yeni Başlayan', 'Temel Başlangıç', 'Gelişim', 'Geçiş', 'İleri Geçiş', 'Yetkin']
    : ['Newcomer', 'Freshman', 'Climber', 'Transitional', 'Superb', 'Proficient']
  const generalEnglishGroups = locale === 'tr'
    ? ['Başlangıç', 'Temel', 'Orta Öncesi', 'Orta', 'Orta Üstü', 'İleri']
    : ['Beginner', 'Elementary', 'Pre-Intermediate', 'Intermediate', 'Upper Intermediate', 'Advanced']
  const defaultDurations = locale === 'tr'
    ? ['2 hafta', '3 ay', '3 ay', '3 ay', '3 ay', '2,5 ay']
    : ['2 weeks', '3 months', '3 months', '3 months', '3 months', '2.5 months']

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-950 dark:to-blue-950/20 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3 block">
              {t('heroLabel')}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
              {t('heroHeading')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('heroDescription')}
            </p>
          </AnimatedSection>

          {/* Quick stats */}
          <AnimatedSection delay={0.2} className="flex flex-wrap items-center justify-center gap-6 mt-10">
            {[
              { icon: Clock, label: t('flexibleScheduling') },
              { icon: Users, label: t('maxClassSize') },
              { icon: Award, label: t('allLevels') },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm font-medium">
                <Icon className="w-4 h-4 text-blue-500" />
                {label}
              </div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* General English — Roadmap */}
      {(() => {
        const ge = services.find(s => s.id === 'general-english')!
        const levelColors = [
          { bg: '#2AADAD', light: 'linear-gradient(180deg, rgb(228, 246, 246) 0%, rgb(255, 255, 255) 100%)', surface: 'rgb(221, 243, 243)', border: 'rgba(42,173,173,0.28)' },
          { bg: '#8B2533', light: 'linear-gradient(180deg, rgb(248, 235, 238) 0%, rgb(255, 255, 255) 100%)', surface: 'rgb(245, 228, 232)', border: 'rgba(139,37,51,0.28)' },
          { bg: '#D4961A', light: 'linear-gradient(180deg, rgb(252, 245, 227) 0%, rgb(255, 255, 255) 100%)', surface: 'rgb(249, 239, 214)', border: 'rgba(212,150,26,0.28)' },
          { bg: '#4A7EC7', light: 'linear-gradient(180deg, rgb(235, 241, 251) 0%, rgb(255, 255, 255) 100%)', surface: 'rgb(226, 235, 249)', border: 'rgba(74,126,199,0.28)' },
          { bg: '#7B3FA0', light: 'linear-gradient(180deg, rgb(242, 235, 248) 0%, rgb(255, 255, 255) 100%)', surface: 'rgb(235, 226, 245)', border: 'rgba(123,63,160,0.28)' },
          { bg: '#8A8A8A', light: 'linear-gradient(180deg, rgb(243, 243, 243) 0%, rgb(255, 255, 255) 100%)', surface: 'rgb(236, 236, 236)', border: 'rgba(138,138,138,0.28)' },
        ]
        return (
          <section className="py-12 bg-white dark:bg-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AnimatedSection className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-white mb-4" style={{ backgroundColor: '#70212c' }}>
                  <BookOpen className="w-3.5 h-3.5" /> {t('generalEnglishBadge')}
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                  {t('generalEnglishHeading')}
                </h2>
                <p className="text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                  {ge.description}
                </p>
              </AnimatedSection>

              {/* Detail cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ge.levels!.map((level, i) => {
                  const c = levelColors[i]
                  const cl = customLevels?.[i]
                  const displayName = cl?.name ?? generalEnglishNames[i] ?? level.name
                  const displayGroup = cl?.group ?? generalEnglishGroups[i] ?? level.group
                  const displayHours = cl?.hours ?? String(level.hours)
                  const displayDuration = cl?.duration ?? defaultDurations[i] ?? (level.duration !== '—' ? level.duration : locale === 'tr' ? '2 hafta' : '2 weeks')
                  const displayDescription = cl?.description ?? levelDescriptions[i]?.description ?? level.description
                  return (
                    <AnimatedSection key={level.name} delay={i * 0.08} className="h-[360px] md:h-[380px]">
                      <GlowCard
                        glowColor="red"
                        darkGlowColor="gold"
                        outerClassName="rounded-[30px] h-full"
                        innerClassName="rounded-[28px]"
                        className="h-full"
                      >
                        <div
                          className="relative overflow-hidden rounded-[28px] p-4 md:p-5 h-full flex flex-col shadow-[0_18px_45px_rgba(17,24,39,0.08)] transition-transform duration-300 hover:-translate-y-1"
                          style={{ background: c.light }}
                        >
                          <div className="mb-3">
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <div className="flex items-center gap-2.5">
                                <div
                                  className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-extrabold shadow-sm"
                                  style={{ backgroundColor: c.surface, color: c.bg }}
                                >
                                  {String(i + 1).padStart(2, '0')}
                                </div>
                                <div>
                                  <p className="text-lg md:text-2xl font-extrabold text-gray-900 leading-none">{displayName}</p>
                                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] mt-1.5" style={{ color: c.bg }}>
                                    {displayGroup}
                                  </p>
                                </div>
                              </div>

                              <div
                                className="shrink-0 rounded-xl px-2.5 py-1.5 text-right"
                                style={{ backgroundColor: c.surface }}
                              >
                                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">
                                  {locale === 'tr' ? 'Ders Yükü' : 'Study Load'}
                                </div>
                                <span className="text-base md:text-[1.4rem] font-extrabold block mt-0.5" style={{ color: c.bg }}>
                                  {displayHours} {locale === 'tr' ? 'saat' : 'hrs'}
                                </span>
                              </div>
                            </div>
                          </div>

                          <p className="text-[13px] md:text-sm text-gray-700 leading-6 md:leading-7 flex-1">
                            {displayDescription}
                          </p>

                          <div
                            className="mt-4 pt-3 border-t flex items-center gap-2.5 text-sm text-gray-500"
                            style={{ borderColor: c.border }}
                          >
                            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: c.surface }}>
                              <Clock className="w-3.5 h-3.5" style={{ color: c.bg }} />
                            </div>
                            <div>
                              <div className="text-[10px] uppercase tracking-[0.14em] text-gray-400">{locale === 'tr' ? 'Süre' : 'Duration'}</div>
                              <div className="text-[13px] font-medium text-gray-600">
                                {displayDuration}
                              </div>
                            </div>
                            {level.free && (
                              <span
                                className="ml-auto rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]"
                                style={{ color: c.bg, backgroundColor: c.surface }}
                              >
                                {locale === 'tr' ? 'Ücretsiz' : 'Free'}
                              </span>
                            )}
                          </div>
                        </div>
                      </GlowCard>
                    </AnimatedSection>
                  )
                })}
              </div>
            </div>
          </section>
        )
      })()}

      {/* Other Services */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3 block">
              {t('moreProgrammes')}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              {t('otherCoursesHeading')}
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {dbCourses.map((course, index) => (
              <AnimatedSection key={course.id} delay={index * 0.08}>
                <ServiceCard
                  service={course}
                  enquireLabel={sc('enquireNow')}
                  popularLabel={sc('mostPopular')}
                  detailHref={`/${locale}/courses/${course.id}`}
                  enquireHref={`/${locale}/contact?service=${course.id}`}
                  learnMoreLabel={locale === 'tr' ? 'Detaylar' : 'Learn More'}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3 block">
                {t('whatsIncludedLabel')}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                {t('whatsIncludedHeading')}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                {t('whatsIncludedBody')}
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {courseIncludes.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-xl">{t('notSureHeading')}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                  {t('notSureBody')}
                </p>
                <div className="space-y-4">
                  {(tRaw.raw('services.courseGuide') as Array<{ question: string; answer: string }>).map(({ question, answer }) => (
                    <div key={question} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div className="text-sm">
                        <span className="text-gray-600 dark:text-gray-300">{question}</span>
                        <span className="font-semibold text-blue-600 dark:text-blue-400 ml-2">{answer}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3 block">
              {t('howItWorksLabel')}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              {t('howItWorksHeading')}
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <AnimatedSection key={step.step} delay={index * 0.1}>
                <div className="text-center p-6">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-extrabold text-xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-500/30">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule overview */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
              {t('timetableHeading')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              {t('timetableBody')}
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse table-fixed">
                <colgroup>
                  <col className="w-[20%]" />
                  <col className="w-[11.4%]" />
                  <col className="w-[11.4%]" />
                  <col className="w-[11.4%]" />
                  <col className="w-[11.4%]" />
                  <col className="w-[11.4%]" />
                  <col className="w-[11.4%]" />
                  <col className="w-[11.4%]" />
                </colgroup>
                <thead>
                  <tr style={{ backgroundColor: '#70212c' }} className="text-white">
                    <th className="p-4 text-left rounded-tl-xl">{t('timetableSession')}</th>
                    <th className="p-4 text-center">{t('timetableMon')}</th>
                    <th className="p-4 text-center">{t('timetableTue')}</th>
                    <th className="p-4 text-center">{t('timetableWed')}</th>
                    <th className="p-4 text-center">{t('timetableThu')}</th>
                    <th className="p-4 text-center opacity-50">{t('timetableFri')}</th>
                    <th className="p-4 text-center">{t('timetableSat')}</th>
                    <th className="p-4 text-center rounded-tr-xl">{t('timetableSun')}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { session: '09:00–12:15' },
                    { session: '12:30–15:45' },
                    { session: '16:00–19:15' },
                    { session: '19:30–22:40' },
                  ].map((row, i) => (
                    <tr key={row.session} className={i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/50'}>
                      <td className="p-4 font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-100 dark:border-gray-700 whitespace-nowrap">
                        {row.session}
                      </td>
                      {[0, 1, 2, 3].map((j) => (
                        <td key={j} className="p-4 text-center border-b border-gray-100 dark:border-gray-700">
                          <span className="inline-flex w-7 h-7 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full text-xs items-center justify-center font-bold">✓</span>
                        </td>
                      ))}
                      <td className="p-4 text-center border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30">
                        <span className="text-gray-300 dark:text-gray-600">—</span>
                      </td>
                      <td className="p-4 text-center border-b border-gray-100 dark:border-gray-700">
                        <span className="inline-flex w-7 h-7 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full text-xs items-center justify-center font-bold">✓</span>
                      </td>
                      <td className="p-4 text-center border-b border-gray-100 dark:border-gray-700">
                        <span className="inline-flex w-7 h-7 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full text-xs items-center justify-center font-bold">✓</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <CTABanner
              title={t('ctaTitle')}
              description={t('ctaDescription')}
              primaryButton={{ label: t('ctaPrimary'), href: `/${locale}/contact?service=Course Information` }}
              secondaryButton={{ label: t('ctaSecondary'), href: `/${locale}/level-test` }}
              variant="blue"
            />
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
