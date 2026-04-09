'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useLocale } from 'next-intl'

interface DBBranch {
  id: string
  name_en: string
  name_tr: string | null
  address_en: string | null
  address_tr: string | null
  phone: string | null
  whatsapp: string | null
  hours: string | null
  maps_url: string | null
}

export interface Branch {
  id: string
  name: string
  address: string
  phone: string
  whatsapp: string
  hours: string
  maps: string
}

interface BranchContextType {
  branches: Branch[]
  selectedIndex: number
  setSelectedIndex: (index: number) => void
  branch: Branch | null
}

const BranchContext = createContext<BranchContextType>({
  branches: [],
  selectedIndex: 0,
  setSelectedIndex: () => {},
  branch: null,
})

export function BranchProvider({ children, initialBranches = [] }: { children: React.ReactNode; initialBranches?: DBBranch[] }) {
  const [dbBranches, setDbBranches] = useState<DBBranch[]>(initialBranches)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const locale = useLocale()

  useEffect(() => {
    if (initialBranches.length > 0) return
    supabase
      .from('branches')
      .select('id,name_en,name_tr,address_en,address_tr,phone,whatsapp,hours,maps_url')
      .eq('published', true)
      .order('sort_order')
      .then(({ data }) => {
        if (data && data.length > 0) setDbBranches(data)
      })
  }, [])

  const branches: Branch[] = dbBranches.map(b => ({
    id: b.id,
    name: (locale === 'tr' && b.name_tr) ? b.name_tr : b.name_en,
    address: (locale === 'tr' && b.address_tr) ? b.address_tr : (b.address_en || ''),
    phone: b.phone || '',
    whatsapp: b.whatsapp || '',
    hours: b.hours || '',
    maps: b.maps_url || '',
  }))

  return (
    <BranchContext.Provider value={{ branches, selectedIndex, setSelectedIndex, branch: branches[selectedIndex] ?? null }}>
      {children}
    </BranchContext.Provider>
  )
}

export const useBranch = () => useContext(BranchContext)
