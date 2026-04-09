import { BookOpen, Award, Briefcase, User, Monitor, Zap, Check } from 'lucide-react'
import Link from 'next/link'
import type { Service } from '@/lib/data'
import { GlowCard } from '@/components/ui/spotlight-card'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Award,
  Briefcase,
  User,
  Monitor,
  Zap,
}

interface ServiceCardProps {
  service: Service
  featured?: boolean
  enquireLabel?: string
  popularLabel?: string
  showPrice?: boolean
  detailHref?: string
  enquireHref?: string
  learnMoreLabel?: string
}

export default function ServiceCard({ service, featured = false, enquireLabel = 'Enquire Now', popularLabel = 'Most Popular', showPrice = false, detailHref, enquireHref, learnMoreLabel = 'Learn More' }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || BookOpen
  const contactHref = enquireHref ?? `/contact?service=${service.id}`

  if (service.popular) {
    return (
      <div
        className={`relative rounded-2xl p-7 flex flex-col h-full bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-400 ${featured ? 'lg:col-span-1' : ''}`}
      >
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
            {popularLabel}
          </span>
        </div>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-white/20 text-white">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold mb-2 text-white">{service.title}</h3>
        <p className="text-sm leading-relaxed mb-5 text-blue-100">{service.description}</p>
        <ul className="space-y-2.5 mb-6 flex-1">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2.5 text-sm">
              <Check className="w-4 h-4 flex-shrink-0 text-blue-200" />
              <span className="text-blue-100">{feature}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          {showPrice && (
            <div className="text-lg font-bold mb-4 text-white">{service.price}</div>
          )}
          {detailHref && (
            <Link
              href={detailHref}
              className="block text-center py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors mb-2 bg-white/20 text-white hover:bg-white/30"
            >
              {learnMoreLabel}
            </Link>
          )}
          <Link
            href={contactHref}
            className="block text-center py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors bg-white text-blue-600 hover:bg-blue-50"
          >
            {enquireLabel}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <GlowCard glowColor="red" className={`bg-white dark:bg-gray-900 p-7 flex flex-col h-full ${featured ? 'lg:col-span-1' : ''}`}>
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{service.title}</h3>
      <p className="text-sm leading-relaxed mb-5 text-gray-500 dark:text-gray-400">{service.description}</p>
      <ul className="space-y-2.5 mb-6 flex-1">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2.5 text-sm">
            <Check className="w-4 h-4 flex-shrink-0 text-green-500 dark:text-green-400" />
            <span className="text-gray-600 dark:text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        {showPrice && (
          <div className="text-lg font-bold mb-4 text-gray-900 dark:text-white">{service.price}</div>
        )}
        {detailHref && (
          <Link
            href={detailHref}
            className="block text-center py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors mb-2 border border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30"
          >
            {learnMoreLabel}
          </Link>
        )}
        <Link
          href={contactHref}
          className="block text-center py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors bg-blue-600 text-white hover:bg-blue-700"
        >
          {enquireLabel}
        </Link>
      </div>
    </GlowCard>
  )
}
