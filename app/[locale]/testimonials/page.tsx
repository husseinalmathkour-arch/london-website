import type { Metadata } from 'next'
import AnimatedSection from '@/components/AnimatedSection'
import CTABanner from '@/components/CTABanner'
import ReviewForm from '@/components/ReviewForm'
import { createServiceClient } from '@/lib/supabase'
import { getLocale } from 'next-intl/server'
import { Star, Quote } from 'lucide-react'
import Image from 'next/image'
import { buildPageMetadata } from '@/lib/metadata'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const isTR = locale === 'tr'
  const path = '/testimonials'

  return buildPageMetadata({
    locale,
    path,
    title: isTR
      ? 'Öğrenci Yorumları | London Language Academy Deneyimleri'
      : 'Student Reviews & Testimonials | London Language Academy',
    description: isTR
      ? 'London Language Academy öğrencilerinin gerçek yorumlarını okuyun. İngilizce, IELTS ve diğer dil kurslarında eğitim alan öğrencilerin deneyimlerini inceleyin.'
      : 'Read what our students say about London Language Academy — real reviews from English, IELTS, and language course students from around the world.',
  })
}

export default async function TestimonialsPage() {
  const locale = await getLocale()
  const isTR = locale === 'tr'
  const db = createServiceClient()

  const { data: rows } = await db
    .from('testimonials')
    .select('id,name,role_en,role_tr,content_en,content_tr,avatar_url,rating')
    .eq('published', true)
    .order('sort_order')

  const testimonials = (rows ?? []).map(t => ({
    id: t.id,
    name: t.name,
    role: (isTR && t.role_tr) ? t.role_tr : (t.role_en ?? ''),
    content: (isTR && t.content_tr) ? t.content_tr : (t.content_en ?? ''),
    avatar: t.avatar_url ?? null,
    rating: t.rating ?? 5,
  }))

  const ui = {
    heroLabel: isTR ? 'Öğrenci Yorumları' : 'Student Reviews',
    heroHeading: isTR ? 'Öğrencilerimiz Ne Diyor?' : 'What Our Students Say',
    heroDescription: isTR
      ? 'Dünyadan gelen öğrencilerimizin London Language Academy deneyimlerini okuyun.'
      : 'Read real experiences from our students around the world.',
    noTestimonials: isTR ? 'Henüz yorum yok.' : 'No testimonials yet.',
    ctaTitle: isTR ? 'Siz de Başlayın' : 'Start Your Journey',
    ctaDescription: isTR ? 'Binlerce başarılı öğrenciye katılın.' : 'Join thousands of successful students.',
    ctaPrimary: isTR ? 'Kurslara Bak' : 'Browse Courses',
    ctaSecondary: isTR ? 'Bize Ulaşın' : 'Contact Us',
  }

  const avgRating = testimonials.length
    ? (testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length).toFixed(1)
    : '5.0'

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-950 dark:to-blue-950/20 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3 block">
              {ui.heroLabel}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-5 leading-tight">
              {ui.heroHeading}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {ui.heroDescription}
            </p>

            {/* Rating summary */}
            {testimonials.length > 0 && (
              <div className="inline-flex items-center gap-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl px-6 py-3 shadow-sm">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span className="text-2xl font-extrabold text-gray-900 dark:text-white">{avgRating}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {isTR ? `${testimonials.length} değerlendirme` : `${testimonials.length} reviews`}
                </span>
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials grid */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {testimonials.length === 0 ? (
            <p className="text-center text-gray-400 py-20">{ui.noTestimonials}</p>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {testimonials.map((item, i) => (
                <AnimatedSection key={item.id} delay={i * 0.05} className="break-inside-avoid">
                  <div className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
                    {/* Stars */}
                    <div className="flex mb-4">
                      {[1,2,3,4,5].map(s => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${s <= item.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600'}`}
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <Quote className="w-6 h-6 text-blue-200 dark:text-blue-900 mb-3" />
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-5">
                      {item.content}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                      {item.avatar ? (
                        <Image src={item.avatar} alt={item.name} width={40} height={40} unoptimized className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                          {item.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white text-sm">{item.name}</p>
                        {item.role && <p className="text-xs text-gray-500 dark:text-gray-400">{item.role}</p>}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Submit a review */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <ReviewForm />
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <CTABanner
              title={ui.ctaTitle}
              description={ui.ctaDescription}
              primaryButton={{ label: ui.ctaPrimary, href: `/${locale}/services` }}
              secondaryButton={{ label: ui.ctaSecondary, href: `/${locale}/contact` }}
              variant="blue"
            />
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
