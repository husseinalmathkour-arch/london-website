'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { revalidateAll } from '@/lib/revalidate'
import { Save, Trash2, Check } from 'lucide-react'

type LocaleKey = 'en' | 'tr'

interface LevelData {
  name: string
  group: string
  hours: string
  duration: string
  description: string
}

const defaultLevels: Record<LocaleKey, LevelData[]> = {
  en: [
    { name: 'Newcomer', group: 'Beginner', hours: '16', duration: '2 weeks', description: 'This level is designed for those who have never encountered English before. The aim is to establish the foundations of English before moving on to the next level.' },
    { name: 'Freshman', group: 'Elementary', hours: '144', duration: '3 months', description: 'This is where your real English education begins. Focus is on listening, speaking, reading and writing. Education is conducted 100% in English.' },
    { name: 'Climber', group: 'Pre-Intermediate', hours: '144', duration: '3 months', description: 'You will begin participating in English conversations with ease. Reading skills are emphasised to develop vocabulary. You will have two teachers — one native speaker and one foreign teacher.' },
    { name: 'Transitional', group: 'Intermediate', hours: '144', duration: '3 months', description: 'You can now call yourself an English speaker. You can express yourself easily and understand almost everything. You can start preparing for IELTS and TOEFL.' },
    { name: 'Superb', group: 'Upper Intermediate', hours: '144', duration: '3 months', description: 'You are now officially an English speaker. You can watch films without subtitles and speak idiomatically. If you are not aiming for an academic career, your general English education ends here.' },
    { name: 'Proficient', group: 'Advanced', hours: '136', duration: '2.5 months', description: 'If you are planning an academic career or want to prepare for IELTS or TOEFL, this level is for you. Significantly expand your vocabulary and gain a major advantage in your professional life.' },
  ],
  tr: [
    { name: 'Newcomer', group: 'Beginner', hours: '16', duration: '2 weeks', description: 'Bu seviye, daha önce hiç İngilizce ile tanışmamış ve herhangi bir İngilizce eğitimi almamış kişiler için tasarlanmıştır. Bu seviyenin amacı, bir sonraki seviyeye geçmeden önce İngilizceyi temellerini sağlamaktır.' },
    { name: 'Freshman', group: 'Elementary', hours: '144', duration: '3 months', description: 'Gerçek İngilizce eğitiminizin başladığı yer burasıdır. Odak, dilin dört ana iletişim becerisi olan dinleme, konuşma, okuma ve yazma üzerine olacaktır. Cümle kurmayı ve İngilizce yapılarını doğru bir şekilde kullanmayı öğreneceksiniz. Eğitim %100 İngilizce olarak gerçekleştirilmektedir.' },
    { name: 'Climber', group: 'Pre-Intermediate', hours: '144', duration: '3 months', description: 'Bu seviyede, İngilizce konuşmalara katılmaya başlar ve diğer insanları anlamakta zorlanmazsınız. Okuma becerilerinize büyük önem verilecek, bu da metinleri anlamanıza ve kelime dağarcığınızı geliştirmenize yardımcı olacaktır. Bu seviyede biri ana dili İngilizce olan, diğeri yabancı iki öğretmeniniz olacak.' },
    { name: 'Transitional', group: 'Intermediate', hours: '144', duration: '3 months', description: 'Bu seviyede kendinize İngilizce konuşan biri diyebilirsiniz. Bu aşamada kendinizi kolaylıkla ifade edebilir ve neredeyse her şeyi anlayabilirsiniz. Bu seviyeye ulaştığınızda IELTS ve TOEFL gibi sınavlara hazırlanmaya başlayabilirsiniz.' },
    { name: 'Superb', group: 'Upper Intermediate', hours: '144', duration: '3 months', description: 'Artık resmi olarak bir İngilizce konuşansınız. Altyazısız film izleyebilir ve rahatlıkla deyimlerle konuşabilirsiniz. Eğer akademik bir İngilizce kariyeri hedeflemiyorsanız, genel İngilizce eğitiminiz burada sona eriyor.' },
    { name: 'Proficient', group: 'Advanced', hours: '136', duration: '2.5 months', description: 'Akademik bir kariyer planlıyorsanız veya IELTS ya da TOEFL gibi İngilizce sınavlarına hazırlanmak istiyorsanız, bu seviye tam size göre. Bu seviyede kelime bilginizi önemli ölçüde genişletebilir ve bu da iş hayatınızda size büyük fayda sağlayacaktır.' },
  ],
}

