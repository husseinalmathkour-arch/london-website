import HeroSection from '@/components/HeroSection'
import { GlowCard } from '@/components/ui/spotlight-card'
import { TestimonialsColumn } from '@/components/ui/testimonials-columns-1'
import type { TestimonialItem } from '@/components/ui/testimonials-columns-1'
import AnimatedSection from '@/components/AnimatedSection'
import AnimatedStats from '@/components/AnimatedStats'
import ServiceCard from '@/components/ServiceCard'
import LanguageCard from '@/components/LanguageCard'
import ReviewForm from '@/components/ReviewForm'
import CTABanner from '@/components/CTABanner'
import Link from 'next/link'
import {
  Users, Globe, Star, Award, BookOpen, Target, Headphones,
  TrendingUp, Clock, Shield, CheckCircle, ArrowRight, Plane,
  Trophy, HeartHandshake, GraduationCap, Smile, Music4,
  Gamepad2, MessageSquareText,
} from 'lucide-react'
import { getTranslations, getLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/metadata'
import { getHomePageData } from '@/lib/public-data'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  if (locale === 'tr') {
    return buildPageMetadata({
      locale,
      path: '',
      title: 'London Language Academy — Londra\'da Dil Kursları',
      description: 'Londra\'nın kalbinde dünya standartlarında dil kursları. İngilizce, Fransızca, İspanyolca, Almanca ve daha fazlası. IELTS, Cambridge ve İş İngilizcesi uzmanları.',
    })
  }
  return buildPageMetadata({
    locale,
    path: '',
    title: 'London Language Academy — Expert Language Courses in Central London',
    description: 'London Language Academy offers world-class language courses in Central London. English, French, Spanish, German, Italian and more. IELTS, Cambridge, and Business Language specialists.',
  })
}

