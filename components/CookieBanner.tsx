'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { Cookie, X } from 'lucide-react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const locale = useLocale()

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem('cookie_consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  const isEN = locale !== 'tr'

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
            <Cookie className="w-5 h-5 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-sm mb-1">
              {isEN ? 'We use cookies' : 'Çerez kullanıyoruz'}
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              {isEN
                ? <>We use essential cookies to keep the site working. We don&apos;t use tracking or advertising cookies. By clicking &quot;Accept&quot; you agree to our{' '}
                    <Link href={`/${locale}/privacy`} className="text-blue-400 hover:underline">Privacy Policy</Link>
                    {' '}and{' '}
                    <Link href={`/${locale}/cookies`} className="text-blue-400 hover:underline">Cookie Policy</Link>.
                  </>
                : <>Siteyi çalışır halde tutmak için temel çerezler kullanıyoruz. İzleme veya reklam çerezi kullanmıyoruz. &quot;Kabul Et&quot; seçeneğine tıklayarak{' '}
                    <Link href={`/${locale}/privacy`} className="text-blue-400 hover:underline">Gizlilik Politikamızı</Link>
                    {' '}ve{' '}
                    <Link href={`/${locale}/cookies`} className="text-blue-400 hover:underline">Çerez Politikamızı</Link>
                    {' '}kabul etmiş olursunuz.
                  </>
              }
            </p>
          </div>

          <button
            onClick={decline}
            className="text-gray-600 hover:text-gray-400 transition-colors flex-shrink-0 mt-0.5"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-3 mt-4 ml-14">
          <button
            onClick={accept}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors"
          >
            {isEN ? 'Accept' : 'Kabul Et'}
          </button>
          <button
            onClick={decline}
            className="px-5 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold rounded-xl transition-colors border border-gray-700"
          >
            {isEN ? 'Decline' : 'Reddet'}
          </button>
        </div>
      </div>
    </div>
  )
}
