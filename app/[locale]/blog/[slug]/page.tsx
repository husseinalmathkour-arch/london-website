export const revalidate = 3600

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import AnimatedSection from '@/components/AnimatedSection'
import BlogCard from '@/components/BlogCard'
import { BlogPostSchema } from '@/components/JsonLd'
import { createServiceClient } from '@/lib/supabase'
import { getLocale } from 'next-intl/server'
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react'
import { getLocaleAlternates, withSiteUrl } from '@/lib/site-url'

interface Props {
  params: { slug: string; locale: string }
}

export async function generateStaticParams() {
  const db = createServiceClient()
  const { data } = await db.from('blog_posts').select('slug').eq('published', true)
  return (data ?? []).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const db = createServiceClient()
  const { data } = await db
    .from('blog_posts')
    .select('title_en,title_tr,excerpt_en,excerpt_tr')
    .eq('slug', params.slug)
    .single()
  if (!data) return { title: 'Post Not Found' }
  const locale = params.locale
  const title = (locale === 'tr' && data.title_tr) ? data.title_tr : data.title_en
  const description = (locale === 'tr' && data.excerpt_tr) ? data.excerpt_tr : (data.excerpt_en ?? '')
  return {
    title,
    description,
    alternates: {
      canonical: withSiteUrl(`/${locale}/blog/${params.slug}`),
      languages: getLocaleAlternates(`/blog/${params.slug}`),
    },
    openGraph: {
      title,
      description,
      url: withSiteUrl(`/${locale}/blog/${params.slug}`),
      type: 'article',
    },
  }
}

function renderMarkdown(content: string): React.ReactNode[] {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
          {line.slice(3)}
        </h2>
      )
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(
        <p key={i} className="font-bold text-gray-900 dark:text-white mb-2">
          {line.slice(2, -2)}
        </p>
      )
    } else if (line.startsWith('- ')) {
      const listItems: string[] = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        listItems.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc list-inside space-y-1.5 mb-4 text-gray-600 dark:text-gray-300">
          {listItems.map((item, j) => (
            <li key={j} className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          ))}
        </ul>
      )
      continue
    } else if (/^\d+\.\s/.test(line)) {
      const listItems: string[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\d+\.\s/, ''))
        i++
      }
      elements.push(
        <ol key={`ol-${i}`} className="list-decimal list-inside space-y-1.5 mb-4 text-gray-600 dark:text-gray-300">
          {listItems.map((item, j) => (
            <li key={j} className="text-sm leading-relaxed">{item}</li>
          ))}
        </ol>
      )
      continue
    } else if (line.trim() === '') {
      // skip empty lines
    } else {
      elements.push(
        <p key={i} className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-base">
          {line}
        </p>
      )
    }

    i++
  }

  return elements
}

