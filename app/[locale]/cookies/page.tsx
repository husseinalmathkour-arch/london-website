import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'Cookie Policy | London Language Academy',
  description: 'Cookie Policy for London Language Academy. Learn what cookies we use and how to manage them.',
}

export default async function CookiesPage() {
  const locale = await getLocale()
  const isTR = locale === 'tr'
  const lastUpdated = '29 March 2026'

  if (isTR) {
    return (
      <div className="pt-20 bg-white dark:bg-gray-950 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-sm text-gray-400 mb-3">Son güncelleme: {lastUpdated}</p>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8">Çerez Politikası</h1>

          <div className="space-y-8 text-gray-600 dark:text-gray-300">

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Çerez Nedir?</h2>
              <p>Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınıza yerleştirilen küçük metin dosyalarıdır. Sitenin düzgün çalışmasını sağlamak ve ziyaret deneyiminizi iyileştirmek için kullanılır.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Kullandığımız Çerezler</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse mt-2">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800 text-left">
                      <th className="p-3 rounded-tl-lg font-semibold text-gray-900 dark:text-white">Çerez</th>
                      <th className="p-3 font-semibold text-gray-900 dark:text-white">Tür</th>
                      <th className="p-3 rounded-tr-lg font-semibold text-gray-900 dark:text-white">Amaç</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'cookie_consent', type: 'Zorunlu', purpose: 'Çerez tercihlerinizi saklar' },
                      { name: 'theme', type: 'Zorunlu', purpose: 'Açık/koyu tema tercihinizi saklar' },
                      { name: 'NEXT_LOCALE', type: 'Zorunlu', purpose: 'Dil tercihlerinizi saklar (TR/EN)' },
                    ].map((row, i) => (
                      <tr key={row.name} className={i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/50'}>
                        <td className="p-3 font-mono text-xs border-b border-gray-100 dark:border-gray-700">{row.name}</td>
                        <td className="p-3 border-b border-gray-100 dark:border-gray-700">
                          <span className="px-2 py-0.5 bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 rounded-full text-xs font-semibold">{row.type}</span>
                        </td>
                        <td className="p-3 border-b border-gray-100 dark:border-gray-700 text-sm">{row.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm">Şu anda yalnızca zorunlu çerezler kullanmaktayız. İzleme, analitik veya reklam çerezi kullanmıyoruz.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Çerezleri Nasıl Yönetebilirsiniz?</h2>
              <p>Tarayıcı ayarlarınızdan çerezleri istediğiniz zaman silebilir veya engelleyebilirsiniz. Ancak zorunlu çerezlerin engellenmesi, sitenin bazı özelliklerinin çalışmamasına neden olabilir.</p>
              <p className="mt-2">Tarayıcı ayarları için:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Chrome: Ayarlar → Gizlilik ve Güvenlik → Çerezler</li>
                <li>Firefox: Ayarlar → Gizlilik ve Güvenlik</li>
                <li>Safari: Tercihler → Gizlilik</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">İletişim</h2>
              <p>Çerez politikamıza ilişkin sorularınız için: <a href="mailto:info@londonlanguageacademy.net" className="text-blue-600 dark:text-blue-400 hover:underline">info@londonlanguageacademy.net</a></p>
            </section>

          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 bg-white dark:bg-gray-950 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <p className="text-sm text-gray-400 mb-3">Last updated: {lastUpdated}</p>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8">Cookie Policy</h1>

        <div className="space-y-8 text-gray-600 dark:text-gray-300">

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">What Are Cookies?</h2>
            <p>Cookies are small text files placed on your device when you visit a website. They help the site function correctly and improve your browsing experience.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Cookies We Use</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse mt-2">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800 text-left">
                    <th className="p-3 rounded-tl-lg font-semibold text-gray-900 dark:text-white">Cookie</th>
                    <th className="p-3 font-semibold text-gray-900 dark:text-white">Type</th>
                    <th className="p-3 rounded-tr-lg font-semibold text-gray-900 dark:text-white">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'cookie_consent', type: 'Essential', purpose: 'Stores your cookie consent preference' },
                    { name: 'theme', type: 'Essential', purpose: 'Stores your light/dark mode preference' },
                    { name: 'NEXT_LOCALE', type: 'Essential', purpose: 'Stores your language preference (EN/TR)' },
                  ].map((row, i) => (
                    <tr key={row.name} className={i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/50'}>
                      <td className="p-3 font-mono text-xs border-b border-gray-100 dark:border-gray-700">{row.name}</td>
                      <td className="p-3 border-b border-gray-100 dark:border-gray-700">
                        <span className="px-2 py-0.5 bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 rounded-full text-xs font-semibold">{row.type}</span>
                      </td>
                      <td className="p-3 border-b border-gray-100 dark:border-gray-700 text-sm">{row.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm">We currently use essential cookies only. We do not use tracking, analytics, or advertising cookies.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">How to Manage Cookies</h2>
            <p>You can delete or block cookies at any time through your browser settings. However, blocking essential cookies may prevent parts of the site from working correctly.</p>
            <p className="mt-2">Browser settings:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Chrome: Settings → Privacy and Security → Cookies</li>
              <li>Firefox: Settings → Privacy & Security</li>
              <li>Safari: Preferences → Privacy</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Contact</h2>
            <p>For questions about our cookie policy: <a href="mailto:info@londonlanguageacademy.net" className="text-blue-600 dark:text-blue-400 hover:underline">info@londonlanguageacademy.net</a></p>
          </section>

        </div>
      </div>
    </div>
  )
}
