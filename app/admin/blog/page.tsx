'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { revalidateAll } from '@/lib/revalidate'
import { Plus, Pencil, Trash2, Search, Eye, EyeOff, X } from 'lucide-react'
import ImageUpload from '@/components/admin/ImageUpload'
import { useAdminLang } from '@/context/AdminLangContext'

interface Post {
  id: string
  slug: string
  title_en: string
  title_tr: string | null
  excerpt_en: string | null
  excerpt_tr: string | null
  content_en: string | null
  content_tr: string | null
  image_url: string | null
  category: string | null
  author: string | null
  published: boolean
  created_at: string
}

const empty = {
  slug: '', title_en: '', title_tr: '', excerpt_en: '', excerpt_tr: '',
  content_en: '', content_tr: '', image_url: '', category: '', author: '', published: false,
}

export default function BlogPage() {
  const { t, lang } = useAdminLang()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<Post | null>(null)
  const [form, setForm] = useState({ ...empty })
  const [saving, setSaving] = useState(false)
  const [tab, setTab] = useState<'en' | 'tr'>('en')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }

  function openCreate() {
    setEditing(null)
    setForm({ ...empty })
    setTab('en')
    setModal(true)
  }

  function openEdit(p: Post) {
    setEditing(p)
    setForm({
      slug: p.slug, title_en: p.title_en, title_tr: p.title_tr || '', excerpt_en: p.excerpt_en || '',
      excerpt_tr: p.excerpt_tr || '', content_en: p.content_en || '', content_tr: p.content_tr || '',
      image_url: p.image_url || '', category: p.category || '', author: p.author || '', published: p.published,
    })
    setTab('en')
    setModal(true)
  }

  function autoSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }

  async function save() {
    if (!form.title_en || !form.slug) return
    setSaving(true)
    if (editing) {
      await supabase.from('blog_posts').update({ ...form, updated_at: new Date().toISOString() }).eq('id', editing.id)
    } else {
      await supabase.from('blog_posts').insert(form)
    }
    await load()
    setModal(false)
    setSaving(false)
    revalidateAll()
  }

  async function togglePublish(id: string, current: boolean) {
    await supabase.from('blog_posts').update({ published: !current }).eq('id', id)
    setPosts(prev => prev.map(p => p.id === id ? { ...p, published: !current } : p))
    revalidateAll()
  }

  async function deletePost(id: string) {
    await supabase.from('blog_posts').delete().eq('id', id)
    setPosts(prev => prev.filter(p => p.id !== id))
    setDeleteConfirm(null)
    revalidateAll()
  }

  const filtered = posts.filter(p =>
    `${p.title_en} ${p.title_tr} ${p.category} ${p.author}`.toLowerCase().includes(search.toLowerCase())
  )

  const inp = 'w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500'
  const lbl = 'block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5'
  const isTR = lang === 'tr'
  const categories = [
    { value: 'Exam Tips', label: isTR ? 'Sınav İpuçları' : 'Exam Tips' },
    { value: 'Career', label: isTR ? 'Kariyer' : 'Career' },
    { value: 'Learning Science', label: isTR ? 'Öğrenme Bilimi' : 'Learning Science' },
    { value: 'Student Life', label: isTR ? 'Öğrenci Hayatı' : 'Student Life' },
    { value: 'Study Abroad', label: isTR ? 'Yurt Dışı Eğitim' : 'Study Abroad' },
  ]
  const categoryLabel = (value: string | null) => categories.find(category => category.value === value)?.label || value
  const copy = {
    title: t('blogPosts'),
    count: isTR ? `${posts.length} yazı` : `${posts.length} posts`,
    search: t('search'),
    add: isTR ? 'Yeni Yazı' : 'New Post',
    loading: t('loading'),
    empty: isTR ? 'Yazı bulunamadı.' : 'No posts found.',
    published: t('published'),
    draft: t('draft'),
    by: isTR ? 'Yazar' : 'By',
    deleteTitle: isTR ? 'Bu yazı silinsin mi?' : 'Delete this post?',
    deleteDescription: t('deleteConfirm'),
    cancel: t('cancel'),
    delete: t('delete'),
    editTitle: isTR ? 'Yazıyı Düzenle' : 'Edit Post',
    addTitle: isTR ? 'Yeni Yazı' : 'New Post',
    english: t('english'),
    turkish: t('turkish'),
    titleEnPlaceholder: isTR ? 'İngilizce yazı başlığı' : 'Post title in English',
    excerptEnPlaceholder: isTR ? 'Kısa açıklama' : 'Short description',
    contentEnPlaceholder: isTR ? 'Yazı içeriği...' : 'Post content...',
    selectCategory: isTR ? 'Kategori seçin' : 'Select category',
    authorPlaceholder: isTR ? 'Yazar adı' : 'Author name',
    image: isTR ? 'Kapak Görseli' : 'Cover Image',
    imageHint: isTR
      ? 'Listede ve yazı başında görünen kapak görseli. Önerilen: 1200×630 yatay, JPG, 1MB altı. Portre ağırlıklı görsellerden kaçının.'
      : 'Blog cover shown on the listing and at the top of the post. Recommended: 1200×630px landscape, JPG, under 1MB. Avoid portraits or faces as the main subject.',
    publishedLabel: isTR ? 'Yayında' : 'Published',
    save: saving ? t('saving') : editing ? t('saveChanges') : t('createPost'),
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{copy.title}</h1>
          <p className="text-gray-400 text-sm mt-1">{copy.count}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder={copy.search} className="bg-gray-900 border border-gray-800 text-white text-sm rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-blue-500 w-48" />
          </div>
          <button onClick={openCreate} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
            <Plus className="w-4 h-4" /> {copy.add}
          </button>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">{copy.loading}</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-500">{copy.empty}</div>
        ) : (
          <div className="divide-y divide-gray-800">
            {filtered.map(p => (
              <div key={p.id} className="px-5 py-4 flex items-center gap-4 hover:bg-gray-800/20">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-white font-medium text-sm">{p.title_en}</span>
                    {p.category && <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">{categoryLabel(p.category)}</span>}
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${p.published ? 'bg-green-500/20 text-green-300' : 'bg-gray-700 text-gray-400'}`}>{p.published ? copy.published : copy.draft}</span>
                  </div>
                  {p.title_tr && <p className="text-gray-500 text-xs">{p.title_tr}</p>}
                  <p className="text-gray-600 text-xs mt-0.5">{p.author && `${copy.by} ${p.author} · `}{new Date(p.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => togglePublish(p.id, p.published)} className="text-gray-500 hover:text-white p-1.5 hover:bg-gray-800 rounded-lg transition-colors" title={p.published ? t('unpublish') : t('publish')}>
                    {p.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button onClick={() => openEdit(p)} className="text-gray-500 hover:text-white p-1.5 hover:bg-gray-800 rounded-lg transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => setDeleteConfirm(p.id)} className="text-gray-500 hover:text-red-400 p-1.5 hover:bg-gray-800 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-sm text-center">
            <p className="text-white font-semibold mb-2">{copy.deleteTitle}</p>
            <p className="text-gray-400 text-sm mb-4">{copy.deleteDescription}</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-xl border border-gray-700 text-gray-300 hover:text-white text-sm transition-colors">{copy.cancel}</button>
              <button onClick={() => deletePost(deleteConfirm)} className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors">{copy.delete}</button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-lg">{editing ? copy.editTitle : copy.addTitle}</h2>
                <button onClick={() => setModal(false)} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
              </div>

              {/* Language tabs */}
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
                      <label className={lbl}>Title (EN) *</label>
                      <input className={inp} value={form.title_en} onChange={e => { setForm(f => ({ ...f, title_en: e.target.value, slug: editing ? f.slug : autoSlug(e.target.value) })) }} placeholder={copy.titleEnPlaceholder} />
                    </div>
                    <div>
                      <label className={lbl}>Excerpt (EN)</label>
                      <textarea className={inp} rows={2} value={form.excerpt_en} onChange={e => setForm(f => ({ ...f, excerpt_en: e.target.value }))} placeholder={copy.excerptEnPlaceholder} />
                    </div>
                    <div>
                      <label className={lbl}>Content (EN)</label>
                      <textarea className={inp} rows={8} value={form.content_en} onChange={e => setForm(f => ({ ...f, content_en: e.target.value }))} placeholder={copy.contentEnPlaceholder} />
                    </div>
                  </>
                )}
                {tab === 'tr' && (
                  <>
                    <div>
                      <label className={lbl}>Title (TR)</label>
                      <input className={inp} value={form.title_tr} onChange={e => setForm(f => ({ ...f, title_tr: e.target.value }))} placeholder="Türkçe başlık" />
                    </div>
                    <div>
                      <label className={lbl}>Excerpt (TR)</label>
                      <textarea className={inp} rows={2} value={form.excerpt_tr} onChange={e => setForm(f => ({ ...f, excerpt_tr: e.target.value }))} placeholder="Kısa açıklama" />
                    </div>
                    <div>
                      <label className={lbl}>Content (TR)</label>
                      <textarea className={inp} rows={8} value={form.content_tr} onChange={e => setForm(f => ({ ...f, content_tr: e.target.value }))} placeholder="İçerik..." />
                    </div>
                  </>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={lbl}>Slug *</label>
                    <input className={inp} value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="my-post-slug" />
                  </div>
                  <div>
                    <label className={lbl}>Category</label>
                    <select className={inp} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                      <option value="">{copy.selectCategory}</option>
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>{category.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={lbl}>Author</label>
                    <input className={inp} value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} placeholder={copy.authorPlaceholder} />
                  </div>
                  <ImageUpload
                    label={copy.image}
                    folder="blog"
                    value={form.image_url ?? ''}
                    onChange={url => setForm(f => ({ ...f, image_url: url }))}
                    hint={copy.imageHint}
                  />
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <div className={`w-10 h-6 rounded-full transition-colors ${form.published ? 'bg-blue-600' : 'bg-gray-700'}`} onClick={() => setForm(f => ({ ...f, published: !f.published }))}>
                    <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-transform ${form.published ? 'translate-x-5' : 'translate-x-1'}`} />
                  </div>
                  <span className="text-sm text-gray-300">{copy.publishedLabel}</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setModal(false)} className="px-4 py-2 rounded-xl border border-gray-700 text-gray-300 hover:text-white text-sm transition-colors">{copy.cancel}</button>
                <button onClick={save} disabled={saving || !form.title_en || !form.slug} className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold transition-colors">
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
