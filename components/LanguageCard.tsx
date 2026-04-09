'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Users } from 'lucide-react'
import { useLocale } from 'next-intl'
import type { Language } from '@/lib/data'
import { GlowCard } from '@/components/ui/spotlight-card'
import LanguageFlag from '@/components/LanguageFlag'

interface LanguageCardProps {
  language: Language
  href?: string
}

export default function LanguageCard({ language, href = '/languages' }: LanguageCardProps) {
  const locale = useLocale()

  return (
    <GlowCard glowColor="red" className="bg-white dark:bg-gray-900 h-full group">
      <Link href={href} className="flex flex-col gap-3 h-full">
        {/* Image banner */}
        {language.image && (
          <div className="relative h-36 w-full overflow-hidden rounded-t-[14px] flex-shrink-0">
            <Image src={language.image} alt={language.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/40 to-transparent`} />
          </div>
        )}

        <div className={`flex flex-col gap-3 p-6 ${language.image ? 'pt-3' : ''} flex-1`}>
        {/* Subtle gradient overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${language.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-[14px]`} />

        <div className="flex items-start justify-between">
          <LanguageFlag
            id={language.id}
            name={language.name}
            flag={language.flag}
            className="h-7 w-11"
          />
          <span className="text-xs font-medium text-blue-600 dark:text-yellow-400 bg-blue-50 dark:bg-yellow-950/40 px-2.5 py-1 rounded-full">
            {language.level}
          </span>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{language.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
            {language.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
            <Users className="w-3.5 h-3.5" />
            <span>{language.students.toLocaleString()} {locale === 'tr' ? 'öğrenci' : 'students'}</span>
          </div>
        </div>
        </div>
      </Link>
    </GlowCard>
  )
}
