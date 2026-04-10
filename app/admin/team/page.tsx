'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import ImageUpload from '@/components/admin/ImageUpload'
import { useAdminLang } from '@/context/AdminLangContext'

interface TeamMember {
  id: string
  name: string
  role_en: string | null
  role_tr: string | null
  bio_en: string | null
  bio_tr: string | null
  avatar_url: string | null
  languages: string[]
  experience: string | null
  published: boolean
  sort_order: number
  created_at: string
}

const empty = { name: '', role_en: '', role_tr: '', bio_en: '', bio_tr: '', avatar_url: '', languages: [] as string[], experience: '', published: true, sort_order: 0 }

export default function TeamPage() {
  const { t, lang } = useAdminLang()
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<TeamMember | null>(null)
  const [form, setForm] = useState({ ...empty })
  const [languagesText, setLanguagesText] = useState('')
  const [saving, setSaving] = useState(false)
  const [tab, setTab] = useState<'en' | 'tr'>('en')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase.from('team_members').select('*').order('sort_order').order('created_at')
    setMembers(data || [])
    setLoading(false)
  }

  function openCreate() {
    setEditing(null)
    setForm({ ...empty, sort_order: members.length })
    setLanguagesText('')
    setTab('en')
    setModal(true)
  }

  function openEdit(m: TeamMember) {
    setEditing(m)
    setForm({
      name: m.name, role_en: m.role_en || '', role_tr: m.role_tr || '',
      bio_en: m.bio_en || '', bio_tr: m.bio_tr || '', avatar_url: m.avatar_url || '',
      languages: m.languages || [], experience: m.experience || '',
      published: m.published, sort_order: m.sort_order,
    })
    setLanguagesText((m.languages || []).join(', '))
    setTab('en')
    setModal(true)
  }

  async function save() {
    if (!form.name) return
    setSaving(true)
    const payload = { ...form, languages: languagesText.split(',').map(s => s.trim()).filter(Boolean) }
    if (editing) {
      await supabase.from('team_members').update(payload).eq('id', editing.id)
    } else {
      await supabase.from('team_members').insert(payload)
    }
    await load()
    setModal(false)
    setSaving(false)
  }

  async function deleteMember(id: string) {
    await supabase.from('team_members').delete().eq('id', id)
    setMembers(prev => prev.filter(m => m.id !== id))
    setDeleteConfirm(null)
  }

  async function togglePublish(id: string, current: boolean) {
    await supabase.from('team_members').update({ published: !current }).eq('id', id)
    setMembers(prev => prev.map(m => m.id === id ? { ...m, published: !current } : m))
  }

  const inp = 'w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500'
  const lbl = 'block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5'
  const isTR = lang === 'tr'
  const copy = {
    title: isTR ? 'Ekip Üyeleri' : 'Team Members',
    count: isTR ? `${members.length} üye` : `${members.length} members`,
    add: isTR ? 'Üye Ekle' : 'Add Member',
    empty: isTR ? 'Henüz ekip üyesi yok.' : 'No team members yet.',
    visible: t('visible'),
    hidden: t('hidden'),
    hide: t('hide'),
    show: t('show'),
    deleteTitle: isTR ? 'Bu ekip üyesi silinsin mi?' : 'Delete this team member?',
    cancel: t('cancel'),
    delete: t('delete'),
    editTitle: isTR ? 'Üyeyi Düzenle' : 'Edit Member',
    addTitle: isTR ? 'Üye Ekle' : 'Add Member',
    english: t('english'),
    turkish: t('turkish'),
    name: t('name'),
    namePlaceholder: isTR ? 'Ad Soyad' : 'Full name',
    roleEn: isTR ? 'Rol / Ünvan (EN)' : 'Role / Title (EN)',
    roleTr: isTR ? 'Rol / Ünvan (TR)' : 'Role / Title (TR)',
    bioEn: isTR ? 'Biyografi (EN)' : 'Bio (EN)',
    bioTr: isTR ? 'Biyografi (TR)' : 'Bio (TR)',
    avatar: isTR ? 'Avatar' : 'Avatar',
    avatarHint: isTR
      ? 'Ekip üyesinin profesyonel vesikalık fotoğrafı. Önerilen: 400×400 kare, JPG/PNG, 500KB altı.'
      : 'Professional headshot of the team member. Recommended: 400×400px square, JPG/PNG, under 500KB.',
    languages: isTR ? 'Diller (virgülle ayırın)' : 'Languages (comma separated)',
    experience: isTR ? 'Deneyim' : 'Experience',
    visibleOnWebsite: isTR ? 'Web sitesinde göster' : 'Visible on website',
    save: saving ? t('saving') : editing ? t('saveChanges') : (isTR ? 'Üye Ekle' : 'Add Member'),
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{copy.title}</h1>
          <p className="text-gray-400 text-sm mt-1">{copy.count}</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
          <Plus className="w-4 h-4" /> {copy.add}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {loading ? (
          [...Array(3)].map((_, i) => <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 h-40 animate-pulse" />)
        ) : members.length === 0 ? (
          <div className="col-span-3 bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center text-gray-500">{copy.empty}</div>
        ) : members.map(m => (
          <div key={m.id} className={`bg-gray-900 border rounded-2xl p-5 ${m.published ? 'border-gray-800' : 'border-gray-800 opacity-60'}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {m.avatar_url ? (
                  <img src={m.avatar_url} alt={m.name} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">{m.name[0]}</div>
                )}
                <div>
                  <p className="text-white font-semibold text-sm">{m.name}</p>
                  {(isTR ? m.role_tr : m.role_en) && <p className="text-gray-400 text-xs">{isTR ? m.role_tr : m.role_en}</p>}
                  {m.experience && <p className="text-gray-600 text-xs">{m.experience}</p>}
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(m)} className="text-gray-600 hover:text-white p-1 rounded-lg hover:bg-gray-800 transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={() => setDeleteConfirm(m.id)} className="text-gray-600 hover:text-red-400 p-1 rounded-lg hover:bg-gray-800 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            {m.languages && m.languages.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {m.languages.map(l => <span key={l} className="text-xs bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full">{l}</span>)}
              </div>
            )}
            {(isTR ? m.bio_tr : m.bio_en) && <p className="text-gray-400 text-sm line-clamp-2">{isTR ? m.bio_tr : m.bio_en}</p>}
            <p className="text-gray-600 text-xs mt-2">{new Date(m.created_at).toLocaleDateString()}</p>
            <div className="flex items-center justify-between mt-2">
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${m.published ? 'bg-green-500/20 text-green-300' : 'bg-gray-700 text-gray-400'}`}>{m.published ? copy.visible : copy.hidden}</span>
              <button onClick={() => togglePublish(m.id, m.published)} className="text-xs text-gray-500 hover:text-white transition-colors">{m.published ? copy.hide : copy.show}</button>
            </div>
          </div>
        ))}
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-sm text-center">
            <p className="text-white font-semibold mb-2">{copy.deleteTitle}</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-xl border border-gray-700 text-gray-300 text-sm">{copy.cancel}</button>
              <button onClick={() => deleteMember(deleteConfirm)} className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold">{copy.delete}</button>
            </div>
          </div>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-lg">{editing ? copy.editTitle : copy.addTitle}</h2>
                <button onClick={() => setModal(false)} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
              </div>

              <div className="flex border-b border-gray-800 mb-5">
                {(['en', 'tr'] as const).map(l => (
                  <button key={l} onClick={() => setTab(l)} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab === l ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>
                    {l === 'en' ? copy.english : copy.turkish}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <label className={lbl}>{copy.name} *</label>
                  <input className={inp} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder={copy.namePlaceholder} />
                </div>

                {tab === 'en' && (
                  <>
                    <div>
                      <label className={lbl}>{copy.roleEn}</label>
                      <input className={inp} value={form.role_en} onChange={e => setForm(f => ({ ...f, role_en: e.target.value }))} placeholder="e.g. English Teacher" />
                    </div>
                    <div>
                      <label className={lbl}>{copy.bioEn}</label>
                      <textarea className={inp} rows={4} value={form.bio_en} onChange={e => setForm(f => ({ ...f, bio_en: e.target.value }))} placeholder="Short biography..." />
                    </div>
                  </>
                )}
                {tab === 'tr' && (
                  <>
                    <div>
                      <label className={lbl}>{copy.roleTr}</label>
                      <input className={inp} value={form.role_tr} onChange={e => setForm(f => ({ ...f, role_tr: e.target.value }))} placeholder="örn. İngilizce Öğretmeni" />
                    </div>
                    <div>
                      <label className={lbl}>{copy.bioTr}</label>
                      <textarea className={inp} rows={4} value={form.bio_tr} onChange={e => setForm(f => ({ ...f, bio_tr: e.target.value }))} placeholder="Kısa biyografi..." />
                    </div>
                  </>
                )}

                <ImageUpload
                  label={copy.avatar}
                  folder="team"
                  value={form.avatar_url ?? ''}
                  onChange={url => setForm(f => ({ ...f, avatar_url: url }))}
                  hint={copy.avatarHint}
                />

                <div>
                  <label className={lbl}>{copy.languages}</label>
                  <input className={inp} value={languagesText} onChange={e => setLanguagesText(e.target.value)} placeholder="English, Spanish, Turkish" />
                </div>

                <div>
                  <label className={lbl}>{copy.experience}</label>
                  <input className={inp} value={form.experience} onChange={e => setForm(f => ({ ...f, experience: e.target.value }))} placeholder="e.g. 8 years" />
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <div className={`w-10 h-6 rounded-full transition-colors ${form.published ? 'bg-blue-600' : 'bg-gray-700'}`} onClick={() => setForm(f => ({ ...f, published: !f.published }))}>
                    <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-transform ${form.published ? 'translate-x-5' : 'translate-x-1'}`} />
                  </div>
                  <span className="text-sm text-gray-300">{copy.visibleOnWebsite}</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setModal(false)} className="px-4 py-2 rounded-xl border border-gray-700 text-gray-300 text-sm">{copy.cancel}</button>
                <button onClick={save} disabled={saving || !form.name} className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold transition-colors">
                  {copy.save}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
