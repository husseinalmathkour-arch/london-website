import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'Privacy Policy | London Language Academy',
  description: 'Privacy Policy for London Language Academy. Learn how we collect, use, and protect your personal data in accordance with GDPR and UK data protection law.',
}

export default async function PrivacyPage() {
  const locale = await getLocale()
  const isTR = locale === 'tr'

  const lastUpdated = '29 March 2026'

  if (isTR) {
    return (
      <div className="pt-20 bg-white dark:bg-gray-950 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-sm text-gray-400 mb-3">Son güncelleme: {lastUpdated}</p>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8">Gizlilik Politikası</h1>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-8 text-gray-600 dark:text-gray-300">

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1. Giriş</h2>
              <p>London Language Academy (&quot;biz&quot;, &quot;bize&quot; veya &quot;bizim&quot;), kişisel verilerinizi korumaya kararlıdır. Bu Gizlilik Politikası, web sitemizi (londonlanguageacademy.com) kullandığınızda veya hizmetlerimizden yararlandığınızda kişisel verilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu açıklamaktadır.</p>
              <p className="mt-2">Bu politika UK GDPR ve 2018 tarihli Veri Koruma Kanunu kapsamındaki yükümlülüklerimizi yerine getirmek amacıyla hazırlanmıştır.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. Veri Sorumlusu</h2>
              <p>Kişisel verilerinizin veri sorumlusu şu kuruluştur:</p>
              <div className="mt-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 text-sm">
                <p className="font-semibold text-gray-900 dark:text-white">London Language Academy</p>
                <p>Covent Garden, Londra, Birleşik Krallık</p>
                <p>E-posta: <a href="mailto:info@londonlanguageacademy.net" className="text-blue-600 dark:text-blue-400 hover:underline">info@londonlanguageacademy.net</a></p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. Topladığımız Veriler</h2>
              <p>Aşağıdaki kişisel verileri toplayabiliriz:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Ad ve soyad</li>
                <li>E-posta adresi ve telefon numarası</li>
                <li>Sorgu ve mesaj içerikleri</li>
                <li>Dil tercihleri ve ilgi alanları</li>
                <li>Seviye testi sonuçları</li>
                <li>Web sitesi kullanım verileri (çerezler aracılığıyla)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">4. Verilerinizi Nasıl Kullanıyoruz</h2>
              <p>Kişisel verilerinizi şu amaçlarla kullanırız:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>İletişim taleplerinizi yanıtlamak</li>
                <li>Kurs kaydı ve yönetimi</li>
                <li>Hizmetlerimiz ve etkinliklerimiz hakkında bilgi göndermek (onay vermeniz halinde)</li>
                <li>Web sitemizi ve hizmetlerimizi iyileştirmek</li>
                <li>Yasal yükümlülüklerimizi yerine getirmek</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">5. Hukuki Dayanak</h2>
              <p>Verilerinizi işlemenin hukuki dayanakları şunlardır:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Sözleşme:</strong> Hizmetlerimizi sunmak için gerekli olan işlemler</li>
                <li><strong>Meşru menfaat:</strong> Web sitemizi geliştirmek ve hizmet kalitemizi artırmak</li>
                <li><strong>Rıza:</strong> Pazarlama iletişimleri için açık onayınız</li>
                <li><strong>Yasal yükümlülük:</strong> Mevzuattan doğan yükümlülüklerimiz</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">6. Veri Saklama</h2>
              <p>İletişim formlarından elde edilen verileri, sorgunuz çözümlendikten sonra 2 yıl süreyle saklarız. Öğrenci kayıt verileri, yasal gereklilikler doğrultusunda 7 yıl süreyle muhafaza edilir.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">7. Haklarınız</h2>
              <p>UK GDPR kapsamında aşağıdaki haklara sahipsiniz:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Verilerinize erişim hakkı</li>
                <li>Hatalı verilerin düzeltilmesini talep etme hakkı</li>
                <li>Verilerinizin silinmesini talep etme hakkı</li>
                <li>İşlemenin kısıtlanmasını talep etme hakkı</li>
                <li>Veri taşınabilirliği hakkı</li>
                <li>İtiraz etme hakkı</li>
              </ul>
              <p className="mt-3">Bu haklarınızı kullanmak için <a href="mailto:info@londonlanguageacademy.net" className="text-blue-600 dark:text-blue-400 hover:underline">info@londonlanguageacademy.net</a> adresine e-posta gönderin. Talebinizi 30 gün içinde yanıtlarız.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">8. Üçüncü Taraf Paylaşımı</h2>
              <p>Kişisel verilerinizi pazarlama amacıyla üçüncü taraflarla paylaşmıyoruz. Veriler yalnızca şu durumlarda paylaşılabilir:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Yasal zorunluluk halinde</li>
                <li>Hizmet sunumu için gerekli olan güvenilir hizmet sağlayıcılarımızla (Supabase veri depolama gibi)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">9. Şikayet Hakkı</h2>
              <p>Verilerinizin işlenme biçimiyle ilgili bir endişeniz varsa, öncelikle bizimle iletişime geçmenizi öneririz. Ayrıca İngiltere Bilgi Komiserliği Ofisi&apos;ne (ICO) şikayette bulunma hakkına da sahipsiniz: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">ico.org.uk</a></p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">10. Politika Güncellemeleri</h2>
              <p>Bu politikayı zaman zaman güncelleyebiliriz. Önemli değişiklikler yapılması halinde sizi bilgilendiririz. Güncel versiyonu her zaman bu sayfada bulabilirsiniz.</p>
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
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8 text-gray-600 dark:text-gray-300">

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1. Introduction</h2>
            <p>London Language Academy (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website (londonlanguageacademy.com) or engage with our services.</p>
            <p className="mt-2">This policy is designed to meet our obligations under the UK GDPR and the Data Protection Act 2018.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. Data Controller</h2>
            <p>The data controller for your personal information is:</p>
            <div className="mt-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 text-sm">
              <p className="font-semibold text-gray-900 dark:text-white">London Language Academy</p>
              <p>Covent Garden, London, United Kingdom</p>
              <p>Email: <a href="mailto:info@londonlanguageacademy.net" className="text-blue-600 dark:text-blue-400 hover:underline">info@londonlanguageacademy.net</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. Data We Collect</h2>
            <p>We may collect the following personal data:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>First and last name</li>
              <li>Email address and phone number</li>
              <li>Enquiry and message content</li>
              <li>Language preferences and areas of interest</li>
              <li>Level test results</li>
              <li>Website usage data (via cookies)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">4. How We Use Your Data</h2>
            <p>We use your personal data for the following purposes:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Responding to your contact enquiries</li>
              <li>Course enrolment and administration</li>
              <li>Sending information about our services and events (where you have given consent)</li>
              <li>Improving our website and services</li>
              <li>Complying with our legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">5. Legal Basis for Processing</h2>
            <p>Our legal basis for processing your data includes:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Contract:</strong> Processing necessary to provide our services to you</li>
              <li><strong>Legitimate interests:</strong> Improving our website and service quality</li>
              <li><strong>Consent:</strong> For marketing communications where you have explicitly agreed</li>
              <li><strong>Legal obligation:</strong> Where we are required to process data by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">6. Data Retention</h2>
            <p>We retain contact form data for 2 years after your enquiry is resolved. Student enrolment data is kept for 7 years in line with legal requirements.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">7. Your Rights</h2>
            <p>Under UK GDPR you have the right to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request erasure of your data</li>
              <li>Restrict how we process your data</li>
              <li>Data portability</li>
              <li>Object to processing</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, email us at <a href="mailto:info@londonlanguageacademy.net" className="text-blue-600 dark:text-blue-400 hover:underline">info@londonlanguageacademy.net</a>. We will respond within 30 days.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">8. Third-Party Sharing</h2>
            <p>We do not sell or share your personal data with third parties for marketing purposes. Data may be shared only:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Where required by law</li>
              <li>With trusted service providers necessary to deliver our services (e.g. Supabase for data storage)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">9. Right to Complain</h2>
            <p>If you have concerns about how we handle your data, we encourage you to contact us first. You also have the right to lodge a complaint with the UK Information Commissioner&apos;s Office (ICO): <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">ico.org.uk</a></p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">10. Policy Updates</h2>
            <p>We may update this policy from time to time. We will notify you of any significant changes. The current version is always available on this page.</p>
          </section>

        </div>
      </div>
    </div>
  )
}
