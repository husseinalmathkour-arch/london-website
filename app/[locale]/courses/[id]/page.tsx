import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import AnimatedSection from '@/components/AnimatedSection'
import { createServiceClient } from '@/lib/supabase'
import { getLocale } from 'next-intl/server'
import { CheckCircle, Clock, Users, Award, ArrowLeft, Send, BookOpen, GraduationCap } from 'lucide-react'
import { getLocaleAlternates, withSiteUrl } from '@/lib/site-url'

interface Props {
  params: { id: string; locale: string }
}

export async function generateStaticParams() {
  const db = createServiceClient()
  const { data } = await db.from('courses').select('id').eq('published', true)
  return (data ?? []).map(c => ({ id: c.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const db = createServiceClient()
  const { data } = await db.from('courses').select('title_en,title_tr,description_en,description_tr').eq('id', params.id).single()
  if (!data) return { title: 'Course Not Found' }
  const locale = params.locale
  const title = (locale === 'tr' && data.title_tr) ? data.title_tr : data.title_en
  const description = (locale === 'tr' && data.description_tr) ? data.description_tr : (data.description_en ?? '')
  return {
    title: `${title} | London Language Academy`,
    description,
    alternates: {
      canonical: withSiteUrl(`/${locale}/courses/${params.id}`),
      languages: getLocaleAlternates(`/courses/${params.id}`),
    },
    openGraph: {
      title,
      description,
      url: withSiteUrl(`/${locale}/courses/${params.id}`),
      type: 'website',
    },
  }
}

export default async function CourseDetailPage({ params }: Props) {
  const locale = await getLocale()
  const db = createServiceClient()

  const { data: row } = await db
    .from('courses')
    .select('*')
    .eq('id', params.id)
    .eq('published', true)
    .single()

  if (!row) notFound()

  const course = {
    title: (locale === 'tr' && row.title_tr) ? row.title_tr : row.title_en,
    description: (locale === 'tr' && row.description_tr) ? row.description_tr : (row.description_en ?? ''),
    features: ((locale === 'tr' && row.features_tr?.length) ? row.features_tr : row.features_en) ?? [],
    levels: ((locale === 'tr' && row.levels_tr?.length) ? row.levels_tr : (row.levels_en ?? [])) as { name: string; description: string }[],
    price: row.price ?? '',
    duration: row.duration ?? '',
    level: row.level ?? '',
    class_size: row.class_size ?? '',
    category: row.category ?? '',
    image: row.image_url ?? null,
    popular: row.popular,
  }

  const isTR = locale === 'tr'
  const ui = {
    backToCourses: isTR ? 'Kurslara Dön' : 'Back to Courses',
    whatsIncluded: isTR ? 'Bu Kursa Dahil Olanlar' : "What's Included",
    courseDetails: isTR ? 'Kurs Detayları' : 'Course Details',
    duration: isTR ? 'Süre' : 'Duration',
    level: isTR ? 'Seviye' : 'Level',
    category: isTR ? 'Kategori' : 'Category',
    price: isTR ? 'Ücret' : 'Price',
    classSize: isTR ? 'Sınıf Mevcudu' : 'Class Size',
    courseLevels: isTR ? 'Kurs Seviyeleri' : 'Course Levels',
    enquireNow: isTR ? 'Bilgi Al' : 'Enquire Now',
    startLearning: isTR ? 'Öğrenmeye Başla' : 'Start Learning',
    popular: isTR ? 'En Popüler' : 'Most Popular',
    readyToStart: isTR ? 'Başlamaya Hazır mısın?' : 'Ready to Start?',
    readyBody: isTR ? 'Bugün bize ulaşın, size en uygun programı birlikte belirleyelim.' : 'Contact us today and we\'ll help you find the right programme for your goals.',
    freePlacement: isTR ? 'Ücretsiz Seviye Testi' : 'Free Placement Test',
    freePlacementDesc: isTR ? 'Hangi seviyeye başlayacağınızdan emin değil misiniz? Ücretsiz seviye testimizi çözün.' : 'Not sure which level to start at? Take our free placement test.',
    takeTest: isTR ? 'Testi Çöz' : 'Take the Test',
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-950 dark:to-blue-950/20 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> {ui.backToCourses}
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                {course.popular && (
                  <span className="inline-block bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full mb-4">
                    {ui.popular}
                  </span>
                )}
                {course.category && (
                  <span className="inline-block bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-xs font-semibold px-3 py-1 rounded-full mb-4 ml-2">
                    {course.category}
                  </span>
                )}
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-5 leading-tight">
                  {course.title}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                  {course.description}
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  {course.duration && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      {course.duration}
                    </div>
                  )}
                  {course.level && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2">
                      <Award className="w-4 h-4 text-blue-500" />
                      {course.level}
                    </div>
                  )}
                  {course.price && (
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2">
                      {course.price}
                    </div>
                  )}
                  {course.class_size && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      {ui.classSize}: {isTR ? `Maks. ${course.class_size}` : `Max. ${course.class_size}`}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/${locale}/contact?service=${encodeURIComponent(course.title)}`}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-blue-500/20"
                  >
                    <Send className="w-4 h-4" /> {ui.enquireNow}
                  </Link>
                  <Link
                    href={`/${locale}/level-test`}
                    className="inline-flex items-center gap-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <BookOpen className="w-4 h-4" /> {ui.freePlacement}
                  </Link>
                </div>
              </div>

              {/* Image or placeholder */}
              <div className="relative h-72 lg:h-96 rounded-2xl overflow-hidden">
                {course.image ? (
                  <Image src={course.image} alt={course.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
                    <BookOpen className="w-20 h-20 text-white/30" />
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features */}
      {course.features.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-8">{ui.whatsIncluded}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {course.features.map((feature: string) => (
                  <div key={feature} className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Course Levels */}
      {course.levels.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-8">{ui.courseLevels}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {course.levels.map((lvl, i) => (
                  <div key={i} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">{lvl.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{lvl.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">{ui.readyToStart}</h2>
              <p className="text-blue-100 mb-8 leading-relaxed">{ui.readyBody}</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href={`/${locale}/contact?service=${encodeURIComponent(course.title)}`}
                  className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
                >
                  <Send className="w-4 h-4" /> {ui.enquireNow}
                </Link>
                <Link
                  href={`/${locale}/level-test`}
                  className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <BookOpen className="w-4 h-4" /> {ui.takeTest}
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
