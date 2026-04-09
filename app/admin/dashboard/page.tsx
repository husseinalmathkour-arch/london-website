'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { TestTube2, Mail, Newspaper, FileText, Users, Star } from 'lucide-react'
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
  const { t } = useAdminLang()
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

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

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">{t('dashboard')}</h1>
        <p className="text-gray-400 text-sm mt-1">{t('welcomeBack')}</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 animate-pulse h-28" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {cards.map(card => {
            const Icon = card.icon
            return (
              <a key={card.label} href={card.href} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-colors group">
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
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}
