'use client'

import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

interface RotatingEarthProps {
  width?: number
  height?: number
  className?: string
  strokeColor?: string
  dotColor?: string
}

interface GeoFeature {
  geometry: {
    type: 'Polygon' | 'MultiPolygon'
    coordinates: number[][][] | number[][][][]
  }
}

export default function RotatingEarth({
  width = 520,
  height = 520,
  className = '',
  strokeColor = '#c3ab73',
  dotColor = 'rgba(195,171,115,0.78)',
}: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    if (!context) return

    let animationFrame = 0
    let mounted = true

    const containerWidth = width
    const containerHeight = height
    const radius = Math.min(containerWidth, containerHeight) / 2.75

    const dpr = window.devicePixelRatio || 1
    canvas.width = containerWidth * dpr
    canvas.height = containerHeight * dpr
    canvas.style.width = `${containerWidth}px`
    canvas.style.height = `${containerHeight}px`
    context.setTransform(1, 0, 0, 1, 0, 0)
    context.scale(dpr, dpr)

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90)

    const path = d3.geoPath().projection(projection).context(context)

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point
      let inside = false

      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i]
        const [xj, yj] = polygon[j]

        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside
        }
      }

      return inside
    }

    const pointInFeature = (point: [number, number], feature: GeoFeature): boolean => {
      const geometry = feature.geometry

      if (geometry.type === 'Polygon') {
        const coordinates = geometry.coordinates as number[][][]
        if (!pointInPolygon(point, coordinates[0])) return false

        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) return false
        }

        return true
      }

      if (geometry.type === 'MultiPolygon') {
        const coordinates = geometry.coordinates as number[][][][]

        for (const polygon of coordinates) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false

            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true
                break
              }
            }

            if (!inHole) return true
          }
        }
      }

      return false
    }

    const generateDotsInPolygon = (feature: GeoFeature, dotSpacing = 18) => {
      const dots: [number, number][] = []
      const bounds = d3.geoBounds(feature as never)
      const [[minLng, minLat], [maxLng, maxLat]] = bounds
      const stepSize = dotSpacing * 0.08

      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point: [number, number] = [lng, lat]
          if (pointInFeature(point, feature)) {
            dots.push(point)
          }
        }
      }

      return dots
    }

    const allDots: Array<{ lng: number; lat: number }> = []
    let landFeatures: { features: GeoFeature[] } | null = null
    let autoRotate = true
    const rotation = [0, -12]
    const rotationSpeed = 0.18

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight)

      const currentScale = projection.scale()
      const scaleFactor = currentScale / radius

      context.save()
      context.beginPath()
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, Math.PI * 2)
      context.strokeStyle = 'rgba(195,171,115,0.55)'
      context.lineWidth = 1.4 * scaleFactor
      context.stroke()
      context.restore()

      const graticule = d3.geoGraticule()
      context.beginPath()
      path(graticule())
      context.strokeStyle = 'rgba(195,171,115,0.18)'
      context.lineWidth = 0.7 * scaleFactor
      context.stroke()

      if (!landFeatures) return

      context.beginPath()
      landFeatures.features.forEach((feature) => {
        path(feature as never)
      })
      context.strokeStyle = strokeColor
      context.lineWidth = 0.9 * scaleFactor
      context.globalAlpha = 0.9
      context.stroke()
      context.globalAlpha = 1

      allDots.forEach((dot) => {
        const projected = projection([dot.lng, dot.lat])
        if (!projected) return

        context.beginPath()
        context.arc(projected[0], projected[1], 1.2 * scaleFactor, 0, Math.PI * 2)
        context.fillStyle = dotColor
        context.fill()
      })
    }

    const tick = () => {
      if (!mounted) return

      if (autoRotate) {
        rotation[0] += rotationSpeed
        projection.rotate(rotation as [number, number, number])
      }

      render()
      animationFrame = window.requestAnimationFrame(tick)
    }

    const loadWorldData = async () => {
      try {
        const response = await fetch('/ne_110m_land.json')

        if (!response.ok) throw new Error('Failed to load land data')

        const featureCollection = await response.json() as { features: GeoFeature[] }
        landFeatures = featureCollection

        featureCollection.features.forEach((feature) => {
          const dots = generateDotsInPolygon(feature)
          dots.forEach(([lng, lat]) => allDots.push({ lng, lat }))
        })

        tick()
      } catch {
        if (mounted) setError('Failed to load globe data')
      }
    }

    const handleMouseDown = (event: MouseEvent) => {
      autoRotate = false
      const startX = event.clientX
      const startY = event.clientY
      const startRotation = [...rotation]

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const dx = moveEvent.clientX - startX
        const dy = moveEvent.clientY - startY

        rotation[0] = startRotation[0] + dx * 0.35
        rotation[1] = Math.max(-45, Math.min(45, startRotation[1] - dy * 0.28))
        projection.rotate(rotation as [number, number, number])
        render()
      }

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        window.setTimeout(() => {
          autoRotate = true
        }, 40)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    canvas.addEventListener('mousedown', handleMouseDown)
    loadWorldData()

    return () => {
      mounted = false
      window.cancelAnimationFrame(animationFrame)
      canvas.removeEventListener('mousedown', handleMouseDown)
    }
  }, [dotColor, height, strokeColor, width])

  if (error) {
    return (
      <div className={`flex h-full items-center justify-center rounded-full border border-white/10 bg-black/10 text-sm text-white/65 ${className}`}>
        {error}
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="h-auto w-full"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  )
}
