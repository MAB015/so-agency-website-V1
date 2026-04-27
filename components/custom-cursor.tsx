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
  const lastScrollDir = useRef<"up" | "down">("down")
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

      // Rotate rocket based on movement direction (only when moving fast enough and not scrolling)
      if (speed > 2 && !isScrolling) {
        gsap.to(rocket, {
          rotation: angle + 90, // +90 because rocket points up by default
          duration: 0.2,
          ease: "power2.out"
        })
        
        // Scale flame based on speed
        if (flame) {
          gsap.to(flame, {
            scaleY: Math.min(1 + speed * 0.04, 1.8),
            opacity: Math.min(0.7 + speed * 0.02, 1),
            duration: 0.1,
            transformOrigin: "16px 26px"
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
      lastScrollDir.current = dir

      // Boost rocket on scroll
      if (rocket && flame) {
        // Point rocket in scroll direction
        gsap.to(rocket, {
          rotation: dir === "down" ? 180 : 0,
          scale: 1.2,
          duration: 0.2,
          ease: "power2.out"
        })
        
        // Hide flame when scrolling down (rocket points down), show intensified when scrolling up
        gsap.to(flame, {
          scaleY: dir === "down" ? 0 : 2.2,
          opacity: dir === "down" ? 0 : 1,
          duration: 0.15,
          transformOrigin: "16px 26px"
        })
      }

      // After scroll stops: keep direction, just reset scale and flame back to calm
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
      scrollTimeout.current = setTimeout(() => {
        setScrollDir(null)
        setIsScrolling(false)

        if (rocket && flame) {
          // Keep the last scroll direction rotation — don't snap back to 0
          gsap.to(rocket, {
            rotation: lastScrollDir.current === "down" ? 180 : 0,
            scale: 1,
            duration: 0.4,
            ease: "elastic.out(1, 0.5)"
          })
          // Keep flame hidden if pointing down, show if pointing up
          gsap.to(flame, {
            scaleY: lastScrollDir.current === "down" ? 0 : 1,
            opacity: lastScrollDir.current === "down" ? 0 : 0.85,
            duration: 0.3,
            transformOrigin: "16px 26px"
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
  }, [])

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
            width="40"
            height="52"
            viewBox="0 0 32 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="flameGrad" x1="16" y1="26" x2="16" y2="44" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFF8" />
                <stop offset="20%" stopColor="#FEC700" />
                <stop offset="55%" stopColor="#FF6B35" />
                <stop offset="100%" stopColor="#FF443300" />
              </linearGradient>
              <linearGradient id="flameGradInner" x1="16" y1="26" x2="16" y2="38" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFF" />
                <stop offset="100%" stopColor="#FEC70000" />
              </linearGradient>
            </defs>

            {/* Flame — sits inside viewBox below rocket exhaust at y=26 */}
            <g ref={flameRef} style={{ transformOrigin: "16px 26px", opacity: 0.85 }}>
              {/* Outer flame */}
              <path d="M12 26 C11 30 10 34 12 38 C13.5 41 16 44 16 44 C16 44 18.5 41 20 38 C22 34 21 30 20 26 Z" fill="url(#flameGrad)" />
              {/* Inner flame */}
              <path d="M13.5 26 C13 29 12.5 32 14 35 C15 37 16 39 16 39 C16 39 17 37 18 35 C19.5 32 19 29 18.5 26 Z" fill="url(#flameGradInner)" opacity="0.7" />
            </g>

            {/* Left fin */}
            <path d="M10 17 C7 20 6 24 7 26 L10 25 Z" fill="#E6B800" />
            {/* Right fin */}
            <path d="M22 17 C25 20 26 24 25 26 L22 25 Z" fill="#E6B800" />

            {/* Rocket body */}
            <path d="M16 1 C16 1 9 8 9 17 C9 21.5 11 24.5 13.5 26 L18.5 26 C21 24.5 23 21.5 23 17 C23 8 16 1 16 1 Z" fill="#FEC700" />

            {/* Body highlight */}
            <path d="M16 2.5 C16 2.5 11.5 9 11.5 16.5 C11.5 19.5 12.5 22 14 24 L16 24 C13.5 22 12.5 19 12.5 16.5 C12.5 10 16 4 16 4 Z" fill="#FFE880" opacity="0.5" />

            {/* Exhaust nozzle */}
            <rect x="13" y="24" width="6" height="2.5" rx="1" fill="#C89A00" />

            {/* Window */}
            <circle cx="16" cy="13" r="3.5" fill="#0d0d1a" />
            <circle cx="16" cy="13" r="2.5" fill="#111827" />
            <circle cx="15" cy="12" r="1" fill="#3B9EFF" opacity="0.9" />
          </svg>
        </div>
      </div>
    </>
  )
}
