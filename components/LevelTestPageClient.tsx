'use client'

import { useState, useEffect, useRef } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, ChevronRight, RotateCcw, BookOpen, Award, User, Mail, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'
import { questionPool } from '@/lib/data'
import type { QuizQuestion } from '@/lib/data'
import AnimatedSection from '@/components/AnimatedSection'

interface StudentInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  branch: string
}

interface Branch {
  id: string
  name_en: string
  name_tr: string | null
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function selectQuestions(): QuizQuestion[] {
  const plan: Array<{ level: QuizQuestion['level']; count: number }> = [
    { level: 'A1', count: 2 },
    { level: 'A2', count: 2 },
    { level: 'B1', count: 2 },
    { level: 'B2', count: 2 },
    { level: 'C1', count: 1 },
    { level: 'C2', count: 1 },
  ]
  return plan.flatMap(({ level, count }) => {
    const pool = shuffleArray(questionPool.filter(q => q.level === level))
    return pool.slice(0, count).map(q => {
      const correctAnswer = q.options[q.correct]
      const shuffledOptions = shuffleArray(q.options)
      return { ...q, options: shuffledOptions, correct: shuffledOptions.indexOf(correctAnswer) }
    })
  })
}

interface Answer {
  questionId: number
  selectedOption: number
  isCorrect: boolean
}

export default function LevelTestPageClient({ branches }: { branches: Branch[] }) {
  const t = useTranslations('levelTest')
  const locale = useLocale()
  const [showForm, setShowForm] = useState(false)
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({ firstName: '', lastName: '', email: '', phone: '', branch: '' })
  const [formErrors, setFormErrors] = useState<Partial<StudentInfo>>({})
  const [started, setStarted] = useState(false)
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [finished, setFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const answeredRef = useRef<Set<number>>(new Set())

  function validateForm(): boolean {
    const errors: Partial<StudentInfo> = {}
    if (!studentInfo.firstName.trim()) errors.firstName = t('formErrorFirstName')
    if (!studentInfo.lastName.trim()) errors.lastName = t('formErrorLastName')
    if (!studentInfo.email.trim()) errors.email = t('formErrorEmail')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentInfo.email)) errors.email = t('formErrorEmailInvalid')
    if (!studentInfo.phone.trim()) errors.phone = t('formErrorPhone')
    if (!studentInfo.branch) errors.branch = t('formErrorBranch')
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  function handleFormSubmit() {
    if (!validateForm()) return
    setQuestions(selectQuestions())
    setStarted(true)
  }

  const currentQuestion = questions[currentIndex]
  const totalQuestions = questions.length

  function getResult(score: number, total: number) {
    const pct = (score / total) * 100
    if (pct < 20) return { level: 'A1', label: t('results.a1.label'), color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/30', desc: t('results.a1.desc') }
    if (pct < 35) return { level: 'A2', label: t('results.a2.label'), color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-950/30', desc: t('results.a2.desc') }
    if (pct < 50) return { level: 'B1', label: t('results.b1.label'), color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-950/30', desc: t('results.b1.desc') }
    if (pct < 65) return { level: 'B2', label: t('results.b2.label'), color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-950/30', desc: t('results.b2.desc') }
    if (pct < 80) return { level: 'C1', label: t('results.c1.label'), color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/30', desc: t('results.c1.desc') }
    return { level: 'C2', label: t('results.c2.label'), color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-950/30', desc: t('results.c2.desc') }
  }

  // 30-second timer per question
  useEffect(() => {
    if (!started || finished || questions.length === 0) return
    setTimeLeft(30)
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!)
          if (!answeredRef.current.has(currentIndex)) {
            answeredRef.current.add(currentIndex)
            setAnswers(a => [...a, { questionId: questions[currentIndex].id, selectedOption: -1, isCorrect: false }])
            setSelectedOption(-1)
            setShowExplanation(true)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current!)
  }, [currentIndex, started, finished, questions])

  const progress = ((currentIndex) / totalQuestions) * 100
  const score = answers.filter((a) => a.isCorrect).length
  const result = getResult(score, totalQuestions)

  function handleOptionSelect(optionIndex: number) {
    if (selectedOption !== null) return
    if (answeredRef.current.has(currentIndex)) return
    answeredRef.current.add(currentIndex)
    clearInterval(timerRef.current!)
    setSelectedOption(optionIndex)
    setShowExplanation(true)
    const isCorrect = optionIndex === currentQuestion.correct
    setAnswers((prev) => [
      ...prev,
      { questionId: currentQuestion.id, selectedOption: optionIndex, isCorrect },
    ])
  }

  async function handleNext() {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((i) => i + 1)
      setSelectedOption(null)
      setShowExplanation(false)
      setTimeLeft(30)
    } else {
      clearInterval(timerRef.current!)
      const finalAnswers = answers
      const finalScore = finalAnswers.filter(a => a.isCorrect).length
      const finalResult = getResult(finalScore, totalQuestions)
      try {
        await fetch('/api/level-test', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            first_name: studentInfo.firstName,
            last_name: studentInfo.lastName,
            email: studentInfo.email,
            phone: studentInfo.phone,
            branch: studentInfo.branch,
            score: finalScore,
            total: totalQuestions,
            level: finalResult.level,
            answers: finalAnswers,
          }),
        })
      } catch {
        // Silently fail — results still show
      }
      setFinished(true)
    }
  }

  function handleReset() {
    clearInterval(timerRef.current!)
    answeredRef.current = new Set()
    setShowForm(false)
    setStudentInfo({ firstName: '', lastName: '', email: '', phone: '', branch: '' })
    setFormErrors({})
    setStarted(false)
    setQuestions([])
    setCurrentIndex(0)
    setAnswers([])
    setSelectedOption(null)
    setShowExplanation(false)
    setFinished(false)
    setTimeLeft(30)
  }

  if (!started && !showForm) {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-950 dark:to-blue-950/20 flex items-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center w-full">
          <AnimatedSection>
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/30">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
              {t('heroHeading')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {t('heroDescription')}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: t('tenQuestions'), icon: '📝' },
                { label: t('fiveMinutes'), icon: '⏱️' },
                { label: t('freeInstant'), icon: '✅' },
              ].map((item) => (
                <div key={item.label} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg shadow-blue-500/30 transition-colors"
            >
              {t('startTest')} <ChevronRight className="w-5 h-5" />
            </button>

            <p className="text-xs text-gray-400 mt-4">
              {t('note')}
            </p>
          </AnimatedSection>
        </div>
      </div>
    )
  }

  if (!started && showForm) {
    const inputClass = (error?: string) =>
      `w-full px-4 py-3 rounded-xl border-2 text-sm font-medium bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 ${
        error ? 'border-red-400 dark:border-red-500' : 'border-gray-200 dark:border-gray-700'
      }`

    return (
      <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-950 dark:to-blue-950/20 flex items-center">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-xl">
              <div className="text-center mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
                  <User className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1">{t('formTitle')}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('formSubtitle')}</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">{t('formFirstName')}</label>
                    <input
                      type="text"
                      placeholder={t('formFirstNamePlaceholder')}
                      value={studentInfo.firstName}
                      onChange={e => setStudentInfo(p => ({ ...p, firstName: e.target.value }))}
                      className={inputClass(formErrors.firstName)}
                    />
                    {formErrors.firstName && <p className="text-xs text-red-500 mt-1">{formErrors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">{t('formLastName')}</label>
                    <input
                      type="text"
                      placeholder={t('formLastNamePlaceholder')}
                      value={studentInfo.lastName}
                      onChange={e => setStudentInfo(p => ({ ...p, lastName: e.target.value }))}
                      className={inputClass(formErrors.lastName)}
                    />
                    {formErrors.lastName && <p className="text-xs text-red-500 mt-1">{formErrors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">{t('formEmail')}</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      placeholder={t('formEmailPlaceholder')}
                      value={studentInfo.email}
                      onChange={e => setStudentInfo(p => ({ ...p, email: e.target.value }))}
                      className={`${inputClass(formErrors.email)} pl-10`}
                    />
                  </div>
                  {formErrors.email && <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">{t('formPhone')}</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      placeholder={t('formPhonePlaceholder')}
                      value={studentInfo.phone}
                      onChange={e => setStudentInfo(p => ({ ...p, phone: e.target.value }))}
                      className={`${inputClass(formErrors.phone)} pl-10`}
                    />
                  </div>
                  {formErrors.phone && <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">{t('formBranch')}</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <select
                      value={studentInfo.branch}
                      onChange={e => setStudentInfo(p => ({ ...p, branch: e.target.value }))}
                      className={`${inputClass(formErrors.branch)} pl-10 appearance-none`}
                    >
                      <option value="">{t('formBranchPlaceholder')}</option>
                      {branches.map(b => (
                        <option key={b.id} value={b.name_en}>
                          {b.name_en}
                        </option>
                      ))}
                    </select>
                  </div>
                  {formErrors.branch && <p className="text-xs text-red-500 mt-1">{formErrors.branch}</p>}
                </div>
              </div>

              <button
                onClick={handleFormSubmit}
                className="w-full mt-6 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-blue-500/20"
              >
                {t('startTest')} <ChevronRight className="w-5 h-5" />
              </button>

              <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-4">
                {t('formPrivacy')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  if (finished) {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-950 dark:to-blue-950/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 md:p-12 text-center shadow-xl">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
                <Award className="w-10 h-10 text-white" />
              </div>

              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">{t('yourResults')}</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                {t('youScored', { score, total: totalQuestions })}
              </p>

              <div className={`${result.bg} rounded-2xl p-8 mb-8`}>
                <div className={`text-5xl font-extrabold mb-2 ${result.color}`}>{result.level}</div>
                <div className={`text-xl font-bold mb-4 ${result.color}`}>{result.label}</div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-md mx-auto">
                  {result.desc}
                </p>
              </div>

              <div className="mb-8">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">{t('questionBreakdown')}</h3>
                <div className="space-y-2">
                  {answers.slice(0, totalQuestions).map((answer, idx) => (
                    <div
                      key={answer.questionId}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm"
                    >
                      <span className="text-gray-600 dark:text-gray-300">{t('questionLabel', { n: idx + 1, level: questions[idx].level })}</span>
                      <div className="flex items-center gap-2">
                        {answer.isCorrect ? (
                          <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
                            <CheckCircle className="w-4 h-4" /> {t('correct')}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-red-500 dark:text-red-400 font-medium">
                            <XCircle className="w-4 h-4" /> {t('incorrect')}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href={`/${locale}/contact?service=general-english`}
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-colors"
                >
                  {t('enrolInCourse', { level: result.level })}
                </Link>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" /> {t('retakeTest')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-950 dark:to-blue-950/20 flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col">

        <div className="mb-2 flex-shrink-0">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {t('questionOf', { current: currentIndex + 1, total: totalQuestions })}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                {t('level')}: {currentQuestion.level}
              </span>
              <span className={`text-sm font-bold tabular-nums px-2.5 py-0.5 rounded-lg ${
                timeLeft <= 10
                  ? 'bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
              }`}>
                ⏱ {timeLeft}s
              </span>
            </div>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="flex-1 min-h-0 flex flex-col"
          >
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg">

              <div className="px-5 pt-4 pb-2 flex-shrink-0">
                <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-snug">
                  {currentQuestion.question}
                </h2>
              </div>

              <div className="px-5 pb-5 space-y-2">
                {currentQuestion.options.map((option, index) => {
                  let style = 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20'

                  if (selectedOption !== null) {
                    if (selectedOption === -1) {
                      style = 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-500'
                    } else if (index === currentQuestion.correct) {
                      style = 'border-green-500 bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-200'
                    } else if (index === selectedOption && selectedOption !== currentQuestion.correct) {
                      style = 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-200'
                    } else {
                      style = 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-500'
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      disabled={selectedOption !== null}
                      className={`w-full text-left px-4 py-2.5 border-2 rounded-xl text-sm font-medium transition-all duration-150 flex items-center justify-between gap-3 ${style} ${selectedOption === null ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                      <span>{option}</span>
                      {selectedOption !== null && selectedOption !== -1 && (
                        <span className="flex-shrink-0">
                          {index === currentQuestion.correct ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : index === selectedOption ? (
                            <XCircle className="w-4 h-4 text-red-500" />
                          ) : null}
                        </span>
                      )}
                    </button>
                  )
                })}

                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-3"
                  >
                    <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-0.5">{t('explanation')}</p>
                    <p className="text-xs text-blue-700 dark:text-blue-200 leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </motion.div>
                )}

                {selectedOption !== null && (
                  <button
                    onClick={handleNext}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors text-sm"
                  >
                    {currentIndex < totalQuestions - 1 ? (
                      <>{t('nextQuestion')} <ChevronRight className="w-4 h-4" /></>
                    ) : (
                      <>{t('seeResults')} <Award className="w-4 h-4" /></>
                    )}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  )
}
