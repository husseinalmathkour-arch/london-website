'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { TestTube2, Mail, Newspaper, FileText, Users, Star, ArrowRight, Building2, Settings, Globe } from 'lucide-react'
import { useAdminLang } from '@/context/AdminLangContext'

interface Stats {
  submissions: number
  enquiries: number
  newEnquiries: number
  subscribers: number
  blogPosts: number
  teamMembers: number
  testimonials: number
}

export default function DashboardPage() {
  const { t, lang } = useAdminLang()
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const isTR = lang === 'tr'

  useEffect(() => {
    async function load() {
      const [submissions, enquiries, newEnquiries, subscribers, blogPosts, teamMembers, testimonials] = await Promise.all([
        supabase.from('level_test_submissions').select('id', { count: 'exact', head: true }),
        supabase.from('contact_enquiries').select('id', { count: 'exact', head: true }),
        supabase.from('contact_enquiries').select('id', { count: 'exact', head: true }).eq('status', 'new'),
        supabase.from('newsletter_subscribers').select('id', { count: 'exact', head: true }).eq('active', true),
        supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
        supabase.from('team_members').select('id', { count: 'exact', head: true }),
        supabase.from('testimonials').select('id', { count: 'exact', head: true }),
      ])
      setStats({
        submissions: submissions.count ?? 0,
        enquiries: enquiries.count ?? 0,
        newEnquiries: newEnquiries.count ?? 0,
        subscribers: subscribers.count ?? 0,
        blogPosts: blogPosts.count ?? 0,
        teamMembers: teamMembers.count ?? 0,
        testimonials: testimonials.count ?? 0,
      })
      setLoading(false)
    }
    load()
  }, [])

  const cards = stats ? [
    { label: t('levelTestSubmissions'), value: stats.submissions, icon: TestTube2, color: 'bg-blue-500/10 text-blue-400', badge: null, href: '/admin/submissions' },
    { label: t('contactEnquiries'), value: stats.enquiries, icon: Mail, color: 'bg-purple-500/10 text-purple-400', badge: stats.newEnquiries > 0 ? `${stats.newEnquiries} ${t('statusNew')}` : null, href: '/admin/enquiries' },
    { label: t('newsletterSubscribers'), value: stats.subscribers, icon: Newspaper, color: 'bg-green-500/10 text-green-400', badge: null, href: '/admin/newsletter' },
    { label: t('blogPosts'), value: stats.blogPosts, icon: FileText, color: 'bg-yellow-500/10 text-yellow-400', badge: null, href: '/admin/blog' },
    { label: t('teamMembers'), value: stats.teamMembers, icon: Users, color: 'bg-orange-500/10 text-orange-400', badge: null, href: '/admin/team' },
    { label: t('testimonials'), value: stats.testimonials, icon: Star, color: 'bg-pink-500/10 text-pink-400', badge: null, href: '/admin/testimonials' },
  ] : []

  const quickActions = [
    {
      label: isTR ? 'Yeni blog yazısı' : 'New blog post',
      hint: isTR ? 'Yeni içerik ekleyin ve yayınlayın.' : 'Create and publish fresh content.',
      href: '/admin/blog',
      icon: FileText,
    },
    {
      label: isTR ? 'İletişim taleplerini incele' : 'Review enquiries',
      hint: isTR ? 'Yeni başvuruları hızlıca kontrol edin.' : 'Check incoming contact requests quickly.',
      href: '/admin/enquiries',
      icon: Mail,
    },
    {
      label: isTR ? 'Site ayarlarını güncelle' : 'Update site settings',
      hint: isTR ? 'Telefon, e-posta ve sosyal bağlantıları düzenleyin.' : 'Edit phone, email, and social links.',
      href: '/admin/settings',
      icon: Settings,
    },
  ]

  return (
    <div>
      <div className="mb-8 grid gap-4 xl:grid-cols-[1.6fr,1fr]">
        <div className="bg-gradient-to-br from-[#7b1830] via-[#651326] to-gray-950 border border-[#a98a52]/20 rounded-3xl p-6 md:p-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d8c18a]/20 bg-white/5 px-3 py-1 text-xs font-semibold text-[#e6d4a5]">
            <Globe className="w-3.5 h-3.5" />
            {isTR ? 'Yönetim özeti' : 'Admin overview'}
          </div>
          <h1 className="mt-4 text-3xl font-bold text-white">{t('dashboard')}</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#f1dde3]/75">{t('welcomeBack')}</p>
          {stats && (
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                <p className="text-xs uppercase tracking-wider text-[#d7b97e]">{isTR ? 'Yeni talepler' : 'New enquiries'}</p>
                <p className="mt-2 text-2xl font-bold text-white">{stats.newEnquiries}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                <p className="text-xs uppercase tracking-wider text-[#d7b97e]">{isTR ? 'Aktif bülten' : 'Active newsletter'}</p>
                <p className="mt-2 text-2xl font-bold text-white">{stats.subscribers}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                <p className="text-xs uppercase tracking-wider text-[#d7b97e]">{isTR ? 'İçerik varlıkları' : 'Content assets'}</p>
                <p className="mt-2 text-2xl font-bold text-white">{stats.blogPosts + stats.teamMembers + stats.testimonials}</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">{isTR ? 'Hızlı işlemler' : 'Quick actions'}</h2>
            <p className="mt-1 text-sm text-gray-400">{isTR ? 'En sık kullanılan yönetim alanlarına hızlı geçiş.' : 'Jump straight into the most-used admin areas.'}</p>
          </div>
          <div className="space-y-3">
            {quickActions.map(action => {
              const Icon = action.icon
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="group flex items-center justify-between rounded-2xl border border-gray-800 bg-gray-950/60 px-4 py-3 transition-colors hover:border-gray-700 hover:bg-gray-800/40"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{action.label}</p>
                      <p className="text-xs text-gray-400">{action.hint}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-500 transition-transform group-hover:translate-x-0.5 group-hover:text-gray-300" />
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 animate-pulse h-28" />
          ))}
        </div>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-white">{isTR ? 'Canlı metrikler' : 'Live metrics'}</h2>
              <p className="text-sm text-gray-400">{isTR ? 'Formlar, içerik ve ekip görünümü.' : 'Current snapshot of forms, content, and team.'}</p>
            </div>
            <Link href="/admin/branches" className="inline-flex items-center gap-2 rounded-xl border border-gray-800 px-3 py-2 text-sm text-gray-300 transition-colors hover:border-gray-700 hover:text-white">
              <Building2 className="h-4 w-4" />
              {isTR ? 'Şubeleri yönet' : 'Manage branches'}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {cards.map(card => {
            const Icon = card.icon
            return (
              <Link key={card.label} href={card.href} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-colors group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {card.badge && (
                    <span className="text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full">{card.badge}</span>
                  )}
                </div>
                <p className="text-3xl font-bold text-white mb-1">{card.value}</p>
                <p className="text-sm text-gray-400">{card.label}</p>
              </Link>
            )
            })}
          </div>
        </>
      )}
    </div>
  )
}
