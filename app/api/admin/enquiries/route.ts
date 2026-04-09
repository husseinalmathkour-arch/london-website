import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { verifyAdmin } from '@/lib/admin-auth'

export async function GET(req: NextRequest) {
  const auth = await verifyAdmin(req)
  if (auth.error) return auth.error

  const db = createServiceClient()
  const { data, error } = await db
    .from('contact_enquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PATCH(req: NextRequest) {
  const auth = await verifyAdmin(req)
  if (auth.error) return auth.error

  const { id, status } = await req.json()
  const db = createServiceClient()
  const { error } = await db.from('contact_enquiries').update({ status }).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest) {
  const auth = await verifyAdmin(req)
  if (auth.error) return auth.error

  const { id } = await req.json()
  const db = createServiceClient()
  const { error } = await db.from('contact_enquiries').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
