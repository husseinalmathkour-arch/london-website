import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { first_name, last_name, email, phone, branch, score, total, level, answers } = body

    // Validate required fields
    if (
      !first_name || typeof first_name !== 'string' || !first_name.trim() ||
      !last_name || typeof last_name !== 'string' || !last_name.trim() ||
      !email || typeof email !== 'string' || !email.trim()
    ) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    // Validate score/total are non-negative integers
    if (
      typeof score !== 'number' || !Number.isInteger(score) || score < 0 ||
      typeof total !== 'number' || !Number.isInteger(total) || total < 0 ||
      score > total
    ) {
      return NextResponse.json({ error: 'Invalid score.' }, { status: 400 })
    }

    if (!level || typeof level !== 'string' || !level.trim()) {
      return NextResponse.json({ error: 'Missing level.' }, { status: 400 })
    }

    const db = createServiceClient()
    const { error } = await db.from('level_test_submissions').insert({
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      email: email.trim().toLowerCase(),
      phone: typeof phone === 'string' ? phone.trim() : '',
      branch: typeof branch === 'string' ? branch.trim() : '',
      score,
      total,
      level: level.trim(),
      answers: Array.isArray(answers) ? answers : null,
    })

    if (error) {
      console.error('Level test insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Level test route error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
