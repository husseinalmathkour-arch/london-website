import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { name, role, content, rating } = await req.json()

    if (!name?.trim() || !content?.trim()) {
      return NextResponse.json({ error: 'Name and review are required.' }, { status: 400 })
    }
    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Invalid rating.' }, { status: 400 })
    }

    const db = createServiceClient()
    const { error } = await db.from('testimonials').insert({
      name: name.trim(),
      role_en: role?.trim() || null,
      content_en: content.trim(),
      rating,
      published: false,
      sort_order: 999,
    })

    if (error) throw error

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error('Testimonial submit error:', err)
    return NextResponse.json({ error: 'Failed to submit review.' }, { status: 500 })
  }
}
