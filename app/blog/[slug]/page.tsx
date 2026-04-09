import { redirect } from 'next/navigation'

interface Props {
  params: { slug: string }
}

export default function BlogPostPage({ params }: Props) {
  redirect(`/en/blog/${params.slug}`)
}
