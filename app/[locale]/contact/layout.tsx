import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/metadata'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const isTR = locale === 'tr'
  const path = '/contact'

  return buildPageMetadata({
    locale,
    path,
    title: isTR
      ? 'İletişim | Londra, Bursa ve İstanbul'
      : 'Contact Us | London, Bursa & Istanbul',
    description: isTR
      ? 'London Language Academy ile iletişime geçin. İngilizce kursları, IELTS hazırlık veya yurt dışı eğitim programları hakkında bilgi alın. Central London, Bursa ve İstanbul ofisleri.'
      : 'Get in touch with London Language Academy. Enquire about English courses, IELTS preparation, or study abroad programmes. Offices in Central London, Bursa and Istanbul. Free placement test available.',
  })
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
