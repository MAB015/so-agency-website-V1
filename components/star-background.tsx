"use client"

import { useEffect, useState } from "react"

interface Star {
  id: number
  x: number
  y: number
  size: number
  delay: number
}

export function StarBackground() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    // Check if mobile for reduced star count
    const isMobile = window.matchMedia("(max-width: 768px)").matches
    const starCount = isMobile ? 25 : 50

    const generatedStars: Star[] = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3,
    }))
    setStars(generatedStars)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            opacity: 0.3,
          }}
        />
      ))}
    </div>
  )
}
