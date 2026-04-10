'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { revalidateAll } from '@/lib/revalidate'
import { Plus, Pencil, Trash2, X, MapPin } from 'lucide-react'
import ImageUpload from '@/components/admin/ImageUpload'
import { useAdminLang } from '@/context/AdminLangContext'

interface Branch {
  id: string
  name_en: string
  name_tr: string | null
  address_en: string | null
  address_tr: string | null
  city: string | null
  country: string | null
  phone: string | null
  email: string | null
  whatsapp: string | null
  maps_url: string | null
  hours: string | null
  image_url: string | null
  published: boolean
  sort_order: number
  created_at: string
}

const empty = {
  name_en: '', name_tr: '', address_en: '', address_tr: '', city: '', country: '',
  phone: '', email: '', whatsapp: '', maps_url: '', hours: '', image_url: '', published: true, sort_order: 0,
}

export default function BranchesPage() {
  const { t, lang } = useAdminLang()
  const [branches, setBranches] = useState<Branch[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<Branch | null>(null)
  const [form, setForm] = useState({ ...empty })
  const [saving, setSaving] = useState(false)
  const [tab, setTab] = useState<'en' | 'tr'>('en')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase.from('branches').select('*').order('sort_order').order('created_at')
    setBranches(data || [])
    setLoading(false)
  }

  function openCreate() {
    setEditing(null)
    setForm({ ...empty, sort_order: branches.length })
    setTab('en')
    setModal(true)
  }

  function openEdit(b: Branch) {
    setEditing(b)
    setForm({
      name_en: b.name_en, name_tr: b.name_tr || '', address_en: b.address_en || '',
      address_tr: b.address_tr || '', city: b.city || '', country: b.country || '',
      phone: b.phone || '', email: b.email || '', whatsapp: b.whatsapp || '',
      maps_url: b.maps_url || '', hours: b.hours || '', image_url: b.image_url || '',
      published: b.published, sort_order: b.sort_order,
    })
    setTab('en')
    setModal(true)
  }

  async function save() {
    if (!form.name_en) return
    setSaving(true)
    if (editing) {
      await supabase.from('branches').update(form).eq('id', editing.id)
    } else {
      await supabase.from('branches').insert(form)
    }
    await load()
    setModal(false)
    setSaving(false)
    revalidateAll()
  }

  async function deleteBranch(id: string) {
    await supabase.from('branches').delete().eq('id', id)
    setBranches(prev => prev.filter(b => b.id !== id))
    setDeleteConfirm(null)
    revalidateAll()
  }

  async function togglePublish(id: string, current: boolean) {
    await supabase.from('branches').update({ published: !current }).eq('id', id)
    setBranches(prev => prev.map(b => b.id === id ? { ...b, published: !current } : b))
    revalidateAll()
  }

  const inp = 'w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500'
  const lbl = 'block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5'
  const isTR = lang === 'tr'
  const copy = {
    title: t('branches'),
    count: isTR ? `${branches.length} konum` : `${branches.length} locations`,
    add: isTR ? 'Şube Ekle' : 'Add Branch',
    noBranches: isTR ? 'Henüz şube yok.' : 'No branches yet.',
    visible: t('visible'),
    hidden: t('hidden'),
    show: t('show'),
    hide: t('hide'),
    deleteTitle: isTR ? 'Bu şube silinsin mi?' : 'Delete this branch?',
    delete: t('delete'),
    cancel: t('cancel'),
    editTitle: isTR ? 'Şubeyi Düzenle' : 'Edit Branch',
    addTitle: isTR ? 'Şube Ekle' : 'Add Branch',
    english: isTR ? 'İngilizce' : 'English',
    turkish: isTR ? 'Türkçe' : 'Turkish',
    branchNameEn: isTR ? 'Şube Adı (EN)' : 'Branch Name (EN)',
    branchNameTr: isTR ? 'Şube Adı (TR)' : 'Branch Name (TR)',
    addressEn: isTR ? 'Adres (EN)' : 'Address (EN)',
    addressTr: isTR ? 'Adres (TR)' : 'Address (TR)',
    city: isTR ? 'Şehir' : 'City',
    country: isTR ? 'Ülke' : 'Country',
    maps: isTR ? 'Google Harita URL' : 'Google Maps URL',
    hours: isTR ? 'Çalışma Saatleri' : 'Opening Hours',
    image: isTR ? 'Görsel' : 'Image',
    imageHint: isTR
      ? 'Şube dışı veya içi fotoğrafı. Önerilen: 1200×800 yatay, JPG, 1MB altı.'
      : 'Photo of the branch exterior or interior. Recommended: 1200×800px landscape, JPG, under 1MB.',
    visibleOnWebsite: isTR ? 'Web sitesinde göster' : 'Visible on website',
    save: saving ? t('saving') : editing ? t('saveChanges') : (isTR ? 'Şube Ekle' : 'Add Branch'),
    branchPlaceholder: isTR ? 'örn. Londra Şubesi' : 'e.g. London Branch',
    addressEnPlaceholder: isTR ? 'İngilizce tam adres' : 'Full address in English',
    addressTrPlaceholder: isTR ? 'Türkçe adres' : 'Full address in Turkish',
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
        ) : branches.length === 0 ? (
          <div className="col-span-3 bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center text-gray-500">{copy.noBranches}</div>
        ) : branches.map(b => (
          <div key={b.id} className={`bg-gray-900 border rounded-2xl p-5 ${b.published ? 'border-gray-800' : 'border-gray-800 opacity-60'}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{b.name_en}</p>
                  {b.city && <p className="text-gray-500 text-xs">{b.city}{b.country ? `, ${b.country}` : ''}</p>}
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(b)} className="text-gray-600 hover:text-white p-1 rounded-lg hover:bg-gray-800 transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={() => setDeleteConfirm(b.id)} className="text-gray-600 hover:text-red-400 p-1 rounded-lg hover:bg-gray-800 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            {b.address_en && <p className="text-gray-400 text-sm mb-2">{b.address_en}</p>}
            <div className="space-y-1">
              {b.phone && <p className="text-gray-500 text-xs">📞 {b.phone}</p>}
              {b.email && <p className="text-gray-500 text-xs">✉️ {b.email}</p>}
              {b.whatsapp && <p className="text-gray-500 text-xs">💬 {b.whatsapp}</p>}
            </div>
            <p className="text-gray-600 text-xs mt-2">{new Date(b.created_at).toLocaleDateString()}</p>
            <div className="flex items-center justify-between mt-2">
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${b.published ? 'bg-green-500/20 text-green-300' : 'bg-gray-700 text-gray-400'}`}>{b.published ? copy.visible : copy.hidden}</span>
              <button onClick={() => togglePublish(b.id, b.published)} className="text-xs text-gray-500 hover:text-white transition-colors">{b.published ? copy.hide : copy.show}</button>
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
              <button onClick={() => deleteBranch(deleteConfirm)} className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold">{copy.delete}</button>
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
                {tab === 'en' && (
                  <>
                    <div>
                      <label className={lbl}>{copy.branchNameEn} *</label>
                      <input className={inp} value={form.name_en} onChange={e => setForm(f => ({ ...f, name_en: e.target.value }))} placeholder={copy.branchPlaceholder} />
                    </div>
                    <div>
                      <label className={lbl}>{copy.addressEn}</label>
                      <textarea className={inp} rows={2} value={form.address_en} onChange={e => setForm(f => ({ ...f, address_en: e.target.value }))} placeholder={copy.addressEnPlaceholder} />
                    </div>
                  </>
                )}
                {tab === 'tr' && (
                  <>
                    <div>
                      <label className={lbl}>{copy.branchNameTr}</label>
                      <input className={inp} value={form.name_tr} onChange={e => setForm(f => ({ ...f, name_tr: e.target.value }))} placeholder={copy.branchPlaceholder} />
                    </div>
                    <div>
                      <label className={lbl}>{copy.addressTr}</label>
                      <textarea className={inp} rows={2} value={form.address_tr} onChange={e => setForm(f => ({ ...f, address_tr: e.target.value }))} placeholder={copy.addressTrPlaceholder} />
                    </div>
                  </>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={lbl}>{copy.city}</label>
                    <input className={inp} value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} placeholder="London" />
                  </div>
                  <div>
                    <label className={lbl}>{copy.country}</label>
                    <input className={inp} value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))} placeholder="UK" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={lbl}>{t('phone')}</label>
                    <input className={inp} value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+44 ..." />
                  </div>
                  <div>
                    <label className={lbl}>WhatsApp</label>
                    <input className={inp} value={form.whatsapp} onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))} placeholder="+44 ..." />
                  </div>
                </div>

                <div>
                  <label className={lbl}>{t('email')}</label>
                  <input className={inp} type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="branch@example.com" />
                </div>

                <div>
                  <label className={lbl}>{copy.maps}</label>
                  <input className={inp} value={form.maps_url} onChange={e => setForm(f => ({ ...f, maps_url: e.target.value }))} placeholder="https://maps.google.com/..." />
                </div>

                <div>
                  <label className={lbl}>{copy.hours}</label>
                  <input className={inp} value={form.hours} onChange={e => setForm(f => ({ ...f, hours: e.target.value }))} placeholder="09:00 – 23:00" />
                </div>

                <ImageUpload
                  label={copy.image}
                  folder="branches"
                  value={form.image_url ?? ''}
                  onChange={url => setForm(f => ({ ...f, image_url: url }))}
                  hint={copy.imageHint}
                />

                <label className="flex items-center gap-3 cursor-pointer">
                  <div className={`w-10 h-6 rounded-full transition-colors ${form.published ? 'bg-blue-600' : 'bg-gray-700'}`} onClick={() => setForm(f => ({ ...f, published: !f.published }))}>
                    <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-transform ${form.published ? 'translate-x-5' : 'translate-x-1'}`} />
                  </div>
                  <span className="text-sm text-gray-300">{copy.visibleOnWebsite}</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setModal(false)} className="px-4 py-2 rounded-xl border border-gray-700 text-gray-300 text-sm">{copy.cancel}</button>
                <button onClick={save} disabled={saving || !form.name_en} className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold transition-colors">
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
