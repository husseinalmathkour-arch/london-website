import { createServiceClient } from '@/lib/supabase'
import LevelTestPageClient from '@/components/LevelTestPageClient'

export const revalidate = 3600

export default async function LevelTestPage() {
  const db = createServiceClient()
  const { data: branches } = await db
    .from('branches')
    .select('id,name_en,name_tr')
    .eq('published', true)
    .order('sort_order')

  return <LevelTestPageClient branches={branches ?? []} />
}
