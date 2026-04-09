import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { verifyAdmin } from '@/lib/admin-auth'

export async function GET(req: NextRequest) {
  const auth = await verifyAdmin(req)
  if (auth.error) return auth.error

  const db = createServiceClient()
  const { data, error } = await db
    .from('level_test_submissions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(req: NextRequest) {
  const auth = await verifyAdmin(req)
  if (auth.error) return auth.error

  const { id } = await req.json()

  if (!id || typeof id !== 'string') {
    return NextResponse.json({ error: 'Submission id is required.' }, { status: 400 })
  }

  const db = createServiceClient()
  const { error } = await db.from('level_test_submissions').delete().eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
