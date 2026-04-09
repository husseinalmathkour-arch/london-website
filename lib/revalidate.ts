import { supabase } from '@/lib/supabase'

export async function revalidateAll() {
  try {
    const { data } = await supabase.auth.getSession()
    const token = data.session?.access_token

    await fetch('/api/revalidate', {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
  } catch {
    // Non-blocking — cache will expire naturally if this fails
  }
}
