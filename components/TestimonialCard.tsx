import { Star, Quote } from 'lucide-react'
import type { Testimonial } from '@/lib/data'
import { GlowCard } from '@/components/ui/spotlight-card'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <GlowCard glowColor="red" className="bg-white dark:bg-gray-900 p-7 flex flex-col gap-4 h-full">
      {/* Stars */}
      <div className="flex items-center gap-1">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
        ))}
      </div>

      {/* Quote */}
      <div className="relative flex-1">
        <Quote className="w-8 h-8 text-blue-100 dark:text-blue-950 absolute -top-1 -left-1" />
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed relative z-10 pt-2">
          &ldquo;{testimonial.text}&rdquo;
        </p>
      </div>

      {/* Course badge */}
      <div>
        <span className="inline-block text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded-full">
          {testimonial.course}
        </span>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
          {testimonial.avatar}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {testimonial.role} &middot; {testimonial.country}
          </p>
        </div>
      </div>
    </GlowCard>
  )
}
