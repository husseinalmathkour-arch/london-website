'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import type { AdminLang, TKey } from '@/lib/admin-i18n'
import { adminT } from '@/lib/admin-i18n'

interface AdminLangContextType {
  lang: AdminLang
  setLang: (l: AdminLang) => void
  t: (key: TKey) => string
}

const AdminLangContext = createContext<AdminLangContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key) => adminT.en[key],
})

export function AdminLangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<AdminLang>('en')

  useEffect(() => {
    const saved = localStorage.getItem('admin-lang') as AdminLang | null
    if (saved === 'tr' || saved === 'en') setLangState(saved)
  }, [])

  function setLang(l: AdminLang) {
    setLangState(l)
    localStorage.setItem('admin-lang', l)
  }

  function t(key: TKey): string {
    return adminT[lang][key] ?? adminT.en[key]
  }

  return (
    <AdminLangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </AdminLangContext.Provider>
  )
}

export function useAdminLang() {
  return useContext(AdminLangContext)
}
