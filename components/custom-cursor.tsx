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
      if (!isScrolling) {
        if (speed > 2) {
          gsap.to(rocket, {
            rotation: angle + 90, // +90 because rocket points up by default
            duration: 0.2,
            ease: "power2.out"
          })
        }
        // Always keep flame visible and scale with speed when not scrolling
        if (flame) {
          gsap.to(flame, {
            scaleY: speed > 2 ? Math.min(1 + speed * 0.04, 1.8) : 1,
            opacity: speed > 2 ? Math.min(0.75 + speed * 0.02, 1) : 0.75,
            duration: 0.15,
            transformOrigin: "16px 27px"
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
        
        // Hide flame completely during active scrolling to prevent artifacts
        gsap.to(flame, {
          opacity: 0,
          duration: 0.1,
          transformOrigin: "16px 27px"
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
          // Show flame only when pointing up (after scroll stops), hide when pointing down
          gsap.to(flame, {
            scaleY: lastScrollDir.current === "down" ? 0 : 1,
            opacity: lastScrollDir.current === "down" ? 0 : 0.8,
            duration: 0.4,
            transformOrigin: "16px 27px"
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

      {/* Main cursor.
          Its z-index sits above every other layer: this stands in for the pointer, so
          nothing may paint over it. It used to be z-[9999], tied with the right-click CTA
          (right-click-cta.tsx), and a tie is broken by DOM order - the CTA mounts later in
          app/layout.tsx, so it covered the rocket.
          pointer-events-none keeps being on top from intercepting the CTA's clicks. */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
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
              <linearGradient id="flameGrad" x1="16" y1="28" x2="16" y2="44" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FEC700" stopOpacity="1" />
                <stop offset="40%" stopColor="#FF6B35" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#FF4433" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="flameGradCore" x1="16" y1="28" x2="16" y2="38" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFE066" stopOpacity="1" />
                <stop offset="100%" stopColor="#FEC700" stopOpacity="0" />
              </linearGradient>
              <clipPath id="flameClip">
                <rect x="0" y="27" width="32" height="20" />
              </clipPath>
            </defs>

            {/* Flame — clipped to only render below y=27 */}
            <g ref={flameRef} clipPath="url(#flameClip)" style={{ transformOrigin: "16px 27px" }}>
              <path d="M12 28 C10.5 32 10 36 12.5 40 C14 42.5 16 44 16 44 C16 44 18 42.5 19.5 40 C22 36 21.5 32 20 28 Z" fill="url(#flameGrad)" />
              <path d="M13.5 28 C13 31 12.5 34 14.5 37 C15.2 38.5 16 40 16 40 C16 40 16.8 38.5 17.5 37 C19.5 34 19 31 18.5 28 Z" fill="url(#flameGradCore)" opacity="0.8" />
            </g>

            {/* Fins - curved and symmetrical */}
            <path d="M11 15 Q8 18 8 22 Q8 25 10 26 L13 23 Q12 20 11 15 Z" fill="#E6B800" />
            <path d="M21 15 Q24 18 24 22 Q24 25 22 26 L19 23 Q20 20 21 15 Z" fill="#E6B800" />

            {/* Rocket body - tapered cone shape, perfectly symmetrical */}
            <path 
              d="M16 2 C16 2 22 10 22 18 Q22 23 19.5 26 L16 28 L12.5 26 Q10 23 10 18 C10 10 16 2 16 2 Z"
              fill="#FEC700"
            />

            {/* Body top highlight - creates depth */}
            <path 
              d="M16 2.5 C16 2.5 19 8 19 15 Q19 20 17 24 L16 26 L16 2.5 Z"
              fill="#FFE880" 
              opacity="0.5" 
            />

            {/* Nozzle collar */}
            <ellipse cx="16" cy="27.5" rx="4" ry="1" fill="#C89A00" />

            {/* Exhaust ports - dual thrusters */}
            <circle cx="12" cy="27" r="1" fill="#D4AF37" opacity="0.8" />
            <circle cx="20" cy="27" r="1" fill="#D4AF37" opacity="0.8" />

            {/* Window - centered and prominent */}
            <circle cx="16" cy="11" r="3" fill="#0d0d1a" />
            <circle cx="16" cy="11" r="2.2" fill="#111827" />
            <circle cx="15" cy="10" r="0.9" fill="#3B9EFF" opacity="0.95" />
          </svg>
        </div>
      </div>
    </>
  )
}
