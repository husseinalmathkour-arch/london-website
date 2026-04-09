import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'Terms & Conditions | London Language Academy',
  description: 'Terms and Conditions for London Language Academy courses, enrolment, cancellation policy, and use of our website.',
}

export default async function TermsPage() {
  const locale = await getLocale()
  const isTR = locale === 'tr'

  const lastUpdated = '29 March 2026'

  if (isTR) {
    return (
      <div className="pt-20 bg-white dark:bg-gray-950 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-sm text-gray-400 mb-3">Son güncelleme: {lastUpdated}</p>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8">Kullanım Koşulları</h1>

          <div className="space-y-8 text-gray-600 dark:text-gray-300">

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1. Kabul</h2>
              <p>Web sitemizi kullanarak veya hizmetlerimize kaydolarak bu Kullanım Koşulları&apos;nı kabul etmiş olursunuz. Kabul etmiyorsanız lütfen sitemizi kullanmayın.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. Kayıt ve Ödeme</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Kayıt, ücretin tamamının veya belirlenen depozito tutarının ödenmesiyle kesinleşir.</li>
                <li>Ücretler, aksi belirtilmedikçe kurs başlamadan önce peşin olarak ödenmelidir.</li>
                <li>Fiyatlar önceden haber vermeksizin değiştirilebilir; ancak onaylanmış kayıtlara uygulanmaz.</li>
                <li>Ödeme, banka havalesi, kredi/banka kartı veya nakit olarak yapılabilir.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. İptal ve İade Politikası</h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Kurs başlamadan 14 gün veya daha önce:</strong> Tam iade yapılır.</li>
                <li><strong>Kurs başlamadan 7–13 gün önce:</strong> %50 iade yapılır.</li>
                <li><strong>Kurs başlamadan 7 günden az önce:</strong> İade yapılmaz.</li>
                <li><strong>Kurs başladıktan sonra:</strong> Ücret iadesi yapılmaz.</li>
                <li>Tıbbi veya acil durumlarda, belge sunulması halinde istisnai değerlendirme yapılabilir.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">4. Kurs Değişiklikleri</h2>
              <p>London Language Academy, yeterli katılımcı sayısına ulaşılamaması veya beklenmedik koşullar nedeniyle kurs zamanlamasını, öğretmenini veya formatını değiştirme hakkını saklı tutar. Bu tür durumlarda öğrencilere en kısa sürede bildirim yapılır ve alternatif seçenekler sunulur.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">5. Devam Zorunluluğu</h2>
              <p>Sertifika ve ilerleme belgesi alabilmek için kurs saatlerinin en az %80&apos;ine katılım zorunludur. Kaçırılan dersler için telafi seansı garanti edilmez.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">6. Davranış Kuralları</h2>
              <p>Öğrencilerin saygılı bir öğrenme ortamı oluşturmasına katkıda bulunması beklenir. Diğer öğrencilere veya personele yönelik rahatsız edici, ayrımcı veya zarar verici davranışlar, derhal ihraçla sonuçlanabilir ve ücret iadesi yapılmayabilir.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">7. Fikri Mülkiyet</h2>
              <p>Web sitemizdeki ve kurs materyallerimizdeki tüm içerikler London Language Academy&apos;ye aittir. İzinsiz çoğaltılamaz veya dağıtılamaz.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">8. Sorumluluk Sınırlaması</h2>
              <p>London Language Academy, öğrencilerin kurs sonuçlarından, üçüncü taraf hizmetlerinden veya öngörülemeyen olaylardan kaynaklanan dolaylı zararlardan sorumlu tutulamaz. Sorumluluğumuz, ödenen kurs ücreti ile sınırlıdır.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">9. Uygulanacak Hukuk</h2>
              <p>Bu koşullar İngiltere ve Galler hukukuna tabidir. Uyuşmazlıklar, İngiltere mahkemelerinin münhasır yargı yetkisine tabi olacaktır.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">10. İletişim</h2>
              <p>Bu koşullara ilişkin sorularınız için: <a href="mailto:info@londonlanguageacademy.net" className="text-blue-600 dark:text-blue-400 hover:underline">info@londonlanguageacademy.net</a></p>
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
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8">Terms & Conditions</h1>

        <div className="space-y-8 text-gray-600 dark:text-gray-300">

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1. Acceptance</h2>
            <p>By using our website or enrolling in our services, you agree to these Terms & Conditions. If you do not agree, please do not use our site.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. Enrolment & Payment</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Enrolment is confirmed upon receipt of full payment or an agreed deposit.</li>
              <li>Fees are due in advance before the course start date unless otherwise agreed.</li>
              <li>Prices are subject to change without notice but will not affect confirmed enrolments.</li>
              <li>Payment can be made by bank transfer, credit/debit card, or cash.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. Cancellation & Refund Policy</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>14 or more days before course start:</strong> Full refund.</li>
              <li><strong>7–13 days before course start:</strong> 50% refund.</li>
              <li><strong>Less than 7 days before course start:</strong> No refund.</li>
              <li><strong>After course has started:</strong> No refund.</li>
              <li>Exceptional circumstances (e.g. medical emergencies) may be considered on a case-by-case basis with supporting documentation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">4. Course Changes</h2>
            <p>London Language Academy reserves the right to change course timetables, teachers, or format due to insufficient enrolment numbers or unforeseen circumstances. Students will be notified as soon as possible and offered suitable alternatives.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">5. Attendance</h2>
            <p>A minimum of 80% attendance is required to receive a certificate of completion or progress report. Missed classes are not guaranteed to be made up.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">6. Code of Conduct</h2>
            <p>Students are expected to contribute to a respectful learning environment. Behaviour that is disruptive, discriminatory, or harmful to other students or staff may result in immediate dismissal without refund.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">7. Intellectual Property</h2>
            <p>All content on our website and in our course materials is the property of London Language Academy and may not be reproduced or distributed without permission.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">8. Limitation of Liability</h2>
            <p>London Language Academy is not liable for indirect losses arising from student course outcomes, third-party services, or events beyond our reasonable control. Our liability is limited to the course fees paid.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">9. Governing Law</h2>
            <p>These terms are governed by the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">10. Contact</h2>
            <p>For any questions about these terms: <a href="mailto:info@londonlanguageacademy.net" className="text-blue-600 dark:text-blue-400 hover:underline">info@londonlanguageacademy.net</a></p>
          </section>

        </div>
      </div>
    </div>
  )
}
