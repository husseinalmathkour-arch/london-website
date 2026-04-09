'use client'

import { useState } from 'react'
import AnimatedSection from '@/components/AnimatedSection'
import BlogCard from '@/components/BlogCard'
import { useLocale } from 'next-intl'

interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  authorRole: string
  date: string
  readTime: string
  categoryValue: string
  category: string
  image: string
  tags: string[]
}

interface Category {
  label: string
  value: string // English DB value, or 'all'
}

interface Props {
  posts: Post[]
  categories: Category[]
  featuredLabel: string
  readMoreLabel: string
  hrefPrefix?: string
}

export default function BlogFilteredList({ posts, categories, featuredLabel, readMoreLabel, hrefPrefix = '/blog' }: Props) {
  const locale = useLocale()
  const [active, setActive] = useState('all')

  const filtered = active === 'all' ? posts : posts.filter(p => p.categoryValue === active)
  const featured = filtered[0] ?? null
  const rest = filtered.slice(1)

  return (
    <>
      {/* Category filter */}
      <section className="py-4 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActive(cat.value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  active === cat.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                {featuredLabel}
              </h2>
            </div>
            <BlogCard post={featured} featured readMoreLabel={readMoreLabel} href={`${hrefPrefix}/${featured.slug}`} />
          </div>
        </section>
      )}

      {/* Posts grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {rest.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post, index) => (
                <AnimatedSection key={post.id} delay={index * 0.08}>
                  <BlogCard post={post} readMoreLabel={readMoreLabel} href={`${hrefPrefix}/${post.slug}`} />
                </AnimatedSection>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-16">
              {locale === 'tr' ? 'Bu kategoride yazı bulunamadı.' : 'No posts found in this category.'}
            </p>
          ) : null}
        </div>
      </section>
    </>
  )
}
