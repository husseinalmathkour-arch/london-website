import { unstable_cache } from 'next/cache'
import { createServiceClient } from '@/lib/supabase'

export const getSharedSiteData = unstable_cache(
  async () => {
    const db = createServiceClient()
    const [{ data: settingsRows }, { data: branchRows }] = await Promise.all([
      db.from('site_settings').select('key,value'),
      db
        .from('branches')
        .select('id,name_en,name_tr,address_en,address_tr,phone,whatsapp,hours,maps_url')
        .eq('published', true)
        .order('sort_order'),
    ])

    return {
      settingsRows: settingsRows ?? [],
      branchRows: branchRows ?? [],
    }
  },
  ['shared-site-data'],
  { revalidate: 3600 }
)

export const getHomePageData = unstable_cache(
  async () => {
    const db = createServiceClient()
    const [{ data: testimonialsRows }, { data: courseRows }, { data: langRows }] = await Promise.all([
      db
        .from('testimonials')
        .select('id,name,role_en,role_tr,content_en,content_tr,avatar_url,rating')
        .eq('published', true)
        .eq('featured', true)
        .order('sort_order')
        .limit(6),
      db
        .from('courses')
        .select('id,title_en,title_tr,description_en,description_tr,features_en,features_tr,price,popular')
        .eq('published', true)
        .order('sort_order')
        .limit(6),
      db
        .from('languages_offered')
        .select('id,name_en,name_tr,flag,level_en,level_tr,description_en,description_tr,students,color,image_url')
        .eq('published', true)
        .order('sort_order')
        .limit(8),
    ])

    return {
      testimonialsRows: testimonialsRows ?? [],
      courseRows: courseRows ?? [],
      langRows: langRows ?? [],
    }
  },
  ['home-page-data'],
  { revalidate: 3600 }
)
