'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { revalidateAll } from '@/lib/revalidate'
import { Plus, Pencil, Trash2, X, Eye, EyeOff } from 'lucide-react'
import { useAdminLang } from '@/context/AdminLangContext'

interface Level {
  name: string
  description: string
}

interface Course {
  id: string
  title_en: string
  title_tr: string | null
  description_en: string | null
  description_tr: string | null
  category: string | null
  price: string | null
  duration: string | null
  level: string | null
  class_size: string | null
  features_en: string[]
  features_tr: string[]
  levels_en: Level[]
  levels_tr: Level[]
  image_url: string | null
  popular: boolean
  published: boolean
  sort_order: number
  created_at: string
}

const empty = {
  title_en: '', title_tr: '', description_en: '', description_tr: '',
  category: '', price: '', duration: '', level: '', class_size: '',
  features_en: [] as string[], features_tr: [] as string[],
  levels_en: [] as Level[], levels_tr: [] as Level[],
  image_url: '', popular: false, published: true, sort_order: 0,
}

const emptyLevel: Level = { name: '', description: '' }

export default function CoursesPage() {
  const { lang, t } = useAdminLang()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<Course | null>(null)
  const [form, setForm] = useState({ ...empty })
  const [featuresEnText, setFeaturesEnText] = useState('')
  const [featuresTrText, setFeaturesTrText] = useState('')
  const [levelsEn, setLevelsEn] = useState<Level[]>([])
  const [levelsTr, setLevelsTr] = useState<Level[]>([])
  const [saving, setSaving] = useState(false)
  const [tab, setTab] = useState<'en' | 'tr'>('en')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase.from('courses').select('*').order('sort_order').order('created_at')
    setCourses(data || [])
    setLoading(false)
  }

  function openCreate() {
    setEditing(null)
    setForm({ ...empty, sort_order: courses.length })
    setFeaturesEnText('')
    setFeaturesTrText('')
    setLevelsEn([])
    setLevelsTr([])
    setTab('en')
    setModal(true)
  }

  function openEdit(c: Course) {
    setEditing(c)
    setForm({
      title_en: c.title_en, title_tr: c.title_tr || '', description_en: c.description_en || '',
      description_tr: c.description_tr || '', category: c.category || '', price: c.price || '',
      duration: c.duration || '', level: c.level || '', class_size: c.class_size || '',
      features_en: c.features_en || [], features_tr: c.features_tr || [],
      levels_en: c.levels_en || [], levels_tr: c.levels_tr || [],
      image_url: c.image_url || '', popular: c.popular,
      published: c.published, sort_order: c.sort_order,
    })
    setFeaturesEnText((c.features_en || []).join('\n'))
    setFeaturesTrText((c.features_tr || []).join('\n'))
    setLevelsEn(c.levels_en || [])
    setLevelsTr(c.levels_tr || [])
    setTab('en')
    setModal(true)
  }

  async function save() {
    if (!form.title_en) return
    setSaving(true)
    const payload = {
      ...form,
      features_en: featuresEnText.split('\n').map(s => s.trim()).filter(Boolean),
      features_tr: featuresTrText.split('\n').map(s => s.trim()).filter(Boolean),
      levels_en: levelsEn.filter(l => l.name.trim()),
      levels_tr: levelsTr.filter(l => l.name.trim()),
    }
    if (editing) {
      await supabase.from('courses').update(payload).eq('id', editing.id)
    } else {
      await supabase.from('courses').insert(payload)
    }
    await load()
    setModal(false)
    setSaving(false)
    revalidateAll()
  }

  async function deleteCourse(id: string) {
    await supabase.from('courses').delete().eq('id', id)
    setCourses(prev => prev.filter(c => c.id !== id))
    setDeleteConfirm(null)
    revalidateAll()
  }

  async function togglePublish(id: string, current: boolean) {
    await supabase.from('courses').update({ published: !current }).eq('id', id)
    setCourses(prev => prev.map(c => c.id === id ? { ...c, published: !current } : c))
    revalidateAll()
  }

  function updateLevelEn(i: number, field: keyof Level, value: string) {
    setLevelsEn(prev => prev.map((l, idx) => idx === i ? { ...l, [field]: value } : l))
  }

  function updateLevelTr(i: number, field: keyof Level, value: string) {
    setLevelsTr(prev => prev.map((l, idx) => idx === i ? { ...l, [field]: value } : l))
  }

  const inp = 'w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500'
  const lbl = 'block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5'
  const copy = lang === 'tr'
    ? {
        title: 'Kurslar',
        count: 'kurs',
        addCourse: 'Kurs Ekle',
        loading: 'Yükleniyor...',
        noCourses: 'Henüz kurs yok.',
        popular: 'Popüler',
        maxStudents: 'Maks. {count} öğrenci',
        levels: 'seviye',
        added: 'Eklendi',
        deleteConfirm: 'Bu kurs silinsin mi?',
        delete: 'Sil',
        cancel: t('cancel'),
        editCourse: 'Kursu Düzenle',
        newCourse: 'Yeni Kurs',
        english: t('english'),
        turkish: t('turkish'),
        titleEn: 'Başlık (İngilizce) *',
        descEn: 'Açıklama (İngilizce)',
        featuresEn: 'Özellikler (İngilizce) — her satıra bir tane',
        levelsEn: 'Kurs Seviyeleri (İngilizce)',
        addLevel: 'Seviye Ekle',
        noLevels: 'Henüz seviye eklenmedi.',
        levelNameEn: 'Seviye adı (örn. Newcomer)',
        levelDesc: 'Seviye açıklaması',
        titleTr: 'Başlık (Türkçe)',
        descTr: 'Açıklama (Türkçe)',
        featuresTr: 'Özellikler (Türkçe) — her satıra bir tane',
        levelsTr: 'Kurs Seviyeleri (Türkçe)',
        category: 'Kategori',
        classSize: 'Sınıf Mevcudu (maks. öğrenci)',
        price: 'Fiyat',
        duration: 'Süre',
        level: 'Seviye',
        imageUrl: 'Görsel URL',
        published: 'Yayımlandı',
        popularToggle: 'Popüler Olarak İşaretle',
        addCourseButton: 'Kurs Ekle',
        courseNamePlaceholder: 'Kurs adı',
        courseDescPlaceholder: 'Kurs açıklaması',
        featuresEnPlaceholder: 'Küçük sınıflar\nAna dili İngilizce olan eğitmenler\nSertifika dahil',
        featuresTrPlaceholder: 'Küçük sınıflar\nAna dili İngilizce olan eğitmenler\nSertifika dahil',
        categoryPlaceholder: 'örn. İngilizce',
        classSizePlaceholder: 'örn. 12',
        pricePlaceholder: 'örn. £299/ay',
        durationPlaceholder: 'örn. 12 hafta',
        levelPlaceholder: 'örn. Başlangıç, Tüm seviyeler',
        levelNameTr: 'Seviye adı (örn. Yeni Başlayan)',
      }
    : {
        title: 'Courses',
        count: 'courses',
        addCourse: 'Add Course',
        loading: 'Loading...',
        noCourses: 'No courses yet.',
        popular: 'Popular',
        maxStudents: 'Max {count} students',
        levels: 'levels',
        added: 'Added',
        deleteConfirm: 'Delete this course?',
        delete: 'Delete',
        cancel: 'Cancel',
        editCourse: 'Edit Course',
        newCourse: 'New Course',
        english: 'English',
        turkish: 'Turkish',
        titleEn: 'Title (EN) *',
        descEn: 'Description (EN)',
        featuresEn: 'Features (EN) — one per line',
        levelsEn: 'Course Levels (EN)',
        addLevel: 'Add Level',
        noLevels: 'No levels added yet.',
        levelNameEn: 'Level name (e.g. Newcomer)',
        levelDesc: 'Level description',
        titleTr: 'Title (TR)',
        descTr: 'Description (TR)',
        featuresTr: 'Features (TR) — one per line',
        levelsTr: 'Course Levels (TR)',
        category: 'Category',
        classSize: 'Class Size (max students)',
        price: 'Price',
        duration: 'Duration',
        level: 'Level',
        imageUrl: 'Image URL',
        published: 'Published',
        popularToggle: 'Mark as Popular',
        addCourseButton: 'Add Course',
        courseNamePlaceholder: 'Course name',
        courseDescPlaceholder: 'Course description',
        featuresEnPlaceholder: 'Small class sizes\nNative teachers\nCertificate included',
        featuresTrPlaceholder: 'Small class sizes\nNative teachers\nCertificate included',
        categoryPlaceholder: 'e.g. English',
        classSizePlaceholder: 'e.g. 12',
        pricePlaceholder: 'e.g. £299/month',
        durationPlaceholder: 'e.g. 12 weeks',
        levelPlaceholder: 'e.g. Beginner, All levels',
        levelNameTr: 'Level name (e.g. Beginner)',
      }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{copy.title}</h1>
          <p className="text-gray-400 text-sm mt-1">{courses.length} {copy.count}</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
          <Plus className="w-4 h-4" /> {copy.addCourse}
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">{copy.loading}</div>
        ) : courses.length === 0 ? (
          <div className="p-8 text-center text-gray-500">{copy.noCourses}</div>
        ) : (
          <div className="divide-y divide-gray-800">
            {courses.map(c => (
              <div key={c.id} className="px-5 py-4 flex items-center gap-4 hover:bg-gray-800/20">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="text-white font-medium text-sm">{c.title_en}</span>
                    {c.category && <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">{c.category}</span>}
                    {c.popular && <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full font-semibold">{copy.popular}</span>}
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${c.published ? 'bg-green-500/20 text-green-300' : 'bg-gray-700 text-gray-400'}`}>{c.published ? t('published') : t('hidden')}</span>
                  </div>
                  <div className="flex gap-3 text-gray-500 text-xs mt-0.5">
                    {c.price && <span>{c.price}</span>}
                    {c.duration && <span>· {c.duration}</span>}
                    {c.level && <span>· {c.level}</span>}
                    {c.class_size && <span>· {copy.maxStudents.replace('{count}', c.class_size)}</span>}
                    {(c.levels_en?.length > 0) && <span>· {c.levels_en.length} {copy.levels}</span>}
                    <span className="text-gray-600">· {copy.added} {new Date(c.created_at).toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-GB')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => togglePublish(c.id, c.published)} className="text-gray-500 hover:text-white p-1.5 hover:bg-gray-800 rounded-lg transition-colors">
                    {c.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button onClick={() => openEdit(c)} className="text-gray-500 hover:text-white p-1.5 hover:bg-gray-800 rounded-lg transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => setDeleteConfirm(c.id)} className="text-gray-500 hover:text-red-400 p-1.5 hover:bg-gray-800 rounded-lg transition-colors">
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
            <p className="text-white font-semibold mb-2">{copy.deleteConfirm}</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-xl border border-gray-700 text-gray-300 text-sm">{copy.cancel}</button>
              <button onClick={() => deleteCourse(deleteConfirm)} className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold">{copy.delete}</button>
            </div>
          </div>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-lg">{editing ? copy.editCourse : copy.newCourse}</h2>
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
                      <label className={lbl}>{copy.titleEn}</label>
                      <input className={inp} value={form.title_en} onChange={e => setForm(f => ({ ...f, title_en: e.target.value }))} placeholder={copy.courseNamePlaceholder} />
                    </div>
                    <div>
                      <label className={lbl}>{copy.descEn}</label>
                      <textarea className={inp} rows={3} value={form.description_en} onChange={e => setForm(f => ({ ...f, description_en: e.target.value }))} placeholder={copy.courseDescPlaceholder} />
                    </div>
                    <div>
                      <label className={lbl}>{copy.featuresEn}</label>
                      <textarea className={inp} rows={4} value={featuresEnText} onChange={e => setFeaturesEnText(e.target.value)} placeholder={copy.featuresEnPlaceholder} />
                    </div>

                    {/* Levels EN */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className={lbl + ' mb-0'}>{copy.levelsEn}</label>
                        <button
                          type="button"
                          onClick={() => setLevelsEn(prev => [...prev, { ...emptyLevel }])}
                          className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> {copy.addLevel}
                        </button>
                      </div>
                      {levelsEn.length === 0 && (
                        <p className="text-xs text-gray-600 italic">{copy.noLevels}</p>
                      )}
                      <div className="space-y-3">
                        {levelsEn.map((level, i) => (
                          <div key={i} className="bg-gray-800 rounded-xl p-3 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 w-5 text-center font-bold">{i + 1}</span>
                              <input
                                className="flex-1 bg-gray-700 border border-gray-600 text-white placeholder-gray-500 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
                                value={level.name}
                                onChange={e => updateLevelEn(i, 'name', e.target.value)}
                                placeholder={copy.levelNameEn}
                              />
                              <button
                                type="button"
                                onClick={() => setLevelsEn(prev => prev.filter((_, idx) => idx !== i))}
                                className="text-gray-600 hover:text-red-400 p-1"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <textarea
                              className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-500 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 resize-none"
                              rows={2}
                              value={level.description}
                              onChange={e => updateLevelEn(i, 'description', e.target.value)}
                              placeholder={copy.levelDesc}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {tab === 'tr' && (
                  <>
                    <div>
                      <label className={lbl}>{copy.titleTr}</label>
                      <input className={inp} value={form.title_tr} onChange={e => setForm(f => ({ ...f, title_tr: e.target.value }))} placeholder="Kurs adı" />
                    </div>
                    <div>
                      <label className={lbl}>{copy.descTr}</label>
                      <textarea className={inp} rows={3} value={form.description_tr} onChange={e => setForm(f => ({ ...f, description_tr: e.target.value }))} placeholder="Kurs açıklaması" />
                    </div>
                    <div>
                      <label className={lbl}>{copy.featuresTr}</label>
                      <textarea className={inp} rows={4} value={featuresTrText} onChange={e => setFeaturesTrText(e.target.value)} placeholder="Küçük sınıflar&#10;Ana dil konuşanlar&#10;Sertifika dahil" />
                    </div>

                    {/* Levels TR */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className={lbl + ' mb-0'}>{copy.levelsTr}</label>
                        <button
                          type="button"
                          onClick={() => setLevelsTr(prev => [...prev, { ...emptyLevel }])}
                          className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> {copy.addLevel}
                        </button>
                      </div>
                      {levelsTr.length === 0 && (
                        <p className="text-xs text-gray-600 italic">{copy.noLevels}</p>
                      )}
                      <div className="space-y-3">
                        {levelsTr.map((level, i) => (
                          <div key={i} className="bg-gray-800 rounded-xl p-3 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 w-5 text-center font-bold">{i + 1}</span>
                              <input
                                className="flex-1 bg-gray-700 border border-gray-600 text-white placeholder-gray-500 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
                                value={level.name}
                                onChange={e => updateLevelTr(i, 'name', e.target.value)}
                                placeholder={copy.levelNameTr}
                              />
                              <button
                                type="button"
                                onClick={() => setLevelsTr(prev => prev.filter((_, idx) => idx !== i))}
                                className="text-gray-600 hover:text-red-400 p-1"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <textarea
                              className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-500 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 resize-none"
                              rows={2}
                              value={level.description}
                              onChange={e => updateLevelTr(i, 'description', e.target.value)}
                              placeholder={copy.levelDesc}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={lbl}>{copy.category}</label>
                    <input className={inp} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder={copy.categoryPlaceholder} />
                  </div>
                  <div>
                    <label className={lbl}>{copy.classSize}</label>
                    <input className={inp} value={form.class_size} onChange={e => setForm(f => ({ ...f, class_size: e.target.value }))} placeholder={copy.classSizePlaceholder} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={lbl}>{copy.price}</label>
                    <input className={inp} value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder={copy.pricePlaceholder} />
                  </div>
                  <div>
                    <label className={lbl}>{copy.duration}</label>
                    <input className={inp} value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} placeholder={copy.durationPlaceholder} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={lbl}>{copy.level}</label>
                    <input className={inp} value={form.level} onChange={e => setForm(f => ({ ...f, level: e.target.value }))} placeholder={copy.levelPlaceholder} />
                  </div>
                  <div>
                    <label className={lbl}>{copy.imageUrl}</label>
                    <input className={inp} value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="https://..." />
                  </div>
                </div>

                <div className="flex gap-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className={`w-10 h-6 rounded-full transition-colors ${form.published ? 'bg-blue-600' : 'bg-gray-700'}`} onClick={() => setForm(f => ({ ...f, published: !f.published }))}>
                      <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-transform ${form.published ? 'translate-x-5' : 'translate-x-1'}`} />
                    </div>
                    <span className="text-sm text-gray-300">{copy.published}</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className={`w-10 h-6 rounded-full transition-colors ${form.popular ? 'bg-yellow-500' : 'bg-gray-700'}`} onClick={() => setForm(f => ({ ...f, popular: !f.popular }))}>
                      <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-transform ${form.popular ? 'translate-x-5' : 'translate-x-1'}`} />
                    </div>
                    <span className="text-sm text-gray-300">{copy.popularToggle}</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setModal(false)} className="px-4 py-2 rounded-xl border border-gray-700 text-gray-300 text-sm">{copy.cancel}</button>
                <button onClick={save} disabled={saving || !form.title_en} className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold transition-colors">
                  {saving ? t('saving') : editing ? t('saveChanges') : copy.addCourseButton}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
