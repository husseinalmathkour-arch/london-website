'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { revalidateAll } from '@/lib/revalidate'
import { Save, Trash2, Check } from 'lucide-react'
import enMessages from '@/messages/en.json'
import trMessages from '@/messages/tr.json'

interface SettingRow {
  key: string
  value: string | null
}

type LocaleKey = 'en' | 'tr'

interface AboutContent {
  heroLabel: string
  heroHeading: string
  heroDescription: string
  heroBody: string
  missionLabel: string
  missionText: string
  visionLabel: string
  visionText: string
  valuesLabel: string
  valuesHeading: string
  whyLabel: string
  whyHeading: string
  whyDescription: string
  whyItem1Title: string
  whyItem1Desc: string
  whyItem2Title: string
  whyItem2Desc: string
  whyItem3Title: string
  whyItem3Desc: string
  testimonialsLabel: string
  testimonialsHeading: string
  ctaTitle: string
  ctaDescription: string
  ctaPrimary: string
  ctaSecondary: string
  stat1Number: string
  stat1Label: string
  stat2Number: string
  stat2Label: string
  stat3Number: string
  stat3Label: string
  stat4Number: string
  stat4Label: string
}

const settingKeyByLocale: Record<LocaleKey, string> = {
  en: 'about_content_en',
  tr: 'about_content_tr',
}

function getDefaultContent(source: typeof enMessages): AboutContent {
  return {
    heroLabel: source.about.heroLabel,
    heroHeading: source.about.heroHeading,
    heroDescription: source.about.heroDescription,
    heroBody: source.about.heroBody,
    missionLabel: source.about.missionLabel,
    missionText: source.about.missionText,
    visionLabel: source.about.visionLabel,
    visionText: source.about.visionText,
    valuesLabel: source.about.valuesLabel,
    valuesHeading: source.about.valuesHeading,
    whyLabel: source.about.whyLabel,
    whyHeading: source.about.whyHeading,
    whyDescription: source.about.whyDescription,
    whyItem1Title: source.about.whyItem1Title,
    whyItem1Desc: source.about.whyItem1Desc,
    whyItem2Title: source.about.whyItem2Title,
    whyItem2Desc: source.about.whyItem2Desc,
    whyItem3Title: source.about.whyItem3Title,
    whyItem3Desc: source.about.whyItem3Desc,
    testimonialsLabel: source.about.testimonialsLabel,
    testimonialsHeading: source.about.testimonialsHeading,
    ctaTitle: source.about.ctaTitle,
    ctaDescription: source.about.ctaDescription,
    ctaPrimary: source.about.ctaPrimary,
    ctaSecondary: source.about.ctaSecondary,
    stat1Number: '~100',
    stat1Label: 'Years in London',
    stat2Number: '2021',
    stat2Label: 'Founded in Turkey',
    stat3Number: '3',
    stat3Label: 'Branches',
    stat4Number: '∞',
    stat4Label: 'Lifetime Support',
  }
}

const defaultContentByLocale: Record<LocaleKey, AboutContent> = {
  en: getDefaultContent(enMessages),
  tr: getDefaultContent(trMessages),
}

function parseAboutContent(value: string | null | undefined, locale: LocaleKey): AboutContent {
  if (!value) return { ...defaultContentByLocale[locale] }

  try {
    const parsed = JSON.parse(value)
    return {
      ...defaultContentByLocale[locale],
      ...parsed,
    }
  } catch {
    return { ...defaultContentByLocale[locale] }
  }
}

