import type { Metadata } from 'next'
import { getLocaleAlternates } from '@/lib/site-url'

export const metadata: Metadata = {
  title: 'Free English Level Test',
  description: 'Take our free online English level test and find out your CEFR level in just 5 minutes. 10 calibrated questions covering A1 to C2. Instant results with a personalised course recommendation.',
  alternates: {
    languages: getLocaleAlternates('/level-test'),
  },
}

export default function LevelTestLayout({ children }: { children: React.ReactNode }) {
  return children
}
