import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

function requirePublicEnv(value: string | undefined, name: 'NEXT_PUBLIC_SUPABASE_URL' | 'NEXT_PUBLIC_SUPABASE_ANON_KEY') {
  if (!value) {
    throw new Error(`${name} is required.`)
  }

  return value
}

export const supabase = createClient(
  requirePublicEnv(supabaseUrl, 'NEXT_PUBLIC_SUPABASE_URL'),
  requirePublicEnv(supabaseAnonKey, 'NEXT_PUBLIC_SUPABASE_ANON_KEY')
)

// Server-side client with full access (only use in server components / API routes)
export function createServiceClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is required.')
  }

  if (!serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required.')
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
