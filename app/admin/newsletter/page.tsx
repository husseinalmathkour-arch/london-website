'use client'

import { useEffect, useState } from 'react'
import { Search, Download } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAdminLang } from '@/context/AdminLangContext'

interface Subscriber {
  id: string
  email: string
  subscribed_at: string
  active: boolean
}

export default function NewsletterPage() {
  const { t, lang } = useAdminLang()
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('active')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const token = data.session?.access_token
      fetch('/api/admin/newsletter', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      })
        .then(r => r.json())
        .then(data => {
          setSubscribers(Array.isArray(data) ? data : [])
          setLoading(false)
        })
    })
  }, [])

  async function toggleActive(id: string, current: boolean) {
    const { data } = await supabase.auth.getSession()
    const token = data.session?.access_token
    await fetch('/api/admin/newsletter', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ id, active: !current }),
    })
    setSubscribers(prev => prev.map(s => s.id === id ? { ...s, active: !current } : s))
  }

  function exportCSV() {
    const rows = [['Email', 'Date', 'Status'], ...filtered.map(s => [s.email, new Date(s.subscribed_at).toLocaleDateString(), s.active ? 'Active' : 'Unsubscribed'])]
    const csv = rows.map(r => r.join(',')).join('\n')
    const a = document.createElement('a')
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv)
    a.download = 'subscribers.csv'
    a.click()
  }

  const filtered = subscribers.filter(s => {
    const matchSearch = s.email.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || (filter === 'active' ? s.active : !s.active)
    return matchSearch && matchFilter
  })

  const isTR = lang === 'tr'

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{t('newsletterTitle')}</h1>
          <p className="text-gray-400 text-sm mt-1">{subscribers.filter(s => s.active).length} {t('activeSubscribers')}</p>
        </div>
        <button onClick={exportCSV} className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white text-sm px-4 py-2 rounded-xl transition-colors">
          <Download className="w-4 h-4" /> {t('exportCSV')}
        </button>
      </div>

      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={isTR ? 'E-posta ara...' : 'Search email...'}
            className="w-full bg-gray-900 border border-gray-800 text-white text-sm rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="bg-gray-900 border border-gray-800 text-white text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
        >
          <option value="all">{isTR ? 'Tümü' : 'All'}</option>
          <option value="active">{t('active')}</option>
          <option value="inactive">{isTR ? 'Pasif' : 'Inactive'}</option>
        </select>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">{t('loading')}</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-500">{isTR ? 'Abone bulunamadı.' : 'No subscribers found.'}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="text-left px-4 py-3">{t('email')}</th>
                  <th className="text-left px-4 py-3">{t('subscribed')}</th>
                  <th className="text-left px-4 py-3">{isTR ? 'Durum' : 'Status'}</th>
                  <th className="text-right px-4 py-3">{isTR ? 'İşlemler' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                    <td className="px-4 py-3 text-white">{s.email}</td>
                    <td className="px-4 py-3 text-gray-400">{new Date(s.subscribed_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${s.active ? 'bg-green-500/20 text-green-300' : 'bg-gray-700 text-gray-400'}`}>
                        {s.active ? t('active') : (isTR ? 'Abonelik İptal' : 'Unsubscribed')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => toggleActive(s.id, s.active)}
                        className="text-xs text-gray-400 hover:text-white border border-gray-700 hover:border-gray-600 px-3 py-1 rounded-lg transition-colors"
                      >
                        {s.active ? (isTR ? 'Pasifleştir' : 'Deactivate') : t('reactivate')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