export default async function HomePage() {
  const t = await getTranslations('home')
  const tc = await getTranslations('commitment')
  const tk = await getTranslations('kids')
  const tRaw = await getTranslations()
  const locale = await getLocale()
  const { testimonialsRows, courseRows, langRows } = await getHomePageData()

  const testimonials: TestimonialItem[] = (testimonialsRows ?? []).map(r => ({
    name: r.name,
    role: (locale === 'tr' && r.role_tr) ? r.role_tr : (r.role_en ?? ''),
    image: r.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}&background=70212c&color=fff&size=80`,
    text: (locale === 'tr' && r.content_tr) ? r.content_tr : (r.content_en ?? ''),
    rating: r.rating ?? 5,
  }))
  const dbCourses = (courseRows ?? []).map(c => ({
    id: c.id,
    title: (locale === 'tr' && c.title_tr) ? c.title_tr : c.title_en,
    description: (locale === 'tr' && c.description_tr) ? c.description_tr : (c.description_en ?? ''),
    features: ((locale === 'tr' && c.features_tr?.length) ? c.features_tr : c.features_en) ?? [],
    price: c.price ?? '',
    icon: 'BookOpen',
    popular: c.popular,
  }))
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

  const whyChooseUs = [
    {
      icon: Target,
      title: t('whyChoose.resultsFocused.title'),
      description: t('whyChoose.resultsFocused.description'),
    },
    {
      icon: Users,
      title: t('whyChoose.expertTeachers.title'),
      description: t('whyChoose.expertTeachers.description'),
    },
    {
      icon: Headphones,
      title: t('whyChoose.smallClasses.title'),
      description: t('whyChoose.smallClasses.description'),
    },
    {
      icon: BookOpen,
      title: t('whyChoose.modernCurriculum.title'),
      description: t('whyChoose.modernCurriculum.description'),
    },
    {
      icon: Clock,
      title: t('whyChoose.flexibleScheduling.title'),
      description: t('whyChoose.flexibleScheduling.description'),
    },
    {
      icon: Shield,
      title: t('whyChoose.accredited.title'),
      description: t('whyChoose.accredited.description'),
    },
  ]

  return (
    <>
      <HeroSection />

      {/* Stats section */}
      <AnimatedStats />

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3 block">
              {t('statsSection')}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              {t('whyChooseHeading')}
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              {t('whyChooseBody')}
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 0.08}>
                <GlowCard glowColor="red" className="h-full bg-gray-50 dark:bg-gray-900 p-6">
                  <div className="w-11 h-11 bg-blue-50 dark:bg-blue-950/60 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.description}</p>
                </GlowCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Courses / Services */}
      <section className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3 block">
              {t('coursesLabel')}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              {t('coursesHeading')}
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              {t('coursesBody')}
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dbCourses.map((course, index) => (
              <AnimatedSection key={course.id} delay={index * 0.08}>
                <ServiceCard
                  service={course}
                  enquireLabel={tRaw.raw('serviceCards.enquireNow') as string}
                  popularLabel={tRaw.raw('serviceCards.mostPopular') as string}
                  detailHref={`/${locale}/courses/${course.id}`}
                  enquireHref={`/${locale}/contact?service=${course.id}`}
                  learnMoreLabel={locale === 'tr' ? 'Detaylar' : 'Learn More'}
                />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-10">
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all"
            >
              {t('viewAllCourses')} <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Languages Grid */}
      <section className="py-20 lg:py-28 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3 block">
              {t('languagesLabel')}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              {t('languagesHeading')}
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              {t('languagesBody')}
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {languages.map((lang, index) => (
              <AnimatedSection key={lang.id} delay={index * 0.07}>
                <LanguageCard language={lang} href={`/${locale}/languages`} />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-10">
            <Link
              href={`/${locale}/languages`}
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all"
            >
              {t('seeAllLanguages')} <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Success Guarantee + Lifetime Support */}
      <section className="py-20 lg:py-28 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-sm font-semibold uppercase tracking-wider mb-3 block" style={{ color: '#c3ab73' }}>
              {tc('label')}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              {tc('heading')}
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              {tc('body')}
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Success Guarantee */}
            <AnimatedSection delay={0.1}>
              <div className="relative rounded-3xl p-8 md:p-10 overflow-hidden border-2 h-full" style={{ borderColor: '#c3ab73', backgroundColor: 'rgba(195,171,115,0.04)' }}>
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-5" style={{ backgroundColor: '#c3ab73', transform: 'translate(30%, -30%)' }} />
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: '#70212c' }}>
                  <Trophy className="w-7 h-7 text-white" />
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4 text-white" style={{ backgroundColor: '#70212c' }}>
                  {tc('guaranteeBadge')}
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4">
                  {tc('guaranteeHeading')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {tc('guaranteeBody')}
                </p>
                <ul className="space-y-3">
                  {(tRaw.raw('commitment.guaranteeItems') as string[]).map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#c3ab73' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            {/* Lifetime Learning Support */}
            <AnimatedSection delay={0.2}>
              <div className="relative rounded-3xl p-8 md:p-10 overflow-hidden border-2 h-full" style={{ borderColor: '#c3ab73', backgroundColor: 'rgba(195,171,115,0.04)' }}>
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-5" style={{ backgroundColor: '#c3ab73', transform: 'translate(30%, -30%)' }} />
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: '#c3ab73' }}>
                  <HeartHandshake className="w-7 h-7 text-white" />
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4 text-white" style={{ backgroundColor: '#c3ab73' }}>
                  {tc('lifetimeBadge')}
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4">
                  {tc('lifetimeHeading')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {tc('lifetimeBody')}
                </p>
                <ul className="space-y-3">
                  {(tRaw.raw('commitment.lifetimeItems') as string[]).map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#c3ab73' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Kids Education */}
      <section className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="text-sm font-semibold uppercase tracking-wider mb-3 block" style={{ color: '#c3ab73' }}>
                {tk('label')}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-5 leading-tight">
                {tk('heading')} <span style={{ color: '#70212c' }}>{tk('headingHighlight')}</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                {tk('body')}
              </p>
              <ul className="space-y-4 mb-8">
                {(tRaw.raw('kids.features') as Array<{ title: string; desc: string }>).map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#70212c' }}>
                      <Smile className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{item.title}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                href={`/${locale}/contact?service=kids`}
                className="inline-flex items-center gap-2 px-7 py-3.5 text-white font-semibold rounded-xl transition-colors"
                style={{ backgroundColor: '#70212c' }}
              >
                <GraduationCap className="w-5 h-5" />
                {tk('enrollButton')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {(tRaw.raw('kids.activities') as string[]).map((label, i) => {
                  const icons = [BookOpen, Music4, Gamepad2, Trophy, MessageSquareText, Plane]
                  const Icon = icons[i] || Star
                  return (
                    <GlowCard key={label} glowColor="red" className="bg-gray-50 dark:bg-gray-800 p-5 flex flex-col items-center justify-center text-center gap-2">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#70212c]/8 text-[#70212c] dark:bg-[#c3ab73]/12 dark:text-[#e5c98a]">
                        <Icon className="h-8 w-8" strokeWidth={1.8} />
                      </div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{label}</p>
                    </GlowCard>
                  )
                })}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28 bg-white dark:bg-gray-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3 block">
              {t('testimonialsLabel')}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              {t('testimonialsHeading')}
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              {t('testimonialsBody')}
            </p>
          </AnimatedSection>

          {(() => {
            const rotate = <T,>(arr: T[], n: number) => [...arr.slice(n), ...arr.slice(0, n)]
            return (
              <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[680px] overflow-hidden">
                <TestimonialsColumn testimonials={testimonials} duration={18} />
                <TestimonialsColumn testimonials={rotate(testimonials, 2)} className="hidden md:block" duration={26} />
                <TestimonialsColumn testimonials={rotate(testimonials, 4)} className="hidden lg:block" duration={22} />
              </div>
            )
          })()}
        </div>
      </section>

      {/* Leave a Review */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <ReviewForm />
          </AnimatedSection>
        </div>
      </section>

      {/* Study Abroad Promo */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-gradient-to-br from-indigo-600 via-blue-700 to-blue-900 rounded-3xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-10 md:p-14">
                  <div className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
                    <Plane className="w-4 h-4" />
                    {t('studyAbroadLabel')}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                    {t('studyAbroadHeading')}
                  </h2>
                  <p className="text-blue-100 text-base leading-relaxed mb-8">
                    {t('studyAbroadBody')}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {['Barcelona', 'Paris', 'Berlin', 'Rome'].map((city) => (
                      <div key={city} className="flex items-center gap-2 text-blue-100 text-sm">
                        <CheckCircle className="w-4 h-4 text-blue-300 flex-shrink-0" />
                        {city}
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/${locale}/study-abroad`}
                    className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
                  >
                    {t('exploreProgrammes')} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="hidden lg:block relative min-h-full">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, rgba(112,33,44,0.25), rgba(112,33,44,0.55)), url('https://rjnbglsmjcuvlbxozbdq.supabase.co/storage/v1/object/public/images/site/cta-background.jpg')",
                    }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(195,171,115,0.28),transparent_45%)]" />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <CTABanner
              title={t('ctaTitle')}
              description={t('ctaDescription')}
              primaryButton={{ label: t('ctaPrimary'), href: `/${locale}/contact?service=General Enquiry` }}
              secondaryButton={{ label: t('ctaSecondary'), href: `/${locale}/level-test` }}
              variant="blue"
            />
          </AnimatedSection>
        </div>
      </section>

    </>
  )
}
