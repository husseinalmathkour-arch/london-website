import type { Metadata } from 'next'
import { getLocaleAlternates, withSiteUrl } from '@/lib/site-url'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const isTR = locale === 'tr'
  const path = '/level-test'

  return {
    title: isTR
      ? 'Ücretsiz İngilizce Seviye Tespit Sınavı'
      : 'Free English Level Test',
    description: isTR
      ? 'Ücretsiz online İngilizce seviye tespit sınavımıza katılın ve CEFR seviyenizi sadece 5 dakikada öğrenin. A1’den C2’ye 10 soruluk test, anında sonuç ve kişiselleştirilmiş kurs önerisi.'
      : 'Take our free online English level test and find out your CEFR level in just 5 minutes. 10 calibrated questions covering A1 to C2. Instant results with a personalised course recommendation.',
    alternates: {
      canonical: withSiteUrl(`/${locale}${path}`),
      languages: getLocaleAlternates(path),
    },
  }
}

export default function LevelTestLayout({ children }: { children: React.ReactNode }) {
  return children
}