const sections = [
  {
    title: 'Hero',
    fields: [
      { key: 'heroLabel', label: 'Label', type: 'input' },
      { key: 'heroHeading', label: 'Heading', type: 'input' },
      { key: 'heroDescription', label: 'Description', type: 'textarea' },
      { key: 'heroBody', label: 'Body', type: 'textarea' },
    ],
  },
  {
    title: 'Mission & Vision',
    fields: [
      { key: 'missionLabel', label: 'Mission title', type: 'input' },
      { key: 'missionText', label: 'Mission text', type: 'textarea' },
      { key: 'visionLabel', label: 'Vision title', type: 'input' },
      { key: 'visionText', label: 'Vision text', type: 'textarea' },
    ],
  },
  {
    title: 'Why LLA',
    fields: [
      { key: 'whyLabel', label: 'Section label', type: 'input' },
      { key: 'whyHeading', label: 'Heading', type: 'input' },
      { key: 'whyDescription', label: 'Description', type: 'textarea' },
      { key: 'whyItem1Title', label: 'Card 1 title', type: 'input' },
      { key: 'whyItem1Desc', label: 'Card 1 text', type: 'textarea' },
      { key: 'whyItem2Title', label: 'Card 2 title', type: 'input' },
      { key: 'whyItem2Desc', label: 'Card 2 text', type: 'textarea' },
      { key: 'whyItem3Title', label: 'Card 3 title', type: 'input' },
      { key: 'whyItem3Desc', label: 'Card 3 text', type: 'textarea' },
    ],
  },
  {
    title: 'Values & Testimonials',
    fields: [
      { key: 'valuesLabel', label: 'Values label', type: 'input' },
      { key: 'valuesHeading', label: 'Values heading', type: 'input' },
      { key: 'testimonialsLabel', label: 'Testimonials label', type: 'input' },
      { key: 'testimonialsHeading', label: 'Testimonials heading', type: 'input' },
    ],
  },
  {
    title: 'Stats',
    fields: [
      { key: 'stat1Number', label: 'Stat 1 — number', type: 'input' },
      { key: 'stat1Label', label: 'Stat 1 — label', type: 'input' },
      { key: 'stat2Number', label: 'Stat 2 — number', type: 'input' },
      { key: 'stat2Label', label: 'Stat 2 — label', type: 'input' },
      { key: 'stat3Number', label: 'Stat 3 — number', type: 'input' },
      { key: 'stat3Label', label: 'Stat 3 — label', type: 'input' },
      { key: 'stat4Number', label: 'Stat 4 — number', type: 'input' },
      { key: 'stat4Label', label: 'Stat 4 — label', type: 'input' },
    ],
  },
  {
    title: 'CTA',
    fields: [
      { key: 'ctaTitle', label: 'Title', type: 'input' },
      { key: 'ctaDescription', label: 'Description', type: 'textarea' },
      { key: 'ctaPrimary', label: 'Primary button', type: 'input' },
      { key: 'ctaSecondary', label: 'Secondary button', type: 'input' },
    ],
  },
] as const

export default function AdminAboutPage() {
  const [tab, setTab] = useState<LocaleKey>('en')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [content, setContent] = useState<Record<LocaleKey, AboutContent>>({
    en: { ...defaultContentByLocale.en },
    tr: { ...defaultContentByLocale.tr },
  })

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const { data } = await supabase
      .from('site_settings')
      .select('key,value')
      .in('key', Object.values(settingKeyByLocale))

    const next = {
      en: { ...defaultContentByLocale.en },
      tr: { ...defaultContentByLocale.tr },
    }

    ;(data as SettingRow[] | null)?.forEach((row) => {
      if (row.key === settingKeyByLocale.en) next.en = parseAboutContent(row.value, 'en')
      if (row.key === settingKeyByLocale.tr) next.tr = parseAboutContent(row.value, 'tr')
    })

    setContent(next)
    setLoading(false)
  }

  function updateField(field: keyof AboutContent, value: string) {
    setContent((prev) => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        [field]: value,
      },
    }))
  }

  async function saveCurrentLocale() {
    setSaving(true)
    await supabase.from('site_settings').upsert({
      key: settingKeyByLocale[tab],
      value: JSON.stringify(content[tab]),
      updated_at: new Date().toISOString(),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    revalidateAll()
  }

  async function resetCurrentLocale() {
    setDeleting(true)
    await supabase.from('site_settings').delete().eq('key', settingKeyByLocale[tab])
    setContent((prev) => ({
      ...prev,
      [tab]: { ...defaultContentByLocale[tab] },
    }))
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
          <h1 className="text-2xl font-bold text-white">About Page</h1>
          <p className="text-gray-400 text-sm mt-1">Edit the public About page content by language</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetCurrentLocale}
            disabled={deleting}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-800 text-red-300 hover:bg-red-950/40 text-sm font-semibold disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
            {deleting ? 'Resetting...' : `Reset ${tab.toUpperCase()}`}
          </button>
          <button
            onClick={saveCurrentLocale}
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
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
              tab === locale ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            {locale === 'en' ? 'English' : 'Turkish'}
          </button>
        ))}
      </div>

      <div className="grid gap-6">
        {sections.map((section) => (
          <div key={section.title} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="mb-4">
              <h2 className="text-white font-semibold">{section.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.fields.map((field) => (
                <div key={field.key} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                  <label className={lbl}>{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea
                      className={inp}
                      rows={4}
                      value={content[tab][field.key as keyof AboutContent]}
                      onChange={(event) => updateField(field.key as keyof AboutContent, event.target.value)}
                    />
                  ) : (
                    <input
                      className={inp}
                      value={content[tab][field.key as keyof AboutContent]}
                      onChange={(event) => updateField(field.key as keyof AboutContent, event.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
