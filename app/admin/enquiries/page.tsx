'use client'

import { useEffect, useState } from 'react'
import { Search, ChevronDown, X, Trash2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Enquiry {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string
  service: string | null
  status: 'new' | 'read' | 'replied'
  created_at: string
}

const statusStyles: Record<string, string> = {
  new: 'bg-red-500/20 text-red-300 border-red-500/30',
  read: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  replied: 'bg-green-500/20 text-green-300 border-green-500/30',
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selected, setSelected] = useState<Enquiry | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => { load() }, [])

  async function getAuthHeader() {
    const { data } = await supabase.auth.getSession()
    return data.session ? { 'Authorization': `Bearer ${data.session.access_token}` } : {} as Record<string, string>
  }

  async function load() {
    const authHeader = await getAuthHeader()
    const res = await fetch('/api/admin/enquiries', { headers: authHeader })
    const data = await res.json()
    setEnquiries(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  async function deleteEnquiry(id: string) {
    const authHeader = await getAuthHeader()
    await fetch('/api/admin/enquiries', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', ...authHeader },
      body: JSON.stringify({ id }),
    })
    setEnquiries(prev => prev.filter(e => e.id !== id))
    if (selected?.id === id) setSelected(null)
    setDeleteConfirm(null)
  }

  async function updateStatus(id: string, status: string) {
    const authHeader = await getAuthHeader()
    await fetch('/api/admin/enquiries', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...authHeader },
      body: JSON.stringify({ id, status }),
    })
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: status as Enquiry['status'] } : e))
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status: status as Enquiry['status'] } : null)
  }

  const filtered = enquiries.filter(e => {
    const matchSearch = `${e.name} ${e.email} ${e.subject} ${e.message}`.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || e.status === filterStatus
    return matchSearch && matchStatus
  })

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Contact Enquiries</h1>
        <p className="text-gray-400 text-sm mt-1">{enquiries.filter(e => e.status === 'new').length} new, {enquiries.length} total</p>
      </div>

      <div className="flex gap-3 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full bg-gray-900 border border-gray-800 text-white text-sm rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="bg-gray-900 border border-gray-800 text-white text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
        </select>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No enquiries found.</div>
        ) : (
          <div className="divide-y divide-gray-800">
            {filtered.map(e => (
              <div
                key={e.id}
                className="px-5 py-4 hover:bg-gray-800/40 flex items-start gap-4"
              >
                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => { setSelected(e); updateStatus(e.id, e.status === 'new' ? 'read' : e.status) }}>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-white font-medium text-sm">{e.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${statusStyles[e.status]}`}>{e.status}</span>
                    {e.service && <span className="text-xs text-gray-500">{e.service}</span>}
                  </div>
                  <p className="text-gray-400 text-xs">{e.email}{e.phone ? ` · ${e.phone}` : ''}</p>
                  {e.subject && <p className="text-gray-300 text-sm font-medium mt-1">{e.subject}</p>}
                  <p className="text-gray-500 text-sm truncate mt-0.5">{e.message}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-gray-600">{new Date(e.created_at).toLocaleDateString()}</span>
                  {deleteConfirm === e.id ? (
                    <div className="flex gap-1">
                      <button onClick={() => deleteEnquiry(e.id)} className="text-xs px-2 py-1 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors">Delete</button>
                      <button onClick={() => setDeleteConfirm(null)} className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">Cancel</button>
                    </div>
                  ) : (
                    <button onClick={e2 => { e2.stopPropagation(); setDeleteConfirm(e.id) }} className="text-gray-600 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-white font-bold text-lg">{selected.name}</h2>
                  <p className="text-gray-400 text-sm">{selected.email}{selected.phone ? ` · ${selected.phone}` : ''}</p>
                </div>
                <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {selected.subject && <p className="text-white font-semibold mb-2">{selected.subject}</p>}
              {selected.service && <p className="text-xs text-gray-500 mb-3">Service: {selected.service}</p>}

              <div className="bg-gray-800 rounded-xl p-4 mb-4">
                <p className="text-gray-300 text-sm whitespace-pre-wrap">{selected.message}</p>
              </div>

              <div className="flex items-center gap-2 justify-between">
                <span className="text-xs text-gray-500">{new Date(selected.created_at).toLocaleString()}</span>
                <div className="flex gap-2">
                  {(['new', 'read', 'replied'] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selected.id, s)}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-colors ${selected.status === s ? statusStyles[s] : 'border-gray-700 text-gray-500 hover:border-gray-600 hover:text-gray-400'}`}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-800">
                {deleteConfirm === selected.id ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Delete this enquiry?</span>
                    <button onClick={() => deleteEnquiry(selected.id)} className="text-xs px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors">Yes, delete</button>
                    <button onClick={() => setDeleteConfirm(null)} className="text-xs px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => setDeleteConfirm(selected.id)} className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" /> Delete enquiry
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
