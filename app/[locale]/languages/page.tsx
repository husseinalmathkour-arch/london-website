import type { Metadata } from 'next'
import AnimatedSection from '@/components/AnimatedSection'
import LanguageCard from '@/components/LanguageCard'
import CTABanner from '@/components/CTABanner'
import { createServiceClient } from '@/lib/supabase'
import { getTranslations, getLocale } from 'next-intl/server'
import { getLocaleAlternates, withSiteUrl } from '@/lib/site-url'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const isTR = locale === 'tr'
  const path = '/languages'

  return {
    title: isTR
      ? 'Öğrettiğimiz Diller | Londra’da Fransızca, İspanyolca, Almanca ve Daha Fazlası'
      : 'Languages We Teach | French, Spanish, German & More in London',
    description: isTR
      ? 'London Language Academy, Central London’da 15’ten fazla dilde uzman kurslar sunar. İngilizce, Fransızca, İspanyolca, Almanca, İtalyanca, Arapça ve daha fazlası. Tüm seviyelere uygun programlar.'
      : 'London Language Academy offers expert courses in 15+ languages in Central London — English, French, Spanish, German, Italian, Mandarin, Arabic, Portuguese and more. All levels welcome.',
    alternates: {
      canonical: withSiteUrl(`/${locale}${path}`),
      languages: getLocaleAlternates(path),
    },
  }
}

const levelCodes = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const

