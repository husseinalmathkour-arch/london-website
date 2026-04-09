'use client'

import React, { useEffect, useRef, useState, ReactNode } from 'react'
import { useTheme } from 'next-themes'

const registeredCards = new Set<HTMLDivElement>()
let listenersAttached = false

function handlePointerMove(e: PointerEvent) {
  registeredCards.forEach(card => {
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--x', (e.clientX - rect.left).toFixed(2))
    card.style.setProperty('--y', (e.clientY - rect.top).toFixed(2))
  })
}

function handleTouch(e: TouchEvent) {
  const touch = e.touches[0]
  if (!touch) return
  const el = document.elementFromPoint(touch.clientX, touch.clientY)
  registeredCards.forEach(card => {
    if (card === el || card.contains(el)) {
      const rect = card.getBoundingClientRect()
      card.style.setProperty('--x', (touch.clientX - rect.left).toFixed(2))
      card.style.setProperty('--y', (touch.clientY - rect.top).toFixed(2))
    } else {
      card.style.setProperty('--x', '-999')
      card.style.setProperty('--y', '-999')
    }
  })
}

function handleTouchEnd() {
  registeredCards.forEach(card => {
    card.style.setProperty('--x', '-999')
    card.style.setProperty('--y', '-999')
  })
}

const glowColorMap = {
  blue:   { h: 220, s: 80, l: 55 },
  purple: { h: 280, s: 80, l: 55 },
  green:  { h: 120, s: 70, l: 45 },
  red:    { h: 352, s: 65, l: 42 },
  orange: { h: 30,  s: 90, l: 55 },
  gold:   { h: 43,  s: 42, l: 61 },
}

interface GlowCardProps {
  children: ReactNode
  className?: string
  glowColor?: keyof typeof glowColorMap
  darkGlowColor?: keyof typeof glowColorMap
  outerClassName?: string
  innerClassName?: string
}

export function GlowCard({
  children,
  className = '',
  glowColor = 'red',
  darkGlowColor = 'gold',
  outerClassName = 'rounded-2xl',
  innerClassName = 'rounded-[14px]',
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    registeredCards.add(card)
    if (!listenersAttached) {
      document.addEventListener('pointermove', handlePointerMove, { passive: true })
      document.addEventListener('touchstart', handleTouch, { passive: true })
      document.addEventListener('touchmove', handleTouch, { passive: true })
      document.addEventListener('touchend', handleTouchEnd, { passive: true })
      listenersAttached = true
    }
    return () => {
      registeredCards.delete(card)
      if (registeredCards.size === 0) {
        document.removeEventListener('pointermove', handlePointerMove)
        document.removeEventListener('touchstart', handleTouch)
        document.removeEventListener('touchmove', handleTouch)
        document.removeEventListener('touchend', handleTouchEnd)
        listenersAttached = false
      }
    }
  }, [])

  const activeGlow = resolvedTheme === 'dark' && darkGlowColor ? glowColorMap[darkGlowColor] : glowColorMap[glowColor]
  const { h, s, l } = activeGlow

  return (
    <div
      ref={cardRef}
      className={`relative p-[2px] ${outerClassName}`}
      style={{
        background: `radial-gradient(350px circle at calc(var(--x, -999) * 1px) calc(var(--y, -999) * 1px), hsl(${h} ${s}% ${l}%), transparent 70%), hsl(0 0% 75% / 0.25)`,
      } as React.CSSProperties}
    >
      <div className={`relative overflow-hidden ${innerClassName} ${className}`}>
        {children}
      </div>
    </div>
  )
}
