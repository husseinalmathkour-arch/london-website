'use client'

import { useState, useEffect } from 'react'
import AnimatedSection from '@/components/AnimatedSection'
import Link from 'next/link'
import { MapPin, Phone, Mail, Send, CheckCircle, MessageSquare } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

interface Branch {
  id: string
  name_en: string
  name_tr: string | null
  address_en: string | null
  address_tr: string | null
  phone: string | null
  email: string | null
  whatsapp: string | null
  maps_url: string | null
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  enquiryType: string
  language: string
  message: string
  consent: boolean
}

const initialForm: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  enquiryType: '',
  language: '',
  message: '',
  consent: false,
}

export default function ContactPageClient({ branches }: { branches: Branch[] }) {
  const t = useTranslations('contact')
  const locale = useLocale()
  const [form, setForm] = useState<FormData>(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [submitError, setSubmitError] = useState('')

  const enquiryTypes = [
    { value: 'General Enquiry', label: t('enquiryTypes.general') },
    { value: 'general-english', label: t('enquiryTypes.generalEnglish') },
    { value: 'exam-preparation', label: t('enquiryTypes.examPrep') },
    { value: 'other-languages', label: t('enquiryTypes.otherLanguages') },
    { value: 'one-to-one', label: t('enquiryTypes.oneToOne') },
    { value: 'online-courses', label: t('enquiryTypes.online') },
    { value: 'intensive', label: t('enquiryTypes.intensive') },
    { value: 'kids', label: t('enquiryTypes.kids') },
    { value: 'study-abroad', label: t('enquiryTypes.studyAbroad') },
    { value: 'Course Information', label: t('enquiryTypes.courseInfo') },
    { value: 'Student Visa', label: t('enquiryTypes.visa') },
    { value: 'Accommodation', label: t('enquiryTypes.accommodation') },
  ]

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const service = params.get('service')
    if (service) {
      setForm(prev => ({ ...prev, enquiryType: service }))
    }
  }, [])

  function validate(): boolean {
    const newErrors: Partial<FormData> = {}
    if (!form.firstName.trim()) newErrors.firstName = t('required')
    if (!form.lastName.trim()) newErrors.lastName = t('required')
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = t('validEmail')
    if (!form.enquiryType) newErrors.enquiryType = t('selectEnquiryType')
    if (!form.message.trim() || form.message.length < 20) newErrors.message = t('messageTooShort')
    if (!form.consent) (newErrors as Record<string, unknown>).consent = t('consentRequired')
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const body = await res.json()
      if (res.ok) {
        setSubmitted(true)
      } else {
        setSubmitError(body.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setSubmitError('Network error. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-950 dark:to-blue-950/20 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3 block">
              {t('heroLabel')}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-5 leading-tight">
              {t('heroHeading')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              {t('heroDescription')}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left: info */}
            <AnimatedSection direction="left" className="lg:col-span-2 space-y-8">
              {branches.map((branch) => (
                <div key={branch.id} className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-7">
                  <h2 className="font-bold text-gray-900 dark:text-white mb-5">
                    {locale === 'tr' && branch.name_tr ? branch.name_tr : branch.name_en}
                  </h2>
                  <div className="space-y-4">
                    {(locale === 'tr' ? branch.address_tr || branch.address_en : branch.address_en) && (
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {locale === 'tr' ? branch.address_tr || branch.address_en : branch.address_en}
                        </p>
                      </div>
                    )}
                    {branch.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        <a href={`tel:${branch.phone}`} className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          {branch.phone}
                        </a>
                      </div>
                    )}
                    {branch.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        <a href={`mailto:${branch.email}`} className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors break-all">
                          {branch.email}
                        </a>
                      </div>
                    )}
                    {branch.maps_url && (
                      <a href={branch.maps_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-500 hover:text-blue-600 text-sm transition-colors">
                        <MapPin className="w-5 h-5 flex-shrink-0" />
                        {locale === 'tr' ? 'Haritada Gör' : 'View on Map'}
                      </a>
                    )}
                  </div>
                </div>
              ))}

              {/* Quick links */}
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm">{t('quickLinks')}</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Take the Free Level Test', href: `/${locale}/level-test` },
                    { label: 'Browse All Courses', href: `/${locale}/services` },
                    { label: 'View Study Abroad Programmes', href: `/${locale}/study-abroad` },
                    { label: 'Read FAQ', href: `/${locale}/faq` },
                  ].map(({ label, href }) => (
                    <Link key={label} href={href} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1">
                      <MessageSquare className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Right: form */}
            <AnimatedSection direction="right" className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-3">{t('messageSent')}</h2>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-md mx-auto mb-6">{t('messageSentBody')}</p>
                    <button onClick={() => { setSubmitted(false); setForm(initialForm) }} className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                      {t('sendAnother')}
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t('sendMessage')}</h2>
                    <form onSubmit={handleSubmit} noValidate className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('firstName')} <span className="text-red-500">*</span></label>
                          <input type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Maria"
                            className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.firstName ? 'border-red-400' : 'border-gray-300 dark:border-gray-700'}`} />
                          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('lastName')} <span className="text-red-500">*</span></label>
                          <input type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Santos"
                            className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.lastName ? 'border-red-400' : 'border-gray-300 dark:border-gray-700'}`} />
                          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('emailAddress')} <span className="text-red-500">*</span></label>
                          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="maria@example.com"
                            className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.email ? 'border-red-400' : 'border-gray-300 dark:border-gray-700'}`} />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('phone')}</label>
                          <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+44 7700 900000"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('enquiryType')} <span className="text-red-500">*</span></label>
                          <select name="enquiryType" value={form.enquiryType} onChange={handleChange}
                            className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.enquiryType ? 'border-red-400' : 'border-gray-300 dark:border-gray-700'}`}>
                            <option value="">{t('selectType')}</option>
                            {enquiryTypes.map((type) => (
                              <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                          </select>
                          {errors.enquiryType && <p className="text-red-500 text-xs mt-1">{errors.enquiryType}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('languageOfInterest')}</label>
                          <select name="language" value={form.language} onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
                            <option value="">{t('selectLanguage')}</option>
                            {['English', 'French', 'Spanish', 'German', 'Italian', 'Mandarin', 'Arabic', 'Portuguese', 'Other'].map((l) => (
                              <option key={l} value={l}>{l}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('message')} <span className="text-red-500">*</span></label>
                        <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder={t('messagePlaceholder')}
                          className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none ${errors.message ? 'border-red-400' : 'border-gray-300 dark:border-gray-700'}`} />
                        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                        <p className="text-xs text-gray-400 mt-1">{form.message.length}/500 characters</p>
                      </div>

                      <div>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange}
                            className="w-4 h-4 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 flex-shrink-0" />
                          <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{t('consent')}</span>
                        </label>
                        {errors.consent && <p className="text-red-500 text-xs mt-1 ml-7">{errors.consent}</p>}
                      </div>

                      {submitError && (
                        <p className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
                          {submitError}
                        </p>
                      )}

                      <button type="submit" disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 rounded-xl transition-colors text-base shadow-lg shadow-blue-500/20">
                        {loading ? (
                          <>
                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            {t('sending')}
                          </>
                        ) : (
                          <><Send className="w-5 h-5" />{t('sendMessageBtn')}</>
                        )}
                      </button>

                      <p className="text-xs text-center text-gray-400">{t('responseTime')}</p>
                    </form>
                  </>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Bottom info bar */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: '⚡', title: t('fastResponse'), desc: t('fastResponseDesc') },
              { icon: '🎓', title: t('expertAdvice'), desc: t('expertAdviceDesc') },
              { icon: '🤝', title: t('noPressure'), desc: t('noPressureDesc') },
            ].map((item) => (
              <div key={item.title} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
