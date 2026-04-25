"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const rocketRef = useRef<HTMLDivElement>(null)
  const flameRef = useRef<SVGGElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollDir, setScrollDir] = useState<"up" | "down" | null>(null)
  const lastPosition = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })
  const lastScrollY = useRef(0)
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Only show custom cursor on desktop
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const cursor = cursorRef.current
    const rocket = rocketRef.current
    const flame = flameRef.current
    if (!cursor || !rocket) return

    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      
      // Calculate velocity for rotation
      velocity.current.x = mouseX - lastPosition.current.x
      velocity.current.y = mouseY - lastPosition.current.y
      lastPosition.current.x = mouseX
      lastPosition.current.y = mouseY

      if (!isVisible) setIsVisible(true)

      // Calculate rotation based on movement direction
      const angle = Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI)
      const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2)
      
      // Smooth cursor follow
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.12,
        ease: "power2.out"
      })

      // Rotate rocket based on movement direction (only when moving fast enough)
      if (speed > 2 && !isScrolling) {
        gsap.to(rocket, {
          rotation: angle + 90, // +90 because rocket points up by default
          duration: 0.2,
          ease: "power2.out"
        })
        
        // Scale flame based on speed
        if (flame) {
          gsap.to(flame, {
            scaleY: Math.min(1 + speed * 0.05, 2),
            opacity: Math.min(0.6 + speed * 0.02, 1),
            duration: 0.1
          })
        }
      }
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollY.current
      const dir = delta > 0 ? "down" : "up"
      lastScrollY.current = currentScrollY

      setScrollDir(dir)
      setIsScrolling(true)

      // Boost rocket on scroll
      if (rocket && flame) {
        // Point rocket in scroll direction
        gsap.to(rocket, {
          rotation: dir === "down" ? 180 : 0,
          scale: 1.2,
          duration: 0.2,
          ease: "power2.out"
        })
        
        // Intensify flame
        gsap.to(flame, {
          scaleY: 2.5,
          opacity: 1,
          duration: 0.15,
        })
      }

      // Clear direction after scroll stops
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
      scrollTimeout.current = setTimeout(() => {
        setScrollDir(null)
        setIsScrolling(false)
        if (rocket && flame) {
          gsap.to(rocket, {
            scale: 1,
            duration: 0.4,
            ease: "elastic.out(1, 0.5)"
          })
          gsap.to(flame, {
            scaleY: 1,
            opacity: 0.7,
            duration: 0.3,
          })
        }
      }, 150)
    }

    // Detect hoverable elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]')
      setIsHovering(!!isInteractive)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mousemove", handleElementHover)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousemove", handleElementHover)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
    }
  }, [isVisible, isScrolling])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null
  }

  return (
    <>
      {/* Hide default cursor globally */}
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ left: 0, top: 0 }}
      >
        {/* Rocket with integrated flame */}
        <div
          ref={rocketRef}
          className={`transition-transform duration-150 ${
            isClicking ? "scale-75" : isHovering && !isScrolling ? "scale-125" : "scale-100"
          }`}
          style={{ 
            filter: isScrolling 
              ? "drop-shadow(0 0 12px #FEC700) drop-shadow(0 0 20px rgba(255, 107, 53, 0.8))" 
              : isHovering 
                ? "drop-shadow(0 0 8px #FEC700)"
                : "drop-shadow(0 0 4px rgba(254, 199, 0, 0.5))"
          }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Flame - positioned at bottom, will scale with scroll */}
            <g ref={flameRef} style={{ transformOrigin: "16px 28px", opacity: 0.7 }}>
              {/* Outer flame */}
              <path
                d="M13 24 C13 24 11 28 12 30 C13 32 15 34 16 36 C17 34 19 32 20 30 C21 28 19 24 19 24"
                fill="url(#flameGradient)"
              />
              {/* Inner flame */}
              <path
                d="M14.5 24 C14.5 24 13.5 27 14 28.5 C14.5 30 15.5 31 16 32 C16.5 31 17.5 30 18 28.5 C18.5 27 17.5 24 17.5 24"
                fill="#FEC700"
              />
              {/* Core flame */}
              <path
                d="M15.5 24 C15.5 24 15 26 15.5 27 C16 28 16 28 16 28 C16 28 16 28 16.5 27 C17 26 16.5 24 16.5 24"
                fill="#FFF"
                opacity="0.9"
              />
            </g>

            {/* Rocket body */}
            <path
              d="M16 2 C16 2 10 8 10 16 C10 20 12 23 14 24 L16 24 L18 24 C20 23 22 20 22 16 C22 8 16 2 16 2Z"
              fill="#FEC700"
            />
            
            {/* Rocket highlight */}
            <path
              d="M16 3 C16 3 12 8 12 15 C12 18 13 20 14.5 22 L16 22 C14 20 13 17 13 15 C13 9 16 4 16 4"
              fill="#FFE066"
              opacity="0.6"
            />

            {/* Window */}
            <circle cx="16" cy="12" r="3" fill="#0a0a14" />
            <circle cx="16" cy="12" r="2" fill="#1a1a2e" />
            <circle cx="15" cy="11" r="0.8" fill="#3B9EFF" opacity="0.8" />

            {/* Left fin */}
            <path
              d="M10 18 C8 20 7 23 7 24 C8 24 10 23 12 21"
              fill="#FEC700"
            />
            
            {/* Right fin */}
            <path
              d="M22 18 C24 20 25 23 25 24 C24 24 22 23 20 21"
              fill="#FEC700"
            />

            {/* Gradients */}
            <defs>
              <linearGradient id="flameGradient" x1="16" y1="24" x2="16" y2="36" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FEC700" />
                <stop offset="40%" stopColor="#FF6B35" />
                <stop offset="80%" stopColor="#FF4444" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </>
  )
}
