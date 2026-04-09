'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { revalidateAll } from '@/lib/revalidate'
import { Save, Check } from 'lucide-react'

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

  if (loading) return (
    <div className="flex items-center justify-center h-48">
      <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Site Settings</h1>
          <p className="text-gray-400 text-sm mt-1">Contact details, addresses, and social links</p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className={`flex items-center gap-2 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors ${saved ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} disabled:opacity-50`}
        >
          {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Changes'}</>}
        </button>
      </div>

      <div className="space-y-6">
        {settingGroups.map(group => (
          <div key={group.title} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-white font-semibold mb-4">{group.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.keys.map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className={lbl}>{label}</label>
                  <input
                    className={inp}
                    value={settings[key] || ''}
                    onChange={e => setSettings(s => ({ ...s, [key]: e.target.value }))}
                    placeholder={placeholder}
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
