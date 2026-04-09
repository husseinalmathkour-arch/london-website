'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { revalidateAll } from '@/lib/revalidate'
import { Plus, Pencil, Trash2, X, Star } from 'lucide-react'
import ImageUpload from '@/components/admin/ImageUpload'

interface Testimonial {
  id: string
  name: string
  role_en: string | null
  role_tr: string | null
  content_en: string
  content_tr: string | null
  avatar_url: string | null
  rating: number
  published: boolean
  featured: boolean
  sort_order: number
  created_at: string
}

const empty = { name: '', role_en: '', role_tr: '', content_en: '', content_tr: '', avatar_url: '', rating: 5, published: true, featured: false, sort_order: 0 }

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [form, setForm] = useState({ ...empty })
  const [saving, setSaving] = useState(false)
  const [tab, setTab] = useState<'en' | 'tr'>('en')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase.from('testimonials').select('*').order('sort_order').order('created_at')
    setItems(data || [])
    setLoading(false)
  }

  function openCreate() {
    setEditing(null)
    setForm({ ...empty, sort_order: items.length })
    setTab('en')
    setModal(true)
  }

  function openEdit(t: Testimonial) {
    setEditing(t)
    setForm({
      name: t.name, role_en: t.role_en || '', role_tr: t.role_tr || '',
      content_en: t.content_en, content_tr: t.content_tr || '', avatar_url: t.avatar_url || '',
      rating: t.rating, published: t.published, featured: t.featured, sort_order: t.sort_order,
    })
    setTab('en')
    setModal(true)
  }

  async function save() {
    if (!form.name || !form.content_en) return
    setSaving(true)
    if (editing) {
      await supabase.from('testimonials').update(form).eq('id', editing.id)
    } else {
      await supabase.from('testimonials').insert(form)
    }
    await load()
    setModal(false)
    setSaving(false)
    revalidateAll()
  }

  async function deleteItem(id: string) {
    await supabase.from('testimonials').delete().eq('id', id)
    setItems(prev => prev.filter(i => i.id !== id))
    setDeleteConfirm(null)
    revalidateAll()
  }

  async function togglePublish(id: string, current: boolean) {
    await supabase.from('testimonials').update({ published: !current }).eq('id', id)
    setItems(prev => prev.map(i => i.id === id ? { ...i, published: !current } : i))
    revalidateAll()
  }

  const featuredCount = items.filter(i => i.featured).length

  async function toggleFeatured(id: string, current: boolean) {
    if (!current && featuredCount >= 6) return
    await supabase.from('testimonials').update({ featured: !current }).eq('id', id)
    setItems(prev => prev.map(i => i.id === id ? { ...i, featured: !current } : i))
    revalidateAll()
  }

  const inp = 'w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500'
  const lbl = 'block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5'

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Testimonials</h1>
          <p className="text-gray-400 text-sm mt-1">
            {items.length} testimonials &middot;{' '}
            <span className={featuredCount >= 6 ? 'text-yellow-400 font-semibold' : 'text-gray-500'}>
              {featuredCount}/6 showing on homepage
            </span>
          </p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {loading ? (
          [...Array(3)].map((_, i) => <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 h-40 animate-pulse" />)
        ) : items.length === 0 ? (
          <div className="col-span-3 bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center text-gray-500">No testimonials yet.</div>
        ) : items.map(t => (
          <div key={t.id} className={`bg-gray-900 border rounded-2xl p-5 ${t.published ? 'border-gray-800' : 'border-gray-800 opacity-60'}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {t.avatar_url ? (
                  <img src={t.avatar_url} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">{t.name[0]}</div>
                )}
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  {t.role_en && <p className="text-gray-500 text-xs">{t.role_en}</p>}
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(t)} className="text-gray-600 hover:text-white p-1 rounded-lg hover:bg-gray-800 transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={() => setDeleteConfirm(t.id)} className="text-gray-600 hover:text-red-400 p-1 rounded-lg hover:bg-gray-800 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <div className="flex gap-0.5 mb-2">
              {[1,2,3,4,5].map(n => <Star key={n} className={`w-3 h-3 ${n <= t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-700'}`} />)}
            </div>
            <p className="text-gray-400 text-sm line-clamp-3">{t.content_en}</p>
            <p className="text-gray-600 text-xs mt-2">{new Date(t.created_at).toLocaleDateString()}</p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${t.published ? 'bg-green-500/20 text-green-300' : 'bg-gray-700 text-gray-400'}`}>{t.published ? 'Visible' : 'Hidden'}</span>
                {t.featured && <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-yellow-500/20 text-yellow-300">Homepage</span>}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleFeatured(t.id, t.featured)}
                  disabled={!t.featured && featuredCount >= 6}
                  title={!t.featured && featuredCount >= 6 ? 'Homepage is full (6/6). Remove another first.' : ''}
                  className={`text-xs transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${t.featured ? 'text-yellow-400 hover:text-gray-400' : 'text-gray-500 hover:text-yellow-400'}`}
                >
                  {t.featured ? '★ Homepage' : '☆ Homepage'}
                </button>
                <button onClick={() => togglePublish(t.id, t.published)} className="text-xs text-gray-500 hover:text-white transition-colors">{t.published ? 'Hide' : 'Show'}</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-sm text-center">
            <p className="text-white font-semibold mb-2">Delete this testimonial?</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-xl border border-gray-700 text-gray-300 text-sm">Cancel</button>
              <button onClick={() => deleteItem(deleteConfirm)} className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-lg">{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
                <button onClick={() => setModal(false)} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
              </div>

              <div className="flex border-b border-gray-800 mb-5">
                {(['en', 'tr'] as const).map(l => (
                  <button key={l} onClick={() => setTab(l)} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab === l ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>
                    {l === 'en' ? 'English' : 'Turkish'}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <label className={lbl}>Name *</label>
                  <input className={inp} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Student name" />
                </div>

                {tab === 'en' && (
                  <>
                    <div>
                      <label className={lbl}>Role / Title (EN)</label>
                      <input className={inp} value={form.role_en} onChange={e => setForm(f => ({ ...f, role_en: e.target.value }))} placeholder="e.g. B2 Student, London" />
                    </div>
                    <div>
                      <label className={lbl}>Testimonial (EN) *</label>
                      <textarea className={inp} rows={4} value={form.content_en} onChange={e => setForm(f => ({ ...f, content_en: e.target.value }))} placeholder="What they said..." />
                    </div>
                  </>
                )}
                {tab === 'tr' && (
                  <>
                    <div>
                      <label className={lbl}>Role / Title (TR)</label>
                      <input className={inp} value={form.role_tr} onChange={e => setForm(f => ({ ...f, role_tr: e.target.value }))} placeholder="örn. B2 Öğrencisi, Londra" />
                    </div>
                    <div>
                      <label className={lbl}>Testimonial (TR)</label>
                      <textarea className={inp} rows={4} value={form.content_tr} onChange={e => setForm(f => ({ ...f, content_tr: e.target.value }))} placeholder="Türkçe yorum..." />
                    </div>
                  </>
                )}

                <ImageUpload
                  label="Avatar"
                  folder="testimonials"
                  value={form.avatar_url ?? ''}
                  onChange={url => setForm(f => ({ ...f, avatar_url: url }))}
                  hint="Square photo of the student. Recommended: 200×200px, JPG/PNG, under 500KB."
                />

                <div>
                  <label className={lbl}>Rating</label>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map(n => (
                      <button key={n} type="button" onClick={() => setForm(f => ({ ...f, rating: n }))} className="focus:outline-none">
                        <Star className={`w-6 h-6 ${n <= form.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className={`w-10 h-6 rounded-full transition-colors ${form.published ? 'bg-blue-600' : 'bg-gray-700'}`} onClick={() => setForm(f => ({ ...f, published: !f.published }))}>
                      <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-transform ${form.published ? 'translate-x-5' : 'translate-x-1'}`} />
                    </div>
                    <span className="text-sm text-gray-300">Visible on website</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div
                      className={`w-10 h-6 rounded-full transition-colors ${form.featured ? 'bg-yellow-500' : 'bg-gray-700'} ${!form.featured && featuredCount >= 6 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                      onClick={() => {
                        if (!form.featured && featuredCount >= 6) return
                        setForm(f => ({ ...f, featured: !f.featured }))
                      }}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-transform ${form.featured ? 'translate-x-5' : 'translate-x-1'}`} />
                    </div>
                    <div>
                      <span className="text-sm text-gray-300">Show on homepage</span>
                      {!form.featured && featuredCount >= 6 && (
                        <p className="text-xs text-yellow-500 mt-0.5">Homepage full (6/6). Remove another first.</p>
                      )}
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setModal(false)} className="px-4 py-2 rounded-xl border border-gray-700 text-gray-300 text-sm">Cancel</button>
                <button onClick={save} disabled={saving || !form.name || !form.content_en} className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold transition-colors">
                  {saving ? 'Saving...' : editing ? 'Save Changes' : 'Add Testimonial'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
