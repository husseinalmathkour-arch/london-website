'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import {
  LayoutDashboard, FileText, HelpCircle, Mail, BookOpen,
  MapPin, Star, Users, Globe, Newspaper, Settings,
  UserCog, LogOut, ChevronLeft, Menu, TestTube2, Building2
} from 'lucide-react'
import { AdminLangProvider, useAdminLang } from '@/context/AdminLangContext'

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { lang, setLang, t } = useAdminLang()
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [adminName, setAdminName] = useState('')

  const navItems = [
    { href: '/admin/dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { href: '/admin/submissions', label: t('levelTest'), icon: TestTube2 },
    { href: '/admin/enquiries', label: t('enquiries'), icon: Mail },
    { href: '/admin/newsletter', label: t('newsletter'), icon: Newspaper },
    { label: t('content'), divider: true },
    { href: '/admin/blog', label: t('blog'), icon: FileText },
    { href: '/admin/about', label: t('about'), icon: FileText },
    { href: '/admin/services', label: t('services'), icon: BookOpen },
    { href: '/admin/faqs', label: t('faqs'), icon: HelpCircle },
    { href: '/admin/courses', label: t('courses'), icon: BookOpen },
    { href: '/admin/languages', label: t('languages'), icon: Globe },
    { href: '/admin/study-abroad', label: t('studyAbroad'), icon: Globe },
    { href: '/admin/testimonials', label: t('testimonials'), icon: Star },
    { href: '/admin/team', label: t('team'), icon: Users },
    { label: t('settings'), divider: true },
    { href: '/admin/branches', label: t('branches'), icon: Building2 },
    { href: '/admin/settings', label: t('siteSettings'), icon: Settings },
    { href: '/admin/admins', label: t('adminUsers'), icon: UserCog },
  ]

  useEffect(() => {
    if (pathname === '/admin/login') { setLoading(false); return }
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) { router.push('/admin/login'); return }
      const { data: admin } = await supabase.from('admin_users').select('full_name').eq('id', data.session.user.id).single()
      if (!admin) { router.push('/admin/login'); return }
      setAdminName(admin.full_name || data.session.user.email || '')
      setLoading(false)
    })
  }, [pathname, router])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (pathname === '/admin/login') return <>{children}</>
  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  const Sidebar = () => (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col h-full">
      <div className="p-5 border-b border-gray-800 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-4 h-4 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-white font-bold text-sm truncate">LLA Admin</p>
          <p className="text-gray-500 text-xs truncate">{adminName}</p>
        </div>
        {/* Language toggle */}
        <button
          onClick={() => setLang(lang === 'en' ? 'tr' : 'en')}
          className="flex-shrink-0 text-xs font-bold px-2 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors border border-gray-700"
          title="Switch language"
        >
          {lang === 'en' ? 'TR' : 'EN'}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {navItems.map((item, i) => {
          if ('divider' in item && item.divider) return (
            <p key={i} className="text-xs font-semibold text-gray-600 uppercase tracking-wider px-3 pt-4 pb-1">{item.label}</p>
          )
          const Icon = item.icon!
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href!}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t border-gray-800">
        <Link href="/" target="_blank" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
          <ChevronLeft className="w-4 h-4" /> {t('viewWebsite')}
        </Link>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors">
          <LogOut className="w-4 h-4" /> {t('signOut')}
        </button>
      </div>
    </aside>
  )

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col w-64 fixed inset-y-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex flex-col w-64">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-white font-bold text-sm">LLA Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'tr' : 'en')}
              className="text-xs font-bold px-2 py-1 rounded-lg bg-gray-800 text-gray-300 border border-gray-700"
            >
              {lang === 'en' ? 'TR' : 'EN'}
            </button>
            <button onClick={() => setSidebarOpen(true)} className="text-gray-400 hover:text-white">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLangProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminLangProvider>
  )
}
