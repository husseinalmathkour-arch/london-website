import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createServiceClient } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

// Rate limit: max 3 submissions per IP per 10 minutes
const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const ipSubmissions = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (ipSubmissions.get(ip) || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS)
  if (timestamps.length >= RATE_LIMIT_MAX) return true
  ipSubmissions.set(ip, [...timestamps, now])
  return false
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 })
    }

    const body = await req.json()
    const { firstName, lastName, email, phone, enquiryType, message } = body

    if (
      !firstName || typeof firstName !== 'string' || !firstName.trim() ||
      !lastName || typeof lastName !== 'string' || !lastName.trim() ||
      !email || typeof email !== 'string' || !email.trim() ||
      !message || typeof message !== 'string' || !message.trim()
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    if (firstName.trim().length > 100 || lastName.trim().length > 100) {
      return NextResponse.json({ error: 'Name is too long.' }, { status: 400 })
    }

    if (message.trim().length > 5000) {
      return NextResponse.json({ error: 'Message is too long.' }, { status: 400 })
    }

    const name = `${firstName.trim()} ${lastName.trim()}`

    const db = createServiceClient()
    const { error } = await db.from('contact_enquiries').insert({
      name,
      email: email.trim().toLowerCase(),
      phone: typeof phone === 'string' && phone.trim() ? phone.trim() : null,
      subject: enquiryType || null,
      message,
      service: enquiryType || null,
      status: 'new',
    })

    if (error) {
      console.error('Contact insert error:', error)
      return NextResponse.json({ error: 'Failed to save enquiry' }, { status: 500 })
    }

    // Fetch all admin emails and send notification
    const { data: admins } = await db.from('admin_users').select('email')

    if (admins && admins.length > 0) {
      const html = `
        <!DOCTYPE html>
        <html>
          <body style="margin:0;padding:0;background:#f4f4f5;font-family:sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
              <tr>
                <td align="center">
                  <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

                    <!-- Header -->
                    <tr>
                      <td style="background:#70212c;padding:32px 40px;text-align:center;">
                        <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:0.5px;">
                          London Language Academy
                        </h1>
                        <p style="margin:8px 0 0;color:#f0c4cb;font-size:14px;">New Enquiry Received</p>
                      </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                      <td style="padding:36px 40px;">
                        <p style="margin:0 0 24px;font-size:15px;color:#444;">
                          You have a new contact enquiry. Here are the details:
                        </p>

                        <!-- Details -->
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="padding:12px 16px;background:#f9f9f9;border-radius:8px 8px 0 0;border-bottom:1px solid #eee;">
                              <span style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:0.5px;">Name</span><br/>
                              <span style="font-size:15px;color:#111;font-weight:600;">${name}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:12px 16px;background:#f9f9f9;border-bottom:1px solid #eee;">
                              <span style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:0.5px;">Email</span><br/>
                              <a href="mailto:${email}" style="font-size:15px;color:#70212c;font-weight:600;text-decoration:none;">${email}</a>
                            </td>
                          </tr>
                          ${phone ? `
                          <tr>
                            <td style="padding:12px 16px;background:#f9f9f9;border-bottom:1px solid #eee;">
                              <span style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:0.5px;">Phone</span><br/>
                              <span style="font-size:15px;color:#111;font-weight:600;">${phone}</span>
                            </td>
                          </tr>` : ''}
                          ${enquiryType ? `
                          <tr>
                            <td style="padding:12px 16px;background:#f9f9f9;border-bottom:1px solid #eee;">
                              <span style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:0.5px;">Enquiry Type</span><br/>
                              <span style="font-size:15px;color:#111;font-weight:600;">${enquiryType}</span>
                            </td>
                          </tr>` : ''}
                          <tr>
                            <td style="padding:12px 16px;background:#f9f9f9;border-radius:0 0 8px 8px;">
                              <span style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:0.5px;">Message</span><br/>
                              <span style="font-size:15px;color:#111;line-height:1.6;white-space:pre-wrap;">${message}</span>
                            </td>
                          </tr>
                        </table>

                        <!-- CTA -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
                          <tr>
                            <td align="center">
                              <a href="https://londonlanguageacademy.com/admin/enquiries"
                                style="display:inline-block;background:#70212c;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:14px;font-weight:600;letter-spacing:0.3px;">
                                View in Admin Panel
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="padding:20px 40px;background:#f9f9f9;text-align:center;border-top:1px solid #eee;">
                        <p style="margin:0;font-size:12px;color:#999;">
                          This is an automated notification from London Language Academy.
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `
      await Promise.all(admins.map(async (admin) => {
        const result = await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: admin.email,
          subject: `New Enquiry from ${name}${enquiryType ? ` — ${enquiryType}` : ''}`,
          html,
        })
        console.log(`Email to ${admin.email}:`, result.error ?? 'sent')
      }))
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
