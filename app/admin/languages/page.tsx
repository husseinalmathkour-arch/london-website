'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { revalidateAll } from '@/lib/revalidate'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import ImageUpload from '@/components/admin/ImageUpload'

interface Language {
  id: string
  name_en: string
  name_tr: string | null
  flag: string | null
  level_en: string | null
  level_tr: string | null
  description_en: string | null
  description_tr: string | null
  students: number
  color: string | null
  image_url: string | null
  published: boolean
  sort_order: number
  created_at: string
}

const empty = {
  name_en: '', name_tr: '', flag: '', level_en: '', level_tr: '', description_en: '', description_tr: '',
  students: 0, color: '', image_url: '', published: true, sort_order: 0,
}

export default function LanguagesPage() {
  const [langs, setLangs] = useState<Language[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<Language | null>(null)
  const [form, setForm] = useState({ ...empty })
  const [saving, setSaving] = useState(false)
  const [tab, setTab] = useState<'en' | 'tr'>('en')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase.from('languages_offered').select('*').order('sort_order').order('created_at')
    setLangs(data || [])
    setLoading(false)
  }

  function openCreate() {
    setEditing(null)
    setForm({ ...empty, sort_order: langs.length })
    setTab('en')
    setModal(true)
  }

  function openEdit(l: Language) {
    setEditing(l)
    setForm({
      name_en: l.name_en, name_tr: l.name_tr || '', flag: l.flag || '',
      level_en: l.level_en || '', level_tr: l.level_tr || '',
      description_en: l.description_en || '', description_tr: l.description_tr || '',
      students: l.students, color: l.color || '', image_url: l.image_url || '',
      published: l.published, sort_order: l.sort_order,
    })
    setTab('en')
    setModal(true)
  }

  async function save() {
    if (!form.name_en) return
    setSaving(true)
    if (editing) {
      await supabase.from('languages_offered').update(form).eq('id', editing.id)
    } else {
      await supabase.from('languages_offered').insert(form)
    }
    await load()
    setModal(false)
    setSaving(false)
    revalidateAll()
  }

  async function deleteLang(id: string) {
    await supabase.from('languages_offered').delete().eq('id', id)
    setLangs(prev => prev.filter(l => l.id !== id))
    setDeleteConfirm(null)
    revalidateAll()
  }

  async function togglePublish(id: string, current: boolean) {
    await supabase.from('languages_offered').update({ published: !current }).eq('id', id)
    setLangs(prev => prev.map(l => l.id === id ? { ...l, published: !current } : l))
    revalidateAll()
  }

  const inp = 'w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500'
  const lbl = 'block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5'

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Languages Offered</h1>
          <p className="text-gray-400 text-sm mt-1">{langs.length} languages</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
          <Plus className="w-4 h-4" /> Add Language
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading ? (
          [...Array(4)].map((_, i) => <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 h-32 animate-pulse" />)
        ) : langs.length === 0 ? (
          <div className="col-span-4 bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center text-gray-500">No languages yet.</div>
        ) : langs.map(l => (
          <div key={l.id} className={`bg-gray-900 border rounded-2xl p-4 ${l.published ? 'border-gray-800' : 'border-gray-800 opacity-60'}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {l.flag && <span className="text-2xl">{l.flag}</span>}
                <p className="text-white font-semibold text-sm">{l.name_en}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(l)} className="text-gray-600 hover:text-white p-1 rounded hover:bg-gray-800 transition-colors"><Pencil className="w-3 h-3" /></button>
                <button onClick={() => setDeleteConfirm(l.id)} className="text-gray-600 hover:text-red-400 p-1 rounded hover:bg-gray-800 transition-colors"><Trash2 className="w-3 h-3" /></button>
              </div>
            </div>
            {l.level_en && <p className="text-gray-500 text-xs mb-1">{l.level_en}</p>}
            {l.students > 0 && <p className="text-gray-600 text-xs">{l.students.toLocaleString()} students</p>}
            <p className="text-gray-600 text-xs">{new Date(l.created_at).toLocaleDateString()}</p>
            <div className="flex items-center justify-between mt-2">
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${l.published ? 'bg-green-500/20 text-green-300' : 'bg-gray-700 text-gray-400'}`}>{l.published ? 'On' : 'Off'}</span>
              <button onClick={() => togglePublish(l.id, l.published)} className="text-xs text-gray-500 hover:text-white transition-colors">{l.published ? 'Hide' : 'Show'}</button>
            </div>
          </div>
        ))}
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-sm text-center">
            <p className="text-white font-semibold mb-2">Delete this language?</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-xl border border-gray-700 text-gray-300 text-sm">Cancel</button>
              <button onClick={() => deleteLang(deleteConfirm)} className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-lg">{editing ? 'Edit Language' : 'Add Language'}</h2>
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
                    <label className={lbl}>Name (EN) *</label>
                    <input className={inp} value={form.name_en} onChange={e => setForm(f => ({ ...f, name_en: e.target.value }))} placeholder="English" />
                  </div>
                </div>

                {tab === 'en' && (
                  <>
                    <div>
                      <label className={lbl}>Level / Tag (EN)</label>
                      <input className={inp} value={form.level_en} onChange={e => setForm(f => ({ ...f, level_en: e.target.value }))} placeholder="A1 to C2" />
                    </div>
                    <div>
                      <label className={lbl}>Description (EN)</label>
                      <textarea className={inp} rows={3} value={form.description_en} onChange={e => setForm(f => ({ ...f, description_en: e.target.value }))} placeholder="Brief description in English" />
                    </div>
                  </>
                )}
                {tab === 'tr' && (
                  <>
                    <div>
                      <label className={lbl}>Name (TR)</label>
                      <input className={inp} value={form.name_tr} onChange={e => setForm(f => ({ ...f, name_tr: e.target.value }))} placeholder="İngilizce" />
                    </div>
                    <div>
                      <label className={lbl}>Level / Tag (TR)</label>
                      <input className={inp} value={form.level_tr} onChange={e => setForm(f => ({ ...f, level_tr: e.target.value }))} placeholder="A1'den C2'ye" />
                    </div>
                    <div>
                      <label className={lbl}>Description (TR)</label>
                      <textarea className={inp} rows={3} value={form.description_tr} onChange={e => setForm(f => ({ ...f, description_tr: e.target.value }))} placeholder="Türkçe açıklama" />
                    </div>
                  </>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={lbl}>Students</label>
                    <input type="number" className={inp} value={form.students} onChange={e => setForm(f => ({ ...f, students: +e.target.value }))} />
                  </div>
                  <div>
                    <label className={lbl}>Color (Tailwind)</label>
                    <input className={inp} value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))} placeholder="blue" />
                  </div>
                </div>

                <ImageUpload
                  label="Image"
                  folder="languages"
                  value={form.image_url ?? ''}
                  onChange={url => setForm(f => ({ ...f, image_url: url }))}
                  hint="Photo representing the language's country or culture (e.g. a landmark or cityscape). Recommended: 800×500px landscape, JPG, under 700KB."
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
                <button onClick={save} disabled={saving || !form.name_en} className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold transition-colors">
                  {saving ? 'Saving...' : editing ? 'Save Changes' : 'Add Language'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
