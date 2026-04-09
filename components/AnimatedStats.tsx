'use client'

import { Users, Globe, Star, Award } from 'lucide-react'
import { useTranslations } from 'next-intl'
import CountUp from './CountUp'
import { GlowCard } from '@/components/ui/spotlight-card'

const statsConfig = [
  { end: 2000, suffix: '+', icon: Users, key: 'students' },
  { end: 15, suffix: '+', icon: Globe, key: 'languages' },
  { end: 98, suffix: '%', icon: Star, key: 'satisfaction' },
  { end: 10, suffix: '+', icon: Award, key: 'years' },
]

export default function AnimatedStats() {
  const t = useTranslations('stats')

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statsConfig.map((stat) => {
            const Icon = stat.icon
            return (
              <GlowCard key={stat.key} glowColor="red" className="bg-white dark:bg-gray-800 p-6 text-center">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/50 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
                  <CountUp end={stat.end} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {t(stat.key)}
                </div>
              </GlowCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
