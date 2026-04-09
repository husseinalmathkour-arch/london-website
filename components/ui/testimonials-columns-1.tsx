'use client'
import React, { useId, useState } from 'react'
import { Star } from 'lucide-react'
import Image from 'next/image'

export type TestimonialItem = {
  text: string;
  image: string;
  name: string;
  role: string;
  rating?: number;
};

export const TestimonialsColumn = (props: {
  className?: string
  testimonials: TestimonialItem[]
  duration?: number
}) => {
  const [isPaused, setIsPaused] = useState(false)
  const animationName = `testimonial-scroll-${useId().replace(/:/g, '')}`

  return (
    <div
      className={props.className}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex flex-col gap-6 pb-6 bg-white dark:bg-gray-950"
        style={{
          animationName,
          animationDuration: `${props.duration || 10}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {[...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role, rating }, i) => (
              <div
                className="p-7 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-lg shadow-[#70212c]/5 dark:shadow-black/20 max-w-xs w-full bg-white dark:bg-gray-900"
                key={i}
              >
                {rating && (
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: rating }).map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                )}
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{text}</p>
                <div className="flex items-center gap-3 mt-5">
                  <Image
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    unoptimized
                    className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex flex-col">
                    <div className="font-semibold text-sm text-gray-900 dark:text-white leading-5">{name}</div>
                    <div className="text-xs leading-5 text-gray-400 dark:text-gray-500">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))]}
      </div>
      <style jsx>{`
        @keyframes ${animationName} {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-50%);
          }
        }
      `}</style>
    </div>
  )
}