const settingKey: Record<LocaleKey, string> = {
  en: 'services_levels_en',
  tr: 'services_levels_tr',
}

export default function AdminServicesPage() {
  const [tab, setTab] = useState<LocaleKey>('en')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [levels, setLevels] = useState<Record<LocaleKey, LevelData[]>>({
    en: defaultLevels.en.map(l => ({ ...l })),
    tr: defaultLevels.tr.map(l => ({ ...l })),
  })

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase
      .from('site_settings')
      .select('key,value')
      .in('key', Object.values(settingKey))

    const next = {
      en: defaultLevels.en.map(l => ({ ...l })),
      tr: defaultLevels.tr.map(l => ({ ...l })),
    }

    data?.forEach((row: { key: string; value: string | null }) => {
      try {
        if (row.value) {
          const parsed = JSON.parse(row.value)
          if (row.key === settingKey.en) next.en = parsed
          if (row.key === settingKey.tr) next.tr = parsed
        }
      } catch { /* keep default */ }
    })

    setLevels(next)
    setLoading(false)
  }

  function updateLevel(index: number, field: keyof LevelData, value: string) {
    setLevels(prev => {
      const updated = prev[tab].map((l, i) => i === index ? { ...l, [field]: value } : l)
      return { ...prev, [tab]: updated }
    })
  }

  async function save() {
    setSaving(true)
    await supabase.from('site_settings').upsert({
      key: settingKey[tab],
      value: JSON.stringify(levels[tab]),
      updated_at: new Date().toISOString(),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    revalidateAll()
  }

  async function reset() {
    setDeleting(true)
    await supabase.from('site_settings').delete().eq('key', settingKey[tab])
    setLevels(prev => ({ ...prev, [tab]: defaultLevels[tab].map(l => ({ ...l })) }))
    setDeleting(false)
    revalidateAll()
  }

  const inp = 'w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500'
  const lbl = 'block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5'

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Services — General English Levels</h1>
          <p className="text-gray-400 text-sm mt-1">Edit the 6 level cards shown on the Services page</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            disabled={deleting}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-800 text-red-300 hover:bg-red-950/40 text-sm font-semibold disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
            {deleting ? 'Resetting...' : `Reset ${tab.toUpperCase()}`}
          </button>
          <button
            onClick={save}
            disabled={saving}
            className={`flex items-center gap-2 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors ${saved ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} disabled:opacity-50`}
          >
            {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> {saving ? 'Saving...' : `Save ${tab.toUpperCase()}`}</>}
          </button>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-2 inline-flex">
        {(['en', 'tr'] as const).map((locale) => (
          <button
            key={locale}
            onClick={() => setTab(locale)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${tab === locale ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            {locale === 'en' ? 'English' : 'Turkish'}
          </button>
        ))}
      </div>

      <div className="grid gap-6">
        {levels[tab].map((level, i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="mb-4">
              <h2 className="text-white font-semibold">Level {i + 1} — {level.name}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={lbl}>Name</label>
                <input className={inp} value={level.name} onChange={e => updateLevel(i, 'name', e.target.value)} />
              </div>
              <div>
                <label className={lbl}>Level / Group</label>
                <input className={inp} value={level.group} onChange={e => updateLevel(i, 'group', e.target.value)} />
              </div>
              <div>
                <label className={lbl}>Study Hours</label>
                <input className={inp} value={level.hours} onChange={e => updateLevel(i, 'hours', e.target.value)} />
              </div>
              <div>
                <label className={lbl}>Duration</label>
                <input className={inp} value={level.duration} onChange={e => updateLevel(i, 'duration', e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <label className={lbl}>Description</label>
                <textarea className={inp} rows={4} value={level.description} onChange={e => updateLevel(i, 'description', e.target.value)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
