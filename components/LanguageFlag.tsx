type SupportedCountry = 'gb' | 'fr' | 'es' | 'de' | 'it' | 'sa' | 'ru'

function resolveCountryCode(input: { id?: string; name?: string; flag?: string }): SupportedCountry | null {
  const key = `${input.id ?? ''} ${input.name ?? ''} ${input.flag ?? ''}`.toLowerCase()

  if (key.includes('english') || key.includes('gb') || key.includes('🇬🇧')) return 'gb'
  if (key.includes('french') || key.includes('fr') || key.includes('🇫🇷')) return 'fr'
  if (key.includes('spanish') || key.includes('es') || key.includes('🇪🇸')) return 'es'
  if (key.includes('german') || key.includes('de') || key.includes('🇩🇪')) return 'de'
  if (key.includes('italian') || key.includes('it') || key.includes('🇮🇹')) return 'it'
  if (key.includes('arabic') || key.includes('sa') || key.includes('🇸🇦')) return 'sa'
  if (key.includes('russian') || key.includes('ru') || key.includes('🇷🇺')) return 'ru'

  return null
}

export default function LanguageFlag({
  id,
  name,
  flag,
  className = 'h-7 w-10',
}: {
  id?: string
  name?: string
  flag?: string
  className?: string
}) {
  const country = resolveCountryCode({ id, name, flag })
  const wrapperClassName = `inline-flex ${className} overflow-hidden rounded-lg border border-black/10 shadow-sm`
  const svgClassName = 'h-full w-full block'

  switch (country) {
    case 'gb':
      return (
        <span className={wrapperClassName}>
          <svg viewBox="0 0 28 20" preserveAspectRatio="none" className={svgClassName} aria-label={`${name ?? 'English'} flag`} role="img">
            <rect width="28" height="20" fill="#1F4AA8" />
            <path d="M0 0L28 20M28 0L0 20" stroke="#fff" strokeWidth="4" />
            <path d="M0 0L28 20M28 0L0 20" stroke="#C8102E" strokeWidth="2" />
            <path d="M14 0V20M0 10H28" stroke="#fff" strokeWidth="6" />
            <path d="M14 0V20M0 10H28" stroke="#C8102E" strokeWidth="3.5" />
          </svg>
        </span>
      )
    case 'fr':
      return (
        <span className={wrapperClassName}>
          <svg viewBox="0 0 28 20" preserveAspectRatio="none" className={svgClassName} aria-label={`${name ?? 'French'} flag`} role="img">
            <rect width="9.5" height="20" fill="#0055A4" />
            <rect x="9.25" width="9.5" height="20" fill="#fff" />
            <rect x="18.5" width="9.5" height="20" fill="#EF4135" />
          </svg>
        </span>
      )
    case 'es':
      return (
        <span className={wrapperClassName}>
          <svg viewBox="0 0 28 20" preserveAspectRatio="none" className={svgClassName} aria-label={`${name ?? 'Spanish'} flag`} role="img">
            <rect width="28" height="20" fill="#AA151B" />
            <rect y="4" width="28" height="12" fill="#F1BF00" />
          </svg>
        </span>
      )
    case 'de':
      return (
        <span className={wrapperClassName}>
          <svg viewBox="0 0 28 20" preserveAspectRatio="none" className={svgClassName} aria-label={`${name ?? 'German'} flag`} role="img">
            <rect width="28" height="6.67" fill="#111" />
            <rect y="6.67" width="28" height="6.67" fill="#DD0000" />
            <rect y="13.34" width="28" height="6.66" fill="#FFCE00" />
          </svg>
        </span>
      )
    case 'it':
      return (
        <span className={wrapperClassName}>
          <svg viewBox="0 0 28 20" preserveAspectRatio="none" className={svgClassName} aria-label={`${name ?? 'Italian'} flag`} role="img">
            <rect width="9.5" height="20" fill="#009246" />
            <rect x="9.25" width="9.5" height="20" fill="#fff" />
            <rect x="18.5" width="9.5" height="20" fill="#CE2B37" />
          </svg>
        </span>
      )
    case 'sa':
      return (
        <span className={wrapperClassName}>
          <svg viewBox="0 0 28 20" preserveAspectRatio="none" className={svgClassName} aria-label={`${name ?? 'Arabic'} flag`} role="img">
            <rect width="28" height="20" fill="#006C35" />
            <rect x="6" y="12.5" width="14" height="1.2" rx="0.6" fill="#fff" />
            <circle cx="20.8" cy="13.1" r="1" fill="#fff" />
            <path d="M6.2 7.3h15.2" stroke="#fff" strokeWidth="1.1" strokeLinecap="round" />
            <path d="M7 5.6h13.6M9 8.9h10.2" stroke="#fff" strokeWidth="0.85" strokeLinecap="round" />
          </svg>
        </span>
      )
    case 'ru':
      return (
        <span className={wrapperClassName}>
          <svg viewBox="0 0 28 20" preserveAspectRatio="none" className={svgClassName} aria-label={`${name ?? 'Russian'} flag`} role="img">
            <rect width="28" height="6.67" fill="#fff" />
            <rect y="6.67" width="28" height="6.67" fill="#0039A6" />
            <rect y="13.34" width="28" height="6.66" fill="#D52B1E" />
          </svg>
        </span>
      )
    default:
      return <span className={`inline-flex items-center justify-center text-3xl ${className}`}>{flag}</span>
  }
}
