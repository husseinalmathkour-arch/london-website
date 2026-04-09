'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ChevronDown, ChevronUp, Search, Trash2 } from 'lucide-react'

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
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [sortField, setSortField] = useState<keyof Submission>('created_at')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    supabase
      .from('level_test_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setSubmissions(data || [])
        setLoading(false)
      })
  }, [])

  async function deleteSubmission(id: string) {
    await supabase.from('level_test_submissions').delete().eq('id', id)
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

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Level Test Submissions</h1>
          <p className="text-gray-400 text-sm mt-1">{submissions.length} total submissions</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            className="bg-gray-900 border border-gray-800 text-white text-sm rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-blue-500 w-56"
          />
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No submissions found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="text-left px-4 py-3 cursor-pointer hover:text-white" onClick={() => toggleSort('first_name')}>Name <SortIcon field="first_name" /></th>
                  <th className="text-left px-4 py-3 cursor-pointer hover:text-white" onClick={() => toggleSort('email')}>Email <SortIcon field="email" /></th>
                  <th className="text-left px-4 py-3">Phone</th>
                  <th className="text-left px-4 py-3 cursor-pointer hover:text-white" onClick={() => toggleSort('branch')}>Branch <SortIcon field="branch" /></th>
                  <th className="text-left px-4 py-3 cursor-pointer hover:text-white" onClick={() => toggleSort('score')}>Score <SortIcon field="score" /></th>
                  <th className="text-left px-4 py-3 cursor-pointer hover:text-white" onClick={() => toggleSort('level')}>Level <SortIcon field="level" /></th>
                  <th className="text-left px-4 py-3 cursor-pointer hover:text-white" onClick={() => toggleSort('created_at')}>Date <SortIcon field="created_at" /></th>
                  <th className="px-4 py-3" />
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
                          <button onClick={() => deleteSubmission(s.id)} className="text-xs px-2 py-1 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors">Delete</button>
                          <button onClick={() => setDeleteConfirm(null)} className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">Cancel</button>
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
