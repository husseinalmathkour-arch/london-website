import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { verifyAdmin } from '@/lib/admin-auth'

export async function POST(req: NextRequest) {
  const auth = await verifyAdmin(req)
  if (auth.error) return auth.error

  if (auth.adminUser!.role !== 'super_admin') {
    return NextResponse.json({ error: 'Insufficient permissions.' }, { status: 403 })
  }

  const { email, password, full_name, role } = await req.json()

  if (!email || !password || !full_name) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
  }

  const serviceClient = createServiceClient()

  const { data: authData, error: authError } = await serviceClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (authError || !authData.user) {
    return NextResponse.json({ error: authError?.message || 'Failed to create user.' }, { status: 400 })
  }

  const { error: dbError } = await serviceClient.from('admin_users').insert({
    id: authData.user.id,
    email,
    full_name,
    role: role || 'admin',
  })

  if (dbError) {
    await serviceClient.auth.admin.deleteUser(authData.user.id)
    return NextResponse.json({ error: dbError.message }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
