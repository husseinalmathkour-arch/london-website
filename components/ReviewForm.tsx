'use client'

import { useState } from 'react'
import { Star, Send, CheckCircle } from 'lucide-react'
import { useLocale } from 'next-intl'

export default function ReviewForm() {
  const locale = useLocale()
  const isTR = locale === 'tr'

  const ui = {
    heading: isTR ? 'Yorum Bırak' : 'Leave a Review',
    subheading: isTR
      ? 'Deneyiminizi paylaşın — yorumunuz incelendikten sonra yayınlanacaktır.'
      : 'Share your experience — your review will be published after approval.',
    namePlaceholder: isTR ? 'Adınız *' : 'Your name *',
    rolePlaceholder: isTR ? 'Kurs / Seviye (isteğe bağlı)' : 'Course / Level (optional)',
    reviewPlaceholder: isTR ? 'Deneyiminizi yazın... *' : 'Write your experience... *',
    ratingLabel: isTR ? 'Puanınız *' : 'Your rating *',
    submit: isTR ? 'Gönder' : 'Submit Review',
    submitting: isTR ? 'Gönderiliyor...' : 'Submitting...',
    successHeading: isTR ? 'Teşekkürler!' : 'Thank you!',
    successBody: isTR
      ? 'Yorumunuz alındı. İncelendikten sonra sitede yayınlanacak.'
      : 'Your review has been received. It will appear on the site after we review it.',
    nameRequired: isTR ? 'İsim gereklidir.' : 'Name is required.',
    reviewRequired: isTR ? 'Yorum gereklidir.' : 'Review text is required.',
    ratingRequired: isTR ? 'Lütfen bir puan seçin.' : 'Please select a rating.',
  }

  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [content, setContent] = useState('')
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!name.trim()) { setError(ui.nameRequired); return }
    if (!content.trim()) { setError(ui.reviewRequired); return }
    if (rating === 0) { setError(ui.ratingRequired); return }

    setSubmitting(true)
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, role, content, rating }),
      })
      const body = await res.json()
      if (!res.ok) { setError(body.error ?? ui.reviewRequired); return }
      setSubmitted(true)
    } catch {
      setError(isTR ? 'Bir hata oluştu. Lütfen tekrar deneyin.' : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto text-center py-12">
        <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{ui.successHeading}</h3>
        <p className="text-gray-500 dark:text-gray-400">{ui.successBody}</p>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">{ui.heading}</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{ui.subheading}</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-7 space-y-5 shadow-sm">
        {/* Star rating */}
        <div>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{ui.ratingLabel}</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                onMouseEnter={() => setHovered(n)}
                onMouseLeave={() => setHovered(0)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 transition-colors ${
                    n <= (hovered || rating)
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Name */}
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder={ui.namePlaceholder}
          className="w-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Role */}
        <input
          type="text"
          value={role}
          onChange={e => setRole(e.target.value)}
          placeholder={ui.rolePlaceholder}
          className="w-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Review */}
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder={ui.reviewPlaceholder}
          rows={5}
          className="w-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors"
        >
          <Send className="w-4 h-4" />
          {submitting ? ui.submitting : ui.submit}
        </button>
      </form>
    </div>
  )
}
