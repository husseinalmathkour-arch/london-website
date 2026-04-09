import { withSiteUrl } from '@/lib/site-url'

// JSON-LD structured data schemas for Google rich results

const BASE_URL = withSiteUrl('/')

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'London Language Academy',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description:
      'London Language Academy offers world-class language courses in Central London and Turkey. English, French, Spanish, German, Italian, Russian and more.',
    foundingDate: '2021',
    areaServed: ['GB', 'TR'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Turkish'],
    },
    sameAs: [],
    location: [
      {
        '@type': 'Place',
        name: 'London Language Academy — London',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'London',
          addressCountry: 'GB',
        },
      },
      {
        '@type': 'Place',
        name: 'London Language Academy — Bursa',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bursa',
          addressCountry: 'TR',
        },
      },
      {
        '@type': 'Place',
        name: 'London Language Academy — Istanbul',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Istanbul',
          addressCountry: 'TR',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LanguageSchool',
    name: 'London Language Academy',
    image: `${BASE_URL}/logo.png`,
    url: BASE_URL,
    priceRange: '££',
    currenciesAccepted: 'GBP, TRY',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '09:00',
        closes: '22:40',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '09:00',
        closes: '22:40',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Language Courses',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'General English', description: 'A1 to C2 levels — all CEFR levels covered' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'IELTS & Cambridge Exam Preparation', description: 'Targeted preparation for IELTS, B2 First, C1 Advanced, C2 Proficiency' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'Business Language', description: 'Professional language skills for the workplace' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'One-to-One Tuition', description: 'Private lessons tailored to individual goals' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'Online Courses', description: 'Live online language lessons' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'Intensive Programme', description: 'Fast-track language learning' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'German', description: 'Group and private German lessons' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'Spanish', description: 'Group and private Spanish lessons' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'French', description: 'Group and private French lessons' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'Italian', description: 'Group and private Italian lessons' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'Russian', description: 'Group and private Russian lessons' } },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FaqSchema({ items }: { items: { question: string; answer: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BlogPostSchema({
  title,
  description,
  slug,
  date,
  author,
  image,
  locale = 'en',
}: {
  title: string
  description: string
  slug: string
  date: string
  author: string
  image?: string
  locale?: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url: withSiteUrl(`/${locale}/blog/${slug}`),
    datePublished: date,
    dateModified: date,
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'London Language Academy',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
    ...(image && { image }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
