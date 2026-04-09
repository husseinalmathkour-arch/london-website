import type { Metadata } from 'next'
import AnimatedSection from '@/components/AnimatedSection'
import CTABanner from '@/components/CTABanner'
import { GlowCard } from '@/components/ui/spotlight-card'
import { CheckCircle, Award, BookOpen, Globe, Heart, Target, Users, Lightbulb, GraduationCap } from 'lucide-react'
import { getTranslations, getLocale } from 'next-intl/server'
import { createServiceClient } from '@/lib/supabase'
import { getLocaleAlternates, withSiteUrl } from '@/lib/site-url'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const isTR = locale === 'tr'
  const path = '/about'

  return {
    title: isTR
      ? 'Hakkımızda | Londra’da Uzman Dil Okulu'
      : 'About Us | London Language School Since 2015',
    description: isTR
      ? 'London Language Academy hakkında bilgi alın. Central London’da İngilizce, IELTS, Cambridge ve 15+ dil eğitimi sunan uzman dil okulunun vizyonunu, değerlerini ve akademik ekibini keşfedin.'
      : 'Learn about London Language Academy — a leading language school in Central London offering English, IELTS, Cambridge, and 15+ languages. Our mission, values, and expert teaching team.',
    alternates: {
      canonical: withSiteUrl(`/${locale}${path}`),
      languages: getLocaleAlternates(path),
    },
  }
}

