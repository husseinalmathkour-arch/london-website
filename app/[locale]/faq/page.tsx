import type { Metadata } from 'next'
import AnimatedSection from '@/components/AnimatedSection'
import FAQItem from '@/components/FAQItem'
import CTABanner from '@/components/CTABanner'
import { FaqSchema } from '@/components/JsonLd'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { getTranslations, getLocale } from 'next-intl/server'
import { createServiceClient } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'FAQ | Language Course Questions Answered',
  description: 'Frequently asked questions about London Language Academy — course levels, admissions, fees, visas, IELTS preparation, study abroad, and more. Get the answers you need.',
}

const categoryKeys = ['General', 'Courses', 'Teachers', 'Study Abroad']

export default async function FAQPage() {
  const t = await getTranslations('faq')
  const tRaw = await getTranslations()
  const categoryLabels = tRaw.raw('faq.categoryLabels') as Record<string, string>
  const locale = await getLocale()

  const db = createServiceClient()
  const { data: rows } = await db
    .from('faqs')
    .select('id,question_en,question_tr,answer_en,answer_tr,category')
    .eq('published', true)
    .order('sort_order')

  const faqItems = (rows ?? []).map(r => ({
    id: r.id,
    question: (locale === 'tr' && r.question_tr) ? r.question_tr : r.question_en,
    answer: (locale === 'tr' && r.answer_tr) ? r.answer_tr : (r.answer_en ?? ''),
    category: r.category ?? 'General',
  }))

  const grouped = categoryKeys.reduce<Record<string, typeof faqItems>>((acc, cat) => {
    acc[cat] = faqItems.filter((item) => item.category === cat)
    return acc
  }, {})

  return (
    <div className="pt-20">
      <FaqSchema items={faqItems.map(i => ({ question: i.question, answer: i.answer }))} />
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-950 dark:to-blue-950/20 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3 block">
              {t('heroLabel')}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-5 leading-tight">
              {t('heroHeading')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('heroDescription')}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ content */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {Object.entries(grouped)
            .filter(([, items]) => items.length > 0)
            .map(([category, items], groupIndex) => (
              <AnimatedSection key={category} delay={groupIndex * 0.05} className="mb-12">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                  <span className="w-1 h-5 bg-blue-600 rounded-full inline-block" />
                  {categoryLabels[category] ?? category}
                </h2>
                <div className="space-y-3">
                  {items.map((item, i) => (
                    <AnimatedSection key={item.id} delay={groupIndex * 0.05 + i * 0.04}>
                      <FAQItem item={item} />
                    </AnimatedSection>
                  ))}
                </div>
              </AnimatedSection>
            ))}

          {/* Can't find answer */}
          <AnimatedSection>
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-8 text-center">
              <MessageCircle className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {t('stillHaveQuestion')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 max-w-md mx-auto">
                {t('stillHaveQuestionBody')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href={`/${locale}/contact?service=General Enquiry`}
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
                >
                  {t('contactUs')}
                </Link>
                <a
                  href="tel:+442012345678"
                  className="inline-flex items-center justify-center gap-2 border border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors text-sm"
                >
                  {t('callUs')}
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Topics shortcuts */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('browseByTopic')}
            </h2>
          </AnimatedSection>
          <AnimatedSection>
            <div className="flex flex-wrap justify-center gap-2">
              {categoryKeys.map((cat) => (
                <span
                  key={cat}
                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300 rounded-full hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {categoryLabels[cat] ?? cat}
                </span>
              ))}
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
              primaryButton={{ label: t('ctaPrimary'), href: `/${locale}/services` }}
              secondaryButton={{ label: t('ctaSecondary'), href: `/${locale}/contact?service=General Enquiry` }}
              variant="blue"
            />
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
