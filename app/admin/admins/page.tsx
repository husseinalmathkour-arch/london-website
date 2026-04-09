'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Trash2, X, Shield, ShieldCheck } from 'lucide-react'

interface Admin {
  id: string
  email: string
  full_name: string | null
  role: 'admin' | 'super_admin'
  created_at: string
}

export default function AdminsPage() {
  const [admins, setAdmins] = useState<Admin[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ email: '', full_name: '', password: '', role: 'admin' as 'admin' | 'super_admin' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState<Admin | null>(null)
  const [currentUserId, setCurrentUserId] = useState<string>('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setCurrentUserId(data.session.user.id)
    })
    load()
  }, [])

  async function load() {
    const { data } = await supabase.from('admin_users').select('*').order('created_at')
    setAdmins(data || [])
    setLoading(false)
  }

  async function createAdmin() {
    if (!form.email || !form.password || !form.full_name) return
    setSaving(true)
    setError('')

    const { data: sessionData } = await supabase.auth.getSession()
    const token = sessionData.session?.access_token
    const res = await fetch('/api/admin/create-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(form),
    })

    const json = await res.json()
    if (!res.ok) {
      setError(json.error || 'Failed to create admin.')
      setSaving(false)
      return
    }

    await load()
    setModal(false)
    setForm({ email: '', full_name: '', password: '', role: 'admin' })
    setSaving(false)
  }

  async function deleteAdmin(admin: Admin) {
    // Only delete from admin_users — auth user remains but can't access admin
    await supabase.from('admin_users').delete().eq('id', admin.id)
    setAdmins(prev => prev.filter(a => a.id !== admin.id))
    setDeleteConfirm(null)
  }

  async function toggleRole(admin: Admin) {
    const newRole = admin.role === 'admin' ? 'super_admin' : 'admin'
    await supabase.from('admin_users').update({ role: newRole }).eq('id', admin.id)
    setAdmins(prev => prev.map(a => a.id === admin.id ? { ...a, role: newRole } : a))
  }

  const inp = 'w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500'
  const lbl = 'block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5'

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Users</h1>
          <p className="text-gray-400 text-sm mt-1">{admins.length} administrators</p>
        </div>
        <button onClick={() => { setModal(true); setError('') }} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
          <Plus className="w-4 h-4" /> Add Admin
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 bg-gray-900 border border-gray-800 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span className="text-white text-sm font-semibold">Super Admin</span>
          </div>
          <p className="text-gray-500 text-xs">Full access — can manage all content and create or remove admin users.</p>
        </div>
        <div className="flex-1 bg-gray-900 border border-gray-800 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-gray-400" />
            <span className="text-white text-sm font-semibold">Admin</span>
          </div>
          <p className="text-gray-500 text-xs">Can manage all content — blog, courses, enquiries, etc. Cannot create or remove admin users.</p>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : admins.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No admins found.</div>
        ) : (
          <div className="divide-y divide-gray-800">
            {admins.map(a => (
              <div key={a.id} className="px-5 py-4 flex items-center gap-4 hover:bg-gray-800/20">
                <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                  {a.role === 'super_admin'
                    ? <ShieldCheck className="w-5 h-5 text-blue-400" />
                    : <Shield className="w-5 h-5 text-gray-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium text-sm">{a.full_name || 'Unnamed'}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${a.role === 'super_admin' ? 'bg-blue-500/20 text-blue-300' : 'bg-gray-700 text-gray-400'}`}>
                      {a.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                    </span>
                    {a.id === currentUserId && <span className="text-xs text-gray-600">(you)</span>}
                  </div>
                  <p className="text-gray-500 text-xs">{a.email}</p>
                  <p className="text-gray-600 text-xs mt-0.5">Joined {new Date(a.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  {a.id !== currentUserId && (
                    <>
                      <button
                        onClick={() => toggleRole(a)}
                        className="text-xs text-gray-500 hover:text-white border border-gray-700 hover:border-gray-600 px-3 py-1.5 rounded-lg transition-colors"
                        title={a.role === 'admin' ? 'Promote to Super Admin' : 'Change to Admin'}
                      >
                        {a.role === 'admin' ? 'Make Super Admin' : 'Make Admin'}
                      </button>
                      <button onClick={() => setDeleteConfirm(a)} className="text-gray-500 hover:text-red-400 p-1.5 hover:bg-gray-800 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-sm text-center">
            <p className="text-white font-semibold mb-1">Remove admin access?</p>
            <p className="text-gray-400 text-sm mb-4">{deleteConfirm.full_name || deleteConfirm.email} will lose access to the admin panel.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-xl border border-gray-700 text-gray-300 text-sm">Cancel</button>
              <button onClick={() => deleteAdmin(deleteConfirm)} className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold">Remove</button>
            </div>
          </div>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-lg">Add Admin User</h2>
                <button onClick={() => setModal(false)} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={lbl}>Full Name *</label>
                  <input className={inp} value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))} placeholder="John Smith" />
                </div>
                <div>
                  <label className={lbl}>Email *</label>
                  <input type="email" className={inp} value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="admin@example.com" />
                </div>
                <div>
                  <label className={lbl}>Password *</label>
                  <input type="password" className={inp} value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="Min 8 characters" />
                </div>
                <div>
                  <label className={lbl}>Role</label>
                  <select className={inp} value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value as 'admin' | 'super_admin' }))}>
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>

                {error && <p className="text-red-400 text-sm bg-red-950/30 border border-red-800 rounded-xl px-4 py-3">{error}</p>}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setModal(false)} className="px-4 py-2 rounded-xl border border-gray-700 text-gray-300 text-sm">Cancel</button>
                <button onClick={createAdmin} disabled={saving || !form.email || !form.password || !form.full_name} className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold transition-colors">
                  {saving ? 'Creating...' : 'Create Admin'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
