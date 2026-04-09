'use client'

import { useState } from 'react'
import { MapPin, Phone, Clock, ChevronDown, ExternalLink } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useBranch } from '@/context/BranchContext'

export default function TopBar() {
  const [open, setOpen] = useState(false)
  const { selectedIndex, setSelectedIndex, branch, branches } = useBranch()
  const t = useTranslations('topbar')

  if (!branch) return <div className="fixed top-0 left-0 right-0 z-50 h-9" style={{ backgroundColor: '#3d0d14' }} />

  return (
    <div className="fixed top-0 left-0 right-0 z-50 text-white text-xs" style={{ backgroundColor: '#3d0d14' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between gap-4">

        {/* Branch selector */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 font-semibold hover:opacity-80 transition-opacity"
          style={{ color: '#c3ab73' }}
        >
          <MapPin className="w-3.5 h-3.5" />
          {branch.name}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>

        {/* Mobile actions */}
        <div className="sm:hidden ml-auto flex items-center gap-3 text-white/80">
          {branch.maps && (
            <a
              href={branch.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              aria-label={t('getDirections')}
            >
              <ExternalLink className="w-3.5 h-3.5" style={{ color: '#c3ab73' }} />
            </a>
          )}
          {branch.phone && (
            <a
              href={`tel:${branch.phone}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" style={{ color: '#c3ab73' }} />
              <span className="font-semibold">{branch.phone}</span>
            </a>
          )}
        </div>

        {/* Branch details */}
        <div className="hidden sm:flex items-center gap-5 text-white/70">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3" style={{ color: '#c3ab73' }} />
            {branch.address}
          </span>
          <span className="flex items-center gap-1.5">
            <Phone className="w-3 h-3" style={{ color: '#c3ab73' }} />
            <a href={`tel:${branch.phone}`} className="hover:text-white transition-colors">{branch.phone}</a>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" style={{ color: '#c3ab73' }} />
            {branch.hours}
          </span>
          <a
            href={branch.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-white transition-colors"
            style={{ color: '#c3ab73' }}
          >
            {t('getDirections')} <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute left-0 right-0 top-full shadow-xl z-50 border-t"
          style={{ backgroundColor: '#3d0d14', borderColor: '#c3ab73' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {branches.map((b, i) => (
              <button
                key={b.name}
                onClick={() => { setSelectedIndex(i); setOpen(false) }}
                className={`text-left p-3 rounded-xl border transition-all ${
                  selectedIndex === i
                    ? 'border-yellow-500/60 bg-white/5'
                    : 'border-white/10 hover:bg-white/5'
                }`}
              >
                <p className="font-semibold mb-1" style={{ color: selectedIndex === i ? '#c3ab73' : 'white' }}>
                  {b.name}
                </p>
                <p className="text-white/60 text-xs mb-1">{b.address}</p>
                <p className="text-white/60 text-xs mb-1">{b.phone}</p>
                <p className="text-white/60 text-xs">{b.hours}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
