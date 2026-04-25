"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const rocketRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
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
        duration: 0.15,
        ease: "power2.out"
      })

      // Rotate rocket based on movement direction (only when moving fast enough)
      if (speed > 2) {
        gsap.to(rocket, {
          rotation: angle + 45, // +45 because rocket points diagonal by default
          duration: 0.2,
          ease: "power2.out"
        })
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

      // Tilt rocket on scroll
      if (rocket) {
        gsap.to(rocket, {
          y: dir === "down" ? -6 : 6,
          scale: 1.3,
          filter: dir === "down"
            ? "drop-shadow(0 0 8px #FEC700) drop-shadow(0 4px 12px #FF6B35)"
            : "drop-shadow(0 0 8px #FEC700) drop-shadow(0 -4px 12px #FF6B35)",
          duration: 0.15,
          ease: "power2.out"
        })
        if (trailRef.current) {
          gsap.to(trailRef.current, {
            opacity: 0.9,
            scaleY: dir === "down" ? 1 : -1,
            duration: 0.15,
          })
        }
      }

      // Clear direction after scroll stops
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
      scrollTimeout.current = setTimeout(() => {
        setScrollDir(null)
        if (rocket) {
          gsap.to(rocket, {
            y: 0,
            scale: 1,
            filter: "none",
            duration: 0.4,
            ease: "elastic.out(1, 0.5)"
          })
        }
        if (trailRef.current) {
          gsap.to(trailRef.current, {
            opacity: 0,
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
  }, [isVisible])

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
        {/* Scroll flame trail - appears below rocket when scrolling down, above when scrolling up */}
        <div
          ref={trailRef}
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            opacity: 0,
            top: scrollDir === "up" ? "auto" : "100%",
            bottom: scrollDir === "up" ? "100%" : "auto",
          }}
        >
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
            <path d="M6 0 C6 0 2 8 4 12 C5 14 6 16 6 20 C6 16 7 14 8 12 C10 8 6 0 6 0Z" fill="url(#flameGrad)" opacity="0.9"/>
            <path d="M6 4 C6 4 4 10 5 13 C5.5 14.5 6 16 6 19 C6 16 6.5 14.5 7 13 C8 10 6 4 6 4Z" fill="#FEC700" opacity="0.7"/>
            <defs>
              <linearGradient id="flameGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FEC700"/>
                <stop offset="60%" stopColor="#FF6B35"/>
                <stop offset="100%" stopColor="transparent"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Rocket icon - no circle, just the rocket */}
        <div
          ref={rocketRef}
          className={`transition-all duration-150 ${
            isClicking ? "scale-75" : isHovering && !scrollDir ? "scale-130" : "scale-100"
          }`}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#FEC700]"
          >
            {/* Rocket body */}
            <path
              d="M4.5 16.5C3 18 3 20.5 3 20.5C3 20.5 5.5 20.5 7 19C7.5 18.5 7.5 17.5 7 17C6.5 16.5 5.5 16.5 4.5 16.5Z"
              fill="currentColor"
              opacity="0.6"
            />
            <path
              d="M12 2C12 2 8 6 8 12C8 14.5 9 16.5 10 17.5L12 19.5L14 17.5C15 16.5 16 14.5 16 12C16 6 12 2 12 2Z"
              fill="currentColor"
            />
            {/* Rocket window */}
            <circle cx="12" cy="10" r="2" fill="#0a0a0a" />
            {/* Flames */}
            <path
              d="M10 19.5L12 22L14 19.5"
              stroke="#FF6B35"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-pulse"
            />
          </svg>
        </div>

        {/* Subtle glow on hover */}
        {isHovering && (
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: '48px',
              height: '48px',
              background: 'radial-gradient(circle, rgba(254, 199, 0, 0.1) 0%, transparent 70%)',
              filter: 'blur(6px)',
              pointerEvents: 'none'
            }}
          />
        )}
      </div>
    </>
  )
}
