'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { revalidateAll } from '@/lib/revalidate'
import { Save, Check } from 'lucide-react'
import { useAdminLang } from '@/context/AdminLangContext'

interface Setting {
  key: string
  value: string | null
}

const settingGroups = [
  {
    title: 'Contact Information',
    keys: [
      { key: 'phone_london', label: 'Phone — London', placeholder: '+44 20 XXXX XXXX' },
      { key: 'phone_bursa', label: 'Phone — Bursa', placeholder: '+90 224 XXX XX XX' },
      { key: 'phone_istanbul', label: 'Phone — Istanbul', placeholder: '+90 212 XXX XX XX' },
      { key: 'whatsapp', label: 'WhatsApp Number', placeholder: '+44 7XXX XXXXXX' },
      { key: 'email_general', label: 'General Email', placeholder: 'info@londonlanguageacademy.com' },
      { key: 'email_contact_notifications', label: 'Notification Email (receives contact forms)', placeholder: 'admin@londonlanguageacademy.com' },
    ],
  },
  {
    title: 'Addresses',
    keys: [
      { key: 'address_london_en', label: 'London Address (English)', placeholder: '123 Oxford Street, London W1D 2HX' },
      { key: 'address_london_tr', label: 'London Address (Turkish)', placeholder: '123 Oxford Caddesi, Londra W1D 2HX' },
      { key: 'address_bursa_en', label: 'Bursa Address (English)', placeholder: '' },
      { key: 'address_bursa_tr', label: 'Bursa Address (Turkish)', placeholder: '' },
      { key: 'address_istanbul_en', label: 'Istanbul Address (English)', placeholder: '' },
      { key: 'address_istanbul_tr', label: 'Istanbul Address (Turkish)', placeholder: '' },
    ],
  },
  {
    title: 'Social Media',
    keys: [
      { key: 'instagram', label: 'Instagram URL', placeholder: 'https://instagram.com/...' },
      { key: 'facebook', label: 'Facebook URL', placeholder: 'https://facebook.com/...' },
      { key: 'twitter', label: 'Twitter / X URL', placeholder: 'https://twitter.com/...' },
      { key: 'linkedin', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/...' },
      { key: 'youtube', label: 'YouTube URL', placeholder: 'https://youtube.com/...' },
    ],
  },
]

export default function SettingsPage() {
  const { lang, t } = useAdminLang()
  const isTR = lang === 'tr'
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    supabase.from('site_settings').select('*').then(({ data }) => {
      const map: Record<string, string> = {}
      ;(data || []).forEach((s: Setting) => { map[s.key] = s.value || '' })
      setSettings(map)
      setLoading(false)
    })
  }, [])

  async function save() {
    setSaving(true)
    const updates = Object.entries(settings).map(([key, value]) =>
      supabase.from('site_settings').upsert({ key, value, updated_at: new Date().toISOString() })
    )
    await Promise.all(updates)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    revalidateAll()
  }

  const inp = 'w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500'
  const lbl = 'block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5'
  const groupContent = isTR
    ? [
        {
          title: 'İletişim Bilgileri',
          labels: {
            phone_london: 'Telefon — Londra',
            phone_bursa: 'Telefon — Bursa',
            phone_istanbul: 'Telefon — İstanbul',
            whatsapp: 'WhatsApp Numarası',
            email_general: 'Genel E-posta',
            email_contact_notifications: 'Bildirim E-postası (iletişim formları)',
          },
          placeholders: {
            phone_london: '+44 20 XXXX XXXX',
            phone_bursa: '+90 224 XXX XX XX',
            phone_istanbul: '+90 212 XXX XX XX',
            whatsapp: '+44 7XXX XXXXXX',
            email_general: 'info@londonlanguageacademy.com',
            email_contact_notifications: 'admin@londonlanguageacademy.com',
          },
        },
        {
          title: 'Adresler',
          labels: {
            address_london_en: 'Londra Adresi (İngilizce)',
            address_london_tr: 'Londra Adresi (Türkçe)',
            address_bursa_en: 'Bursa Adresi (İngilizce)',
            address_bursa_tr: 'Bursa Adresi (Türkçe)',
            address_istanbul_en: 'İstanbul Adresi (İngilizce)',
            address_istanbul_tr: 'İstanbul Adresi (Türkçe)',
          },
          placeholders: {
            address_london_en: '123 Oxford Street, London W1D 2HX',
            address_london_tr: '123 Oxford Caddesi, Londra W1D 2HX',
            address_bursa_en: '',
            address_bursa_tr: '',
            address_istanbul_en: '',
            address_istanbul_tr: '',
          },
        },
        {
          title: 'Sosyal Medya',
          labels: {
            instagram: 'Instagram Bağlantısı',
            facebook: 'Facebook Bağlantısı',
            twitter: 'Twitter / X Bağlantısı',
            linkedin: 'LinkedIn Bağlantısı',
            youtube: 'YouTube Bağlantısı',
          },
          placeholders: {
            instagram: 'https://instagram.com/...',
            facebook: 'https://facebook.com/...',
            twitter: 'https://twitter.com/...',
            linkedin: 'https://linkedin.com/...',
            youtube: 'https://youtube.com/...',
          },
        },
      ]
    : settingGroups.map(group => ({
        title: group.title,
        labels: Object.fromEntries(group.keys.map(item => [item.key, item.label])),
        placeholders: Object.fromEntries(group.keys.map(item => [item.key, item.placeholder])),
      }))

  if (loading) return (
    <div className="flex items-center justify-center h-48">
      <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{t('settingsTitle')}</h1>
          <p className="text-gray-400 text-sm mt-1">{t('settingsDesc')}</p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className={`flex items-center gap-2 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors ${saved ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} disabled:opacity-50`}
        >
          {saved ? <><Check className="w-4 h-4" /> {t('saved')}</> : <><Save className="w-4 h-4" /> {saving ? t('saving') : t('saveChanges')}</>}
        </button>
      </div>

      <div className="space-y-6">
        {settingGroups.map((group, index) => (
          <div key={group.title} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-white font-semibold mb-4">{groupContent[index].title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.keys.map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className={lbl}>{groupContent[index].labels[key as keyof typeof groupContent[number]['labels']] ?? label}</label>
                  <input
                    className={inp}
                    value={settings[key] || ''}
                    onChange={e => setSettings(s => ({ ...s, [key]: e.target.value }))}
                    placeholder={groupContent[index].placeholders[key as keyof typeof groupContent[number]['placeholders']] ?? placeholder}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
