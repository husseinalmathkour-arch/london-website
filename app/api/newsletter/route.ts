import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

  const db = createServiceClient()
  const { data, error } = await db
    .from('newsletter_subscribers')
    .insert({ email, active: true })
    .select()

  console.log('Newsletter insert - email:', email)
  console.log('Newsletter insert - data:', data)
  console.log('Newsletter insert - error:', error)

  if (error) {
    if (error.code === '23505') return NextResponse.json({ ok: true })
    return NextResponse.json({ error: error.message, code: error.code }, { status: 500 })
  }

  return NextResponse.json({ ok: true, data })
}