export default async function AboutPage() {
  const t = await getTranslations('about')
  const locale = await getLocale()
  const db = createServiceClient()

  const defaultContent = {
    heroLabel: t('heroLabel'),
    heroHeading: t('heroHeading'),
    heroDescription: t('heroDescription'),
    heroBody: t('heroBody'),
    missionLabel: t('missionLabel'),
    missionText: t('missionText'),
    visionLabel: t('visionLabel'),
    visionText: t('visionText'),
    valuesLabel: t('valuesLabel'),
    valuesHeading: t('valuesHeading'),
    whyLabel: t('whyLabel'),
    whyHeading: t('whyHeading'),
    whyDescription: t('whyDescription'),
    whyItem1Title: t('whyItem1Title'),
    whyItem1Desc: t('whyItem1Desc'),
    whyItem2Title: t('whyItem2Title'),
    whyItem2Desc: t('whyItem2Desc'),
    whyItem3Title: t('whyItem3Title'),
    whyItem3Desc: t('whyItem3Desc'),
    testimonialsLabel: t('testimonialsLabel'),
    testimonialsHeading: t('testimonialsHeading'),
    ctaTitle: t('ctaTitle'),
    ctaDescription: t('ctaDescription'),
    ctaPrimary: t('ctaPrimary'),
    ctaSecondary: t('ctaSecondary'),
    stat1Number: '~100',
    stat1Label: 'Years in London',
    stat2Number: '2021',
    stat2Label: 'Founded in Turkey',
    stat3Number: '3',
    stat3Label: 'Branches',
    stat4Number: '∞',
    stat4Label: 'Lifetime Support',
  }

  const contentSettingKey = locale === 'tr' ? 'about_content_tr' : 'about_content_en'
  const [{ data: contentRow }, { data: rows }] = await Promise.all([
    db.from('site_settings').select('value').eq('key', contentSettingKey).maybeSingle(),
    db
      .from('testimonials')
      .select('id,name,role_en,role_tr,content_en,content_tr')
      .eq('published', true)
      .eq('featured', true)
      .order('sort_order'),
  ])

  let content = defaultContent

  if (contentRow?.value) {
    try {
      const parsed = JSON.parse(contentRow.value)
      content = {
        ...defaultContent,
        ...parsed,
      }
    } catch {
      content = defaultContent
    }
  }

  const values = [
    {
      icon: Target,
      title: t('values.resultsDriven.title'),
      description: t('values.resultsDriven.description'),
    },
    {
      icon: Heart,
      title: t('values.genuineCare.title'),
      description: t('values.genuineCare.description'),
    },
    {
      icon: BookOpen,
      title: t('values.academicExcellence.title'),
      description: t('values.academicExcellence.description'),
    },
    {
      icon: Globe,
      title: t('values.globalPerspective.title'),
      description: t('values.globalPerspective.description'),
    },
    {
      icon: Award,
      title: t('values.integrity.title'),
      description: t('values.integrity.description'),
    },
    {
      icon: CheckCircle,
      title: t('values.innovation.title'),
      description: t('values.innovation.description'),
    },
  ]

  const whyItems = [
    { icon: Users, title: content.whyItem1Title, desc: content.whyItem1Desc },
    { icon: Lightbulb, title: content.whyItem2Title, desc: content.whyItem2Desc },
    { icon: GraduationCap, title: content.whyItem3Title, desc: content.whyItem3Desc },
  ]
  const testimonials = (rows ?? []).map(r => ({
    name: r.name,
    role: (locale === 'tr' && r.role_tr) ? r.role_tr : (r.role_en ?? ''),
    text: (locale === 'tr' && r.content_tr) ? r.content_tr : (r.content_en ?? ''),
    initials: r.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase(),
  }))

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#3c1117] via-[#5a1a23] to-[#7a2a33] py-24 lg:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(112,33,44,0.52), rgba(195,171,115,0.18)), url('https://rjnbglsmjcuvlbxozbdq.supabase.co/storage/v1/object/public/images/site/about-hero.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(42,10,16,0.86)_0%,rgba(67,18,26,0.74)_42%,rgba(90,26,35,0.48)_72%,rgba(90,26,35,0.2)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(195,171,115,0.24),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(195,171,115,0.14),transparent_28%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl">
            <span className="text-sm font-semibold text-[#e5c98a] uppercase tracking-wider mb-3 block">
              {content.heroLabel}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              {content.heroHeading}
            </h1>
            <p className="text-xl text-white/90 leading-relaxed mb-6">
              {content.heroDescription}
            </p>
            <p className="text-base text-white/75 leading-relaxed">
              {content.heroBody}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <div className="space-y-8">
                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                    <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    {content.missionLabel}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {content.missionText}
                  </p>
                </div>
                <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                    <Globe className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    {content.visionLabel}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {content.visionText}
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { number: content.stat1Number, label: content.stat1Label },
                  { number: content.stat2Number, label: content.stat2Label },
                  { number: content.stat3Number, label: content.stat3Label },
                  { number: content.stat4Number, label: content.stat4Label },
                ].map((stat) => (
                  <GlowCard
                    key={stat.label}
                    glowColor="red"
                    className="bg-gray-50 dark:bg-gray-900 p-5 text-center"
                  >
                    <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</div>
                  </GlowCard>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why LLA */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3 block">
              {content.whyLabel}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              {content.whyHeading}
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              {content.whyDescription}
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {whyItems.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 0.1}>
                <GlowCard glowColor="red" className="bg-white dark:bg-gray-800 p-8 h-full text-center">
                  <div className="w-14 h-14 bg-blue-50 dark:bg-blue-950/50 rounded-2xl flex items-center justify-center mb-5 mx-auto">
                    <item.icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                </GlowCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3 block">
              {content.valuesLabel}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              {content.valuesHeading}
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.08}>
                <GlowCard glowColor="red" className="bg-gray-50 dark:bg-gray-800 p-6 h-full">
                  <div className="w-11 h-11 bg-blue-50 dark:bg-blue-950/50 rounded-xl flex items-center justify-center mb-4">
                    <value.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{value.description}</p>
                </GlowCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3 block">
              {content.testimonialsLabel}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              {content.testimonialsHeading}
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((item, index) => (
              <AnimatedSection key={item.name} delay={index * 0.1}>
                <GlowCard glowColor="red" className="bg-white dark:bg-gray-800 p-8 h-full flex flex-col">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-1 mb-6 italic">
                    &ldquo;{item.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {item.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{item.name}</p>
                      <p className="text-xs text-gray-400">{item.role}</p>
                    </div>
                  </div>
                </GlowCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <CTABanner
              title={content.ctaTitle}
              description={content.ctaDescription}
              primaryButton={{ label: content.ctaPrimary, href: `/${locale}/level-test` }}
              secondaryButton={{ label: content.ctaSecondary, href: `/${locale}/services` }}
              variant="blue"
            />
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