export default async function BlogPostPage({ params }: Props) {
  const locale = await getLocale()
  const db = createServiceClient()

  const { data: row } = await db
    .from('blog_posts')
    .select('id,slug,title_en,title_tr,excerpt_en,excerpt_tr,content_en,content_tr,author,category,image_url,created_at')
    .eq('slug', params.slug)
    .single()

  if (!row) notFound()

  const post = {
    id: row.id,
    slug: row.slug,
    title: (locale === 'tr' && row.title_tr) ? row.title_tr : row.title_en,
    excerpt: (locale === 'tr' && row.excerpt_tr) ? row.excerpt_tr : (row.excerpt_en ?? ''),
    content: (locale === 'tr' && row.content_tr) ? row.content_tr : (row.content_en ?? ''),
    author: row.author ?? '',
    category: row.category ?? '',
    image: row.image_url ?? 'https://rjnbglsmjcuvlbxozbdq.supabase.co/storage/v1/object/public/images/blog/science-learning.jpg',
    date: row.created_at,
    tags: [] as string[],
  }

  // Fetch related posts
  const { data: relatedRows } = await db
    .from('blog_posts')
    .select('id,slug,title_en,title_tr,excerpt_en,excerpt_tr,image_url,category,author,created_at')
    .eq('published', true)
    .neq('id', row.id)
    .limit(3)

  const suggestions = (relatedRows ?? []).map(p => ({
    id: p.id,
    slug: p.slug,
    title: (locale === 'tr' && p.title_tr) ? p.title_tr : p.title_en,
    excerpt: (locale === 'tr' && p.excerpt_tr) ? p.excerpt_tr : (p.excerpt_en ?? ''),
    content: '',
    author: p.author ?? '',
    authorRole: '',
    date: p.created_at,
    readTime: '',
    category: p.category ?? '',
    image: p.image_url ?? 'https://rjnbglsmjcuvlbxozbdq.supabase.co/storage/v1/object/public/images/blog/science-learning.jpg',
    tags: [] as string[],
  }))

  const schema = (
    <BlogPostSchema
      title={post.title}
      description={post.excerpt}
      slug={post.slug}
      date={post.date}
      author={post.author}
      image={post.image}
      locale={locale}
    />
  )

  const formattedDate = new Date(post.date).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const ui = locale === 'tr' ? {
    backToBlog: 'Bloga Dön',
    readyToLearn: 'Öğrenmeye Hazır mısın?',
    ctaBody: 'Kurslarımıza göz atın veya seviye testini çözün.',
    browseCourses: 'Kurslara Bak',
    levelTest: 'Seviye Testi',
    categories: 'Kategoriler',
    categoryLabels: { 'Exam Tips': 'Sınav İpuçları', 'Career': 'Kariyer', 'Learning Science': 'Öğrenme Bilimi', 'Student Life': 'Öğrenci Hayatı', 'Study Abroad': 'Yurt Dışında Eğitim' },
    authorBio: 'London Language Academy akademik ekibinin bir üyesi. Öğrencilerin dil hedeflerine ulaşmalarına yardımcı olmaya adanmıştır.',
    moreArticles: 'Daha Fazla Makale',
    readMore: 'Devamını Oku',
  } : {
    backToBlog: 'Back to Blog',
    readyToLearn: 'Ready to Learn?',
    ctaBody: 'Turn insight into action. Browse our courses or take the level test.',
    browseCourses: 'Browse Courses',
    levelTest: 'Level Test',
    categories: 'Categories',
    categoryLabels: { 'Exam Tips': 'Exam Tips', 'Career': 'Career', 'Learning Science': 'Learning Science', 'Student Life': 'Student Life', 'Study Abroad': 'Study Abroad' },
    authorBio: 'A member of the London Language Academy academic team, dedicated to sharing expertise and helping students achieve their language goals.',
    moreArticles: 'More Articles',
    readMore: 'Read More',
  }

  return (
    <div className="pt-20">
      {schema}
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-950 dark:to-blue-950/20 py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> {ui.backToBlog}
            </Link>

            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500 dark:text-gray-400 pb-8 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                  {post.author.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white text-sm">{post.author}</span>
                </div>
              </div>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> {formattedDate}
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Cover image */}
      {post.image && (
        <div className="relative w-full h-72 md:h-[480px] overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      )}

      {/* Article */}
      <section className="py-14 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-10">
            {/* Content */}
            <AnimatedSection className="lg:col-span-3">
              <div className="prose-custom">
                {renderMarkdown(post.content)}
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag className="w-4 h-4 text-gray-400" />
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Author card */}
              <div className="mt-10 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-base flex-shrink-0">
                  {post.author.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white mb-0.5">{post.author}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {ui.authorBio}
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Sidebar */}
            <AnimatedSection direction="right" className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* CTA */}
                <div className="bg-blue-600 rounded-2xl p-6 text-white">
                  <h3 className="font-bold mb-2">{ui.readyToLearn}</h3>
                  <p className="text-blue-100 text-sm mb-4 leading-relaxed">{ui.ctaBody}</p>
                  <Link
                    href={`/${locale}/services`}
                    className="block text-center bg-white text-blue-600 font-semibold text-sm py-2.5 rounded-xl hover:bg-blue-50 transition-colors mb-2"
                  >
                    {ui.browseCourses}
                  </Link>
                  <Link
                    href={`/${locale}/level-test`}
                    className="block text-center border border-white/30 text-white font-semibold text-sm py-2.5 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    {ui.levelTest}
                  </Link>
                </div>

                {/* Categories */}
                <div className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">{ui.categories}</h3>
                  <div className="space-y-1">
                    {Object.entries(ui.categoryLabels).map(([, label]) => (
                      <Link
                        key={label}
                        href={`/${locale}/blog`}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-1 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {suggestions.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{ui.moreArticles}</h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-3 gap-6">
              {suggestions.map((p, index) => (
                <AnimatedSection key={p.id} delay={index * 0.1}>
                  <BlogCard post={p} readMoreLabel={ui.readMore} href={`/${locale}/blog/${p.slug}`} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