export default async function LanguagesPage() {
  const t = await getTranslations('languages')
  const tRaw = await getTranslations()
  const locale = await getLocale()

  const db = createServiceClient()
  const { data: langRows } = await db
    .from('languages_offered')
    .select('id,name_en,name_tr,flag,level_en,level_tr,description_en,description_tr,students,color,image_url')
    .eq('published', true)
    .order('sort_order')

  const languages = (langRows ?? []).map(l => ({
    id: l.id,
    name: (locale === 'tr' && l.name_tr) ? l.name_tr : l.name_en,
    level: (locale === 'tr' && l.level_tr) ? l.level_tr : (l.level_en ?? ''),
    description: (locale === 'tr' && l.description_tr) ? l.description_tr : (l.description_en ?? ''),
    flag: l.flag ?? '',
    students: l.students ?? 0,
    color: l.color ?? 'from-blue-500 to-indigo-500',
    image: l.image_url ?? null,
  }))
  const levelDescs = tRaw.raw('languages.cefrDescriptions') as string[]
  const levelLabels = locale === 'tr'
    ? ['Başlangıç', 'Temel', 'Orta', 'Orta-Üstü', 'İleri', 'Yetkin']
    : ['Beginner', 'Elementary', 'Intermediate', 'Upper-Intermediate', 'Advanced', 'Proficiency']
  const levelDescriptions = levelCodes.map((code, i) => ({ code, label: levelLabels[i], desc: levelDescs[i] }))
  const tableHeaders = locale === 'tr'
    ? ['Dil', 'Seviyeler', 'Genel', 'Sınav Hazırlığı', 'İş Dili', 'Online', 'Yurt Dışı Eğitim']
    : ['Language', 'Levels', 'General', 'Exam Prep', 'Business', 'Online', 'Study Abroad']
  const tableRows = locale === 'tr'
    ? [
        { lang: '🇬🇧 İngilizce', levels: 'A1–C2', general: true, exam: true, business: true, online: true, abroad: true },
        { lang: '🇫🇷 Fransızca', levels: 'A1–C2', general: true, exam: true, business: true, online: true, abroad: true },
        { lang: '🇪🇸 İspanyolca', levels: 'A1–C2', general: true, exam: true, business: true, online: true, abroad: true },
        { lang: '🇩🇪 Almanca', levels: 'A1–C1', general: true, exam: true, business: true, online: true, abroad: true },
        { lang: '🇮🇹 İtalyanca', levels: 'A1–B2', general: true, exam: false, business: false, online: true, abroad: true },
        { lang: '🇸🇦 Arapça', levels: 'A1–B1', general: true, exam: false, business: false, online: true, abroad: false },
      ]
    : [
        { lang: '🇬🇧 English', levels: 'A1–C2', general: true, exam: true, business: true, online: true, abroad: true },
        { lang: '🇫🇷 French', levels: 'A1–C2', general: true, exam: true, business: true, online: true, abroad: true },
        { lang: '🇪🇸 Spanish', levels: 'A1–C2', general: true, exam: true, business: true, online: true, abroad: true },
        { lang: '🇩🇪 German', levels: 'A1–C1', general: true, exam: true, business: true, online: true, abroad: true },
        { lang: '🇮🇹 Italian', levels: 'A1–B2', general: true, exam: false, business: false, online: true, abroad: true },
        { lang: '🇸🇦 Arabic', levels: 'A1–B1', general: true, exam: false, business: false, online: true, abroad: false },
      ]

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
        </div>
      </section>

      {/* Language cards */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {languages.map((lang, index) => (
              <AnimatedSection key={lang.id} delay={index * 0.07}>
                <LanguageCard language={lang} href={`/${locale}/languages`} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CEFR levels */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3 block">
              {t('cefrLabel')}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              {t('cefrHeading')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              {t('cefrBody')}
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {levelDescriptions.map((level, index) => {
              const colors = [
                'bg-red-50 dark:bg-red-950/30 border-red-100 dark:border-red-900 text-red-700 dark:text-red-300',
                'bg-orange-50 dark:bg-orange-950/30 border-orange-100 dark:border-orange-900 text-orange-700 dark:text-orange-300',
                'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-100 dark:border-yellow-900 text-yellow-700 dark:text-yellow-300',
                'bg-green-50 dark:bg-green-950/30 border-green-100 dark:border-green-900 text-green-700 dark:text-green-300',
                'bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900 text-blue-700 dark:text-blue-300',
                'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-100 dark:border-indigo-900 text-indigo-700 dark:text-indigo-300',
              ]
              return (
                <AnimatedSection key={level.code} delay={index * 0.08}>
                  <div className={`border rounded-2xl p-6 ${colors[index]}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl font-extrabold">{level.code}</span>
                      <span className="text-base font-bold">{level.label}</span>
                    </div>
                    <p className="text-sm opacity-80 leading-relaxed">{level.desc}</p>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* Teaching approach */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3 block">
                {t('approachLabel')}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
                {t('approachHeading')}
              </h2>
              <div className="space-y-5 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>{t('approachP1')}</p>
                <p>{t('approachP2')}</p>
                <p>{t('approachP3')}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="space-y-4">
                {(tRaw.raw('languages.approachPillars') as Array<{ title: string; desc: string }>).map((item) => (
                  <div key={item.title} className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1.5 text-sm">{item.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Languages table */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
              {t('matrixHeading')}
            </h2>
          </AnimatedSection>
          <AnimatedSection>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-blue-600 text-white text-left">
                    <th className="p-4 rounded-tl-xl">{tableHeaders[0]}</th>
                    <th className="p-4">{tableHeaders[1]}</th>
                    <th className="p-4">{tableHeaders[2]}</th>
                    <th className="p-4">{tableHeaders[3]}</th>
                    <th className="p-4">{tableHeaders[4]}</th>
                    <th className="p-4">{tableHeaders[5]}</th>
                    <th className="p-4 rounded-tr-xl">{tableHeaders[6]}</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, i) => (
                    <tr key={row.lang} className={i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/50'}>
                      <td className="p-4 font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700">{row.lang}</td>
                      <td className="p-4 text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">{row.levels}</td>
                      {[row.general, row.exam, row.business, row.online, row.abroad].map((val, j) => (
                        <td key={j} className="p-4 text-center border-b border-gray-100 dark:border-gray-700">
                          {val ? (
                            <span className="text-green-500 font-bold text-base">✓</span>
                          ) : (
                            <span className="text-gray-300 dark:text-gray-600">—</span>
                          )}
                        </td>
                      ))}
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
