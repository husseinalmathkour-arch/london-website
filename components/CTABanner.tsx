import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

interface CTABannerProps {
  title: string
  description: string
  primaryButton: { label: string; href: string }
  secondaryButton?: { label: string; href: string }
  variant?: 'blue' | 'dark' | 'light'
}

export default function CTABanner({
  title,
  description,
  primaryButton,
  secondaryButton,
  variant = 'blue',
}: CTABannerProps) {
  if (variant === 'blue') {
    return (
      <div className="relative rounded-3xl overflow-hidden" style={{ backgroundColor: '#70212c' }}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c3ab73' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* Gold glow blobs */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-20" style={{ backgroundColor: '#c3ab73' }} />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl opacity-10" style={{ backgroundColor: '#c3ab73' }} />

        <div className="relative z-10 px-8 py-14 md:px-16 md:py-20">
          <div className="max-w-3xl mx-auto">
            {/* Top badge */}
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold border" style={{ borderColor: 'rgba(195,171,115,0.4)', color: '#c3ab73', backgroundColor: 'rgba(195,171,115,0.1)' }}>
                <Sparkles className="w-3.5 h-3.5" />
                London Language Academy
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-5 leading-tight">
              {title}
            </h2>
            <p className="text-center text-base md:text-lg mb-10 leading-relaxed max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={primaryButton.href}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-base transition-all hover:scale-105 shadow-lg"
                style={{ backgroundColor: '#c3ab73', color: '#3a1a1f' }}
              >
                {primaryButton.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
              {secondaryButton && (
                <Link
                  href={secondaryButton.href}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base transition-all hover:bg-white/10 border"
                  style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.9)' }}
                >
                  {secondaryButton.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const bgClass = variant === 'dark'
    ? 'bg-gray-950 text-white'
    : 'bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800'

  const primaryBtn = variant === 'dark'
    ? 'bg-blue-600 text-white hover:bg-blue-700'
    : 'bg-blue-600 text-white hover:bg-blue-700'

  const secondaryBtn = variant === 'dark'
    ? 'border border-gray-700 text-gray-300 hover:bg-gray-800'
    : 'border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'

  return (
    <div className={`rounded-3xl px-8 py-14 md:px-16 md:py-20 text-center ${bgClass}`}>
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">{title}</h2>
      <p className={`text-base md:text-lg mb-8 leading-relaxed max-w-xl mx-auto ${variant === 'dark' ? 'text-gray-400' : 'text-gray-600 dark:text-gray-400'}`}>
        {description}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href={primaryButton.href} className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base transition-colors ${primaryBtn}`}>
          {primaryButton.label} <ArrowRight className="w-4 h-4" />
        </Link>
        {secondaryButton && (
          <Link href={secondaryButton.href} className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base transition-colors ${secondaryBtn}`}>
            {secondaryButton.label}
          </Link>
        )}
      </div>
    </div>
  )
}
