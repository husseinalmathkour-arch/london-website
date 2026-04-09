import type { Metadata } from 'next'
import { getLocaleAlternates } from '@/lib/site-url'

export const metadata: Metadata = {
  title: 'Contact Us | London, Bursa & Istanbul',
  description: 'Get in touch with London Language Academy. Enquire about English courses, IELTS preparation, or study abroad programmes. Offices in Central London, Bursa and Istanbul. Free placement test available.',
  alternates: {
    languages: getLocaleAlternates('/contact'),
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
