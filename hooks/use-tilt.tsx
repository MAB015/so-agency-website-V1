"use client"

import { useRef, useEffect, useState, useCallback } from "react"

interface TiltOptions {
  max?: number // Maximum tilt angle in degrees
  perspective?: number // Perspective value in pixels
  scale?: number // Scale on hover
  speed?: number // Transition speed in ms
  disabled?: boolean // Disable on mobile
}

export function useTilt<T extends HTMLElement>(options: TiltOptions = {}) {
  const {
    max = 10,
    perspective = 1000,
    scale = 1.02,
    speed = 400,
    disabled = false,
  } = options

  const ref = useRef<T>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current || isMobile || disabled) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Calculate mouse position relative to center (-1 to 1)
      const mouseX = (e.clientX - centerX) / (rect.width / 2)
      const mouseY = (e.clientY - centerY) / (rect.height / 2)

      // Calculate rotation (inverted for natural feel)
      const rotateX = -mouseY * max
      const rotateY = mouseX * max

      ref.current.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
    },
    [max, perspective, scale, isMobile, disabled]
  )

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
  }, [perspective])

  useEffect(() => {
    const element = ref.current
    if (!element || isMobile || disabled) return

    // Set initial styles
    element.style.transformStyle = "preserve-3d"
    element.style.transition = `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`
    element.style.willChange = "transform"

    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave, speed, isMobile, disabled])

  return ref
}
