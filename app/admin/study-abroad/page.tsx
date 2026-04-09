'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { revalidateAll } from '@/lib/revalidate'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import ImageUpload from '@/components/admin/ImageUpload'

interface Program {
  id: string
  city: string
  country: string | null
  flag: string | null
  language: string | null
  duration: string | null
  price: string | null
  description_en: string | null
  description_tr: string | null
  highlights_en: string[]
  highlights_tr: string[]
  image_url: string | null
  published: boolean
  sort_order: number
  created_at: string
}

const empty = {
  city: '', country: '', flag: '', language: '', duration: '', price: '',
  description_en: '', description_tr: '', highlights_en: [] as string[], highlights_tr: [] as string[],
  image_url: '', published: true, sort_order: 0,
}

export default function StudyAbroadPage() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<Program | null>(null)
  const [form, setForm] = useState({ ...empty })
  const [highlightsEnText, setHighlightsEnText] = useState('')
  const [highlightsTrText, setHighlightsTrText] = useState('')
  const [saving, setSaving] = useState(false)
  const [tab, setTab] = useState<'en' | 'tr'>('en')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase.from('study_abroad_programs').select('*').order('sort_order').order('created_at')
    setPrograms(data || [])
    setLoading(false)
  }

  function openCreate() {
    setEditing(null)
    setForm({ ...empty, sort_order: programs.length })
    setHighlightsEnText('')
    setHighlightsTrText('')
    setTab('en')
    setModal(true)
  }

  function openEdit(p: Program) {
    setEditing(p)
    setForm({
      city: p.city, country: p.country || '', flag: p.flag || '', language: p.language || '',
      duration: p.duration || '', price: p.price || '', description_en: p.description_en || '',
      description_tr: p.description_tr || '', highlights_en: p.highlights_en || [],
      highlights_tr: p.highlights_tr || [], image_url: p.image_url || '',
      published: p.published, sort_order: p.sort_order,
    })
    setHighlightsEnText((p.highlights_en || []).join('\n'))
    setHighlightsTrText((p.highlights_tr || []).join('\n'))
    setTab('en')
    setModal(true)
  }

  async function save() {
    if (!form.city) return
    setSaving(true)
    const payload = {
      ...form,
      highlights_en: highlightsEnText.split('\n').map(s => s.trim()).filter(Boolean),
      highlights_tr: highlightsTrText.split('\n').map(s => s.trim()).filter(Boolean),
    }
    if (editing) {
      await supabase.from('study_abroad_programs').update(payload).eq('id', editing.id)
    } else {
      await supabase.from('study_abroad_programs').insert(payload)
    }
    await load()
    setModal(false)
    setSaving(false)
    revalidateAll()
  }

  async function deleteProgram(id: string) {
    await supabase.from('study_abroad_programs').delete().eq('id', id)
    setPrograms(prev => prev.filter(p => p.id !== id))
    setDeleteConfirm(null)
    revalidateAll()
  }

  async function togglePublish(id: string, current: boolean) {
    await supabase.from('study_abroad_programs').update({ published: !current }).eq('id', id)
    setPrograms(prev => prev.map(p => p.id === id ? { ...p, published: !current } : p))
    revalidateAll()
  }

  const inp = 'w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500'
  const lbl = 'block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5'

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Study Abroad Programs</h1>
          <p className="text-gray-400 text-sm mt-1">{programs.length} programs</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
          <Plus className="w-4 h-4" /> Add Program
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {loading ? (
          [...Array(3)].map((_, i) => <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 h-40 animate-pulse" />)
        ) : programs.length === 0 ? (
          <div className="col-span-3 bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center text-gray-500">No programs yet.</div>
        ) : programs.map(p => (
          <div key={p.id} className={`bg-gray-900 border rounded-2xl p-5 ${p.published ? 'border-gray-800' : 'border-gray-800 opacity-60'}`}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {p.flag && <span className="text-2xl">{p.flag}</span>}
                  <p className="text-white font-semibold">{p.city}</p>
                </div>
                {p.country && <p className="text-gray-500 text-xs">{p.country}{p.language ? ` · ${p.language}` : ''}</p>}
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(p)} className="text-gray-600 hover:text-white p-1 rounded-lg hover:bg-gray-800 transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={() => setDeleteConfirm(p.id)} className="text-gray-600 hover:text-red-400 p-1 rounded-lg hover:bg-gray-800 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <div className="flex gap-3 text-xs text-gray-500 mb-2">
              {p.duration && <span>⏱ {p.duration}</span>}
              {p.price && <span>💰 {p.price}</span>}
            </div>
            {p.description_en && <p className="text-gray-400 text-sm line-clamp-2">{p.description_en}</p>}
            <p className="text-gray-600 text-xs mt-2">{new Date(p.created_at).toLocaleDateString()}</p>
            <div className="flex items-center justify-between mt-2">
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${p.published ? 'bg-green-500/20 text-green-300' : 'bg-gray-700 text-gray-400'}`}>{p.published ? 'Visible' : 'Hidden'}</span>
              <button onClick={() => togglePublish(p.id, p.published)} className="text-xs text-gray-500 hover:text-white transition-colors">{p.published ? 'Hide' : 'Show'}</button>
            </div>
          </div>
        ))}
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-sm text-center">
            <p className="text-white font-semibold mb-2">Delete this program?</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-xl border border-gray-700 text-gray-300 text-sm">Cancel</button>
              <button onClick={() => deleteProgram(deleteConfirm)} className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-lg">{editing ? 'Edit Program' : 'Add Program'}</h2>
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
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className={lbl}>Flag emoji</label>
                    <input className={inp} value={form.flag} onChange={e => setForm(f => ({ ...f, flag: e.target.value }))} placeholder="🇬🇧" />
                  </div>
                  <div className="col-span-2">
                    <label className={lbl}>City *</label>
                    <input className={inp} value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} placeholder="London" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={lbl}>Country</label>
                    <input className={inp} value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))} placeholder="United Kingdom" />
                  </div>
                  <div>
                    <label className={lbl}>Language</label>
                    <input className={inp} value={form.language} onChange={e => setForm(f => ({ ...f, language: e.target.value }))} placeholder="English" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={lbl}>Duration</label>
                    <input className={inp} value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} placeholder="2-12 weeks" />
                  </div>
                  <div>
                    <label className={lbl}>Price from</label>
                    <input className={inp} value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="£1,200" />
                  </div>
                </div>

                {tab === 'en' && (
                  <>
                    <div>
                      <label className={lbl}>Description (EN)</label>
                      <textarea className={inp} rows={3} value={form.description_en} onChange={e => setForm(f => ({ ...f, description_en: e.target.value }))} placeholder="Program description..." />
                    </div>
                    <div>
                      <label className={lbl}>Highlights (EN) — one per line</label>
                      <textarea className={inp} rows={4} value={highlightsEnText} onChange={e => setHighlightsEnText(e.target.value)} placeholder="Accommodation included&#10;Airport pickup&#10;Cultural trips" />
                    </div>
                  </>
                )}
                {tab === 'tr' && (
                  <>
                    <div>
                      <label className={lbl}>Description (TR)</label>
                      <textarea className={inp} rows={3} value={form.description_tr} onChange={e => setForm(f => ({ ...f, description_tr: e.target.value }))} placeholder="Program açıklaması..." />
                    </div>
                    <div>
                      <label className={lbl}>Highlights (TR) — one per line</label>
                      <textarea className={inp} rows={4} value={highlightsTrText} onChange={e => setHighlightsTrText(e.target.value)} placeholder="Konaklama dahil&#10;Havalimanı transferi&#10;Kültürel geziler" />
                    </div>
                  </>
                )}

                <ImageUpload
                  label="Image"
                  folder="study-abroad"
                  value={form.image_url ?? ''}
                  onChange={url => setForm(f => ({ ...f, image_url: url }))}
                  hint="Destination or programme photo. Recommended: 1200×800px landscape, JPG, under 1MB."
                />

                <label className="flex items-center gap-3 cursor-pointer">
                  <div className={`w-10 h-6 rounded-full transition-colors ${form.published ? 'bg-blue-600' : 'bg-gray-700'}`} onClick={() => setForm(f => ({ ...f, published: !f.published }))}>
                    <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-transform ${form.published ? 'translate-x-5' : 'translate-x-1'}`} />
                  </div>
                  <span className="text-sm text-gray-300">Visible on website</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setModal(false)} className="px-4 py-2 rounded-xl border border-gray-700 text-gray-300 text-sm">Cancel</button>
                <button onClick={save} disabled={saving || !form.city} className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold transition-colors">
                  {saving ? 'Saving...' : editing ? 'Save Changes' : 'Add Program'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
