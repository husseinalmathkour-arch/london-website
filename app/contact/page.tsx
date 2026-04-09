import { redirect } from 'next/navigation'

export default function ContactPage({
  searchParams,
}: {
  searchParams?: { service?: string | string[] }
}) {
  const service = Array.isArray(searchParams?.service) ? searchParams.service[0] : searchParams?.service
  const query = service ? `?service=${encodeURIComponent(service)}` : ''

  redirect(`/en/contact${query}`)
}
