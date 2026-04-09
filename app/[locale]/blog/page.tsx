import type { Metadata } from 'next'
import AnimatedSection from '@/components/AnimatedSection'
import BlogFilteredList from '@/components/BlogFilteredList'
import { createServiceClient } from '@/lib/supabase'
import { getTranslations, getLocale } from 'next-intl/server'
import { buildPageMetadata } from '@/lib/metadata'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const isTR = locale === 'tr'
  const path = '/blog'

  return buildPageMetadata({
    locale,
    path,
    title: isTR
      ? 'Blog | Dil Öğrenme İpuçları, IELTS Rehberleri ve Daha Fazlası'
      : 'Blog | Language Learning Tips, IELTS Guides & More',
    description: isTR
      ? 'Dil öğrenme ipuçları, IELTS ve Cambridge sınav rehberleri, yurt dışı eğitim önerileri, Londra öğrenci yaşamı ve London Language Academy’den en güncel içerikler.'
      : 'Language learning tips, IELTS and Cambridge exam guides, study abroad advice, student life in London, and the latest news from London Language Academy.',
  })
}

export default async function BlogPage() {
  const t = await getTranslations('blog')
  const locale = await getLocale()
  const categoryLabels: Record<string, string> = {
    'Exam Tips': t('categories.examTips'),
    'Career': t('categories.career'),
    'Learning Science': t('categories.learningScience'),
    'Student Life': t('categories.studentLife'),
    'Study Abroad': t('categories.studyAbroad'),
  }

  const db = createServiceClient()
  const { data: rows } = await db
    .from('blog_posts')
    .select('id,slug,title_en,title_tr,excerpt_en,excerpt_tr,image_url,category,author,created_at')
    .eq('published', true)
    .order('created_at', { ascending: false })

  const translatedPosts = (rows ?? []).map(p => ({
    id: p.id,
    slug: p.slug,
    title: (locale === 'tr' && p.title_tr) ? p.title_tr : p.title_en,
    excerpt: (locale === 'tr' && p.excerpt_tr) ? p.excerpt_tr : (p.excerpt_en ?? ''),
    content: '',
    author: p.author ?? '',
    authorRole: '',
    date: p.created_at,
    readTime: '',
    categoryValue: p.category ?? '',
    category: categoryLabels[p.category ?? ''] ?? (p.category ?? ''),
    image: p.image_url ?? 'https://rjnbglsmjcuvlbxozbdq.supabase.co/storage/v1/object/public/images/blog/science-learning.jpg',
    tags: [] as string[],
  }))

  const categories = [
    { label: t('categories.all'),           value: 'all' },
    { label: t('categories.examTips'),      value: 'Exam Tips' },
    { label: t('categories.career'),        value: 'Career' },
    { label: t('categories.learningScience'), value: 'Learning Science' },
    { label: t('categories.studentLife'),   value: 'Student Life' },
    { label: t('categories.studyAbroad'),   value: 'Study Abroad' },
  ]

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-950 dark:to-blue-950/20 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3 block">
              {t('heroLabel')}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-5 leading-tight">
              {t('heroHeading')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              {t('heroDescription')}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <BlogFilteredList
        posts={translatedPosts}
        categories={categories}
        featuredLabel={t('featuredArticle')}
        readMoreLabel={t('readMore')}
        hrefPrefix={`/${locale}/blog`}
      />

    </div>
  )
}
