import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { verifyAdmin } from '@/lib/admin-auth'

export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET
  const token = req.headers.get('x-revalidate-secret') ?? req.nextUrl.searchParams.get('secret')
  const auth = await verifyAdmin(req)

  if (auth.error) {
    if (!secret) {
      return NextResponse.json({ error: 'Revalidation is not configured.' }, { status: 503 })
    }
    if (token !== secret) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }
  }

  if (!auth.error || token === secret) {
    revalidatePath('/', 'layout')
    return NextResponse.json({ revalidated: true })
  }

  if (token !== secret) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }
  return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
}
