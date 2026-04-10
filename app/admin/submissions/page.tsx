'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ChevronDown, ChevronUp, Search, Trash2 } from 'lucide-react'
import { useAdminLang } from '@/context/AdminLangContext'

interface Submission {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  branch: string
  score: number
  total: number
  level: string
  created_at: string
}

const levelColor: Record<string, string> = {
  A1: 'bg-gray-500/20 text-gray-300',
  A2: 'bg-blue-500/20 text-blue-300',
  B1: 'bg-green-500/20 text-green-300',
  B2: 'bg-yellow-500/20 text-yellow-300',
  C1: 'bg-orange-500/20 text-orange-300',
  C2: 'bg-purple-500/20 text-purple-300',
}

export default function SubmissionsPage() {
  const { t, lang } = useAdminLang()
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [sortField, setSortField] = useState<keyof Submission>('created_at')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => { load() }, [])

  async function getAuthHeader() {
    const { data } = await supabase.auth.getSession()
    return data.session ? { 'Authorization': `Bearer ${data.session.access_token}` } : {} as Record<string, string>
  }

  async function load() {
    const authHeader = await getAuthHeader()
    const res = await fetch('/api/admin/submissions', { headers: authHeader })
    const data = await res.json()
    setSubmissions(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  async function deleteSubmission(id: string) {
    const authHeader = await getAuthHeader()
    const res = await fetch('/api/admin/submissions', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', ...authHeader },
      body: JSON.stringify({ id }),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => null)
      throw new Error(data?.error || 'Failed to delete submission.')
    }

    setSubmissions(prev => prev.filter(s => s.id !== id))
    setDeleteConfirm(null)
  }

  function toggleSort(field: keyof Submission) {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortField(field); setSortDir('asc') }
  }

  const filtered = submissions
    .filter(s =>
      `${s.first_name} ${s.last_name} ${s.email} ${s.level} ${s.branch ?? ''}`.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const av = a[sortField] ?? ''
      const bv = b[sortField] ?? ''
      return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av))
    })

  const SortIcon = ({ field }: { field: keyof Submission }) =>
    sortField === field
      ? sortDir === 'asc' ? <ChevronUp className="w-3 h-3 inline ml-1" /> : <ChevronDown className="w-3 h-3 inline ml-1" />
      : null

  const isTR = lang === 'tr'
  const copy = {
    title: t('submissionsTitle'),
    total: isTR ? `${submissions.length} toplam başvuru` : `${submissions.length} total submissions`,
    search: t('search'),
    loading: t('loading'),
    empty: isTR ? 'Başvuru bulunamadı.' : 'No submissions found.',
    branch: isTR ? 'Şube' : 'Branch',
    date: t('date'),
    actions: isTR ? 'İşlemler' : 'Actions',
    delete: t('delete'),
    cancel: t('cancel'),
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{copy.title}</h1>
          <p className="text-gray-400 text-sm mt-1">{copy.total}</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={copy.search}
            className="bg-gray-900 border border-gray-800 text-white text-sm rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-blue-500 w-56"
          />
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">{copy.loading}</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-500">{copy.empty}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="text-left px-4 py-3 cursor-pointer hover:text-white" onClick={() => toggleSort('first_name')}>{t('name')} <SortIcon field="first_name" /></th>
                  <th className="text-left px-4 py-3 cursor-pointer hover:text-white" onClick={() => toggleSort('email')}>{t('email')} <SortIcon field="email" /></th>
                  <th className="text-left px-4 py-3">{t('phone')}</th>
                  <th className="text-left px-4 py-3 cursor-pointer hover:text-white" onClick={() => toggleSort('branch')}>{copy.branch} <SortIcon field="branch" /></th>
                  <th className="text-left px-4 py-3 cursor-pointer hover:text-white" onClick={() => toggleSort('score')}>{t('score')} <SortIcon field="score" /></th>
                  <th className="text-left px-4 py-3 cursor-pointer hover:text-white" onClick={() => toggleSort('level')}>{t('level')} <SortIcon field="level" /></th>
                  <th className="text-left px-4 py-3 cursor-pointer hover:text-white" onClick={() => toggleSort('created_at')}>{copy.date} <SortIcon field="created_at" /></th>
                  <th className="px-4 py-3">{copy.actions}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr key={s.id} className={`border-b border-gray-800/50 hover:bg-gray-800/30 ${i % 2 === 0 ? '' : 'bg-gray-900/50'}`}>
                    <td className="px-4 py-3 text-white font-medium">{s.first_name} {s.last_name}</td>
                    <td className="px-4 py-3 text-gray-300">{s.email}</td>
                    <td className="px-4 py-3 text-gray-300">{s.phone}</td>
                    <td className="px-4 py-3 text-gray-300">{s.branch || <span className="text-gray-600">—</span>}</td>
                    <td className="px-4 py-3 text-gray-300">{s.score}/{s.total} <span className="text-gray-500">({Math.round(s.score / s.total * 100)}%)</span></td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${levelColor[s.level] ?? 'bg-gray-700 text-gray-300'}`}>{s.level}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-400">{new Date(s.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-right">
                      {deleteConfirm === s.id ? (
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => deleteSubmission(s.id)} className="text-xs px-2 py-1 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors">{copy.delete}</button>
                          <button onClick={() => setDeleteConfirm(null)} className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">{copy.cancel}</button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteConfirm(s.id)} className="text-gray-600 hover:text-red-400 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
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
