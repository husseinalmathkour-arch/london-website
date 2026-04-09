'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface TypewriterProps {
  words: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  className?: string
}

export default function Typewriter({
  words,
  typingSpeed = 100,
  deletingSpeed = 60,
  pauseDuration = 2000,
  className = '',
}: TypewriterProps) {
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const wordIndexRef = useRef(0)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const currentWord = words[wordIndexRef.current]

    const type = () => {
      if (!isDeleting) {
        if (text.length < currentWord.length) {
          setText(currentWord.slice(0, text.length + 1))
          timeoutRef.current = setTimeout(type, typingSpeed)
        } else {
          // Pause at full word, then start deleting
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true)
          }, pauseDuration)
        }
      } else {
        if (text.length > 0) {
          setText(currentWord.slice(0, text.length - 1))
          timeoutRef.current = setTimeout(type, deletingSpeed)
        } else {
          setIsDeleting(false)
          wordIndexRef.current = (wordIndexRef.current + 1) % words.length
        }
      }
    }

    timeoutRef.current = setTimeout(type, isDeleting ? deletingSpeed : typingSpeed)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [text, isDeleting, words, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <span className={className}>
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block w-[3px] h-[0.85em] ml-0.5 align-middle rounded-sm"
        style={{ backgroundColor: '#c3ab73' }}
      />
    </span>
  )
}
