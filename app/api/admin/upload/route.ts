import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { verifyAdmin } from '@/lib/admin-auth'
import { randomUUID } from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const auth = await verifyAdmin(req)
    if (auth.error) return auth.error

    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const folder = (formData.get('folder') as string | null) || 'uploads'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const path = `${folder}/${randomUUID()}.${ext}`

    const buffer = Buffer.from(await file.arrayBuffer())
    const supabase = createServiceClient()

    const { error } = await supabase.storage
      .from('images')
      .upload(path, buffer, { contentType: file.type, upsert: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const { data } = supabase.storage.from('images').getPublicUrl(path)

    return NextResponse.json({ url: data.publicUrl })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
