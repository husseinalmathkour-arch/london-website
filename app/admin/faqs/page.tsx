'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { revalidateAll } from '@/lib/revalidate'
import { Plus, Pencil, Trash2, X, GripVertical } from 'lucide-react'

interface FAQ {
  id: string
  question_en: string
  question_tr: string | null
  answer_en: string
  answer_tr: string | null
  category: string | null
  sort_order: number
  published: boolean
  created_at: string
}

const empty = { question_en: '', question_tr: '', answer_en: '', answer_tr: '', category: '', sort_order: 0, published: true }

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<FAQ | null>(null)
  const [form, setForm] = useState({ ...empty })
  const [saving, setSaving] = useState(false)
  const [tab, setTab] = useState<'en' | 'tr'>('en')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase.from('faqs').select('*').order('sort_order').order('created_at')
    setFaqs(data || [])
    setLoading(false)
  }

  function openCreate() {
    setEditing(null)
    setForm({ ...empty, sort_order: faqs.length })
    setTab('en')
    setModal(true)
  }

  function openEdit(f: FAQ) {
    setEditing(f)
    setForm({
      question_en: f.question_en, question_tr: f.question_tr || '', answer_en: f.answer_en,
      answer_tr: f.answer_tr || '', category: f.category || '', sort_order: f.sort_order, published: f.published,
    })
    setTab('en')
    setModal(true)
  }

  async function save() {
    if (!form.question_en || !form.answer_en) return
    setSaving(true)
    if (editing) {
      await supabase.from('faqs').update(form).eq('id', editing.id)
    } else {
      await supabase.from('faqs').insert(form)
    }
    await load()
    setModal(false)
    setSaving(false)
    revalidateAll()
  }

  async function deleteFaq(id: string) {
    await supabase.from('faqs').delete().eq('id', id)
    setFaqs(prev => prev.filter(f => f.id !== id))
    setDeleteConfirm(null)
    revalidateAll()
  }

  async function togglePublish(id: string, current: boolean) {
    await supabase.from('faqs').update({ published: !current }).eq('id', id)
    setFaqs(prev => prev.map(f => f.id === id ? { ...f, published: !current } : f))
    revalidateAll()
  }

  const inp = 'w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500'
  const lbl = 'block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5'

  const categories = Array.from(new Set(faqs.map(f => f.category).filter(Boolean)))

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">FAQs</h1>
          <p className="text-gray-400 text-sm mt-1">{faqs.length} questions</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
          <Plus className="w-4 h-4" /> Add FAQ
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : faqs.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No FAQs yet. Add your first one!</div>
        ) : (
          <div className="divide-y divide-gray-800">
            {faqs.map(f => (
              <div key={f.id} className="px-5 py-4 flex items-start gap-4 hover:bg-gray-800/20">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white font-medium text-sm">{f.question_en}</p>
                    {f.category && <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">{f.category}</span>}
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${f.published ? 'bg-green-500/20 text-green-300' : 'bg-gray-700 text-gray-400'}`}>{f.published ? 'Visible' : 'Hidden'}</span>
                  </div>
                  {f.question_tr && <p className="text-gray-500 text-xs mb-1">{f.question_tr}</p>}
                  <p className="text-gray-400 text-sm line-clamp-2">{f.answer_en}</p>
                  <p className="text-gray-600 text-xs mt-1">{new Date(f.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => togglePublish(f.id, f.published)} className={`p-1.5 rounded-lg text-xs font-semibold transition-colors ${f.published ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-white'} hover:bg-gray-800`} title="Toggle visibility">
                    {f.published ? '●' : '○'}
                  </button>
                  <button onClick={() => openEdit(f)} className="text-gray-500 hover:text-white p-1.5 hover:bg-gray-800 rounded-lg transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => setDeleteConfirm(f.id)} className="text-gray-500 hover:text-red-400 p-1.5 hover:bg-gray-800 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-sm text-center">
            <p className="text-white font-semibold mb-2">Delete this FAQ?</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-xl border border-gray-700 text-gray-300 text-sm">Cancel</button>
              <button onClick={() => deleteFaq(deleteConfirm)} className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-lg">{editing ? 'Edit FAQ' : 'New FAQ'}</h2>
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
                {tab === 'en' && (
                  <>
                    <div>
                      <label className={lbl}>Question (EN) *</label>
                      <input className={inp} value={form.question_en} onChange={e => setForm(f => ({ ...f, question_en: e.target.value }))} placeholder="Question in English" />
                    </div>
                    <div>
                      <label className={lbl}>Answer (EN) *</label>
                      <textarea className={inp} rows={5} value={form.answer_en} onChange={e => setForm(f => ({ ...f, answer_en: e.target.value }))} placeholder="Answer in English" />
                    </div>
                  </>
                )}
                {tab === 'tr' && (
                  <>
                    <div>
                      <label className={lbl}>Question (TR)</label>
                      <input className={inp} value={form.question_tr} onChange={e => setForm(f => ({ ...f, question_tr: e.target.value }))} placeholder="Türkçe soru" />
                    </div>
                    <div>
                      <label className={lbl}>Answer (TR)</label>
                      <textarea className={inp} rows={5} value={form.answer_tr} onChange={e => setForm(f => ({ ...f, answer_tr: e.target.value }))} placeholder="Türkçe cevap" />
                    </div>
                  </>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={lbl}>Category</label>
                    <input className={inp} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="e.g. General, Courses" list="cats" />
                    <datalist id="cats">{categories.map(c => <option key={c} value={c!} />)}</datalist>
                  </div>
                  <div>
                    <label className={lbl}>Sort Order</label>
                    <input type="number" className={inp} value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: +e.target.value }))} />
                  </div>
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <div className={`w-10 h-6 rounded-full transition-colors ${form.published ? 'bg-blue-600' : 'bg-gray-700'}`} onClick={() => setForm(f => ({ ...f, published: !f.published }))}>
                    <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-transform ${form.published ? 'translate-x-5' : 'translate-x-1'}`} />
                  </div>
                  <span className="text-sm text-gray-300">Visible on website</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setModal(false)} className="px-4 py-2 rounded-xl border border-gray-700 text-gray-300 text-sm">Cancel</button>
                <button onClick={save} disabled={saving || !form.question_en || !form.answer_en} className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold transition-colors">
                  {saving ? 'Saving...' : editing ? 'Save Changes' : 'Add FAQ'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
