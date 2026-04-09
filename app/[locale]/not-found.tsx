import Link from 'next/link'
import { Home, Search, BookOpen, Phone } from 'lucide-react'
import { getLocale } from 'next-intl/server'

export default async function NotFound() {
  const locale = await getLocale()

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-950 dark:to-blue-950/20 flex items-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        {/* 404 number */}
        <div className="relative mb-8">
          <p className="text-[120px] md:text-[160px] font-extrabold text-blue-100 dark:text-blue-950 leading-none select-none">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
              <Search className="w-9 h-9 text-white" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Page not found
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let us help you find what you need.
        </p>

        {/* Quick links */}
        <div className="grid sm:grid-cols-3 gap-3 mb-10">
          <Link
            href={`/${locale}`}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          <Link
            href={`/${locale}/services`}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Our Courses
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Contact Us
          </Link>
        </div>

        {/* CTA */}
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl transition-colors shadow-lg"
        >
          <Home className="w-4 h-4" />
          Back to homepage
        </Link>
      </div>
    </div>
  )
}
