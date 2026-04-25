"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight, ExternalLink, Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollFadeIn } from "@/hooks/use-gsap-animations"
import gsap from "gsap"

const projects = [
  {
    id: 1,
    title: "La Feika",
    subtitle: "Fresh From China to LatAm",
    description: "E-commerce platform connecting Chinese fresh food suppliers with Latin American markets. A complete digital solution for cross-border commerce.",
    image: "/images/projects/lafeika.jpg",
    tags: ["E-Commerce", "Development", "Branding"],
    link: "#",
  },
  {
    id: 2,
    title: "It's Fuluz Time",
    subtitle: "Cruelty-Free Leather Goods",
    description: "A great option for high-quality, completely Cruelty-Free leather goods. Their products range from handbags and wallets to more.",
    image: "/images/projects/fuluz.jpg",
    tags: ["Web Design", "Development", "Branding"],
    link: "#",
  },
  {
    id: 3,
    title: "James Tucker",
    subtitle: "Financial Advisory",
    description: "Professional website for a financial advisory firm, focusing on trust, expertise, and client-centric service presentation.",
    image: "/images/projects/jamestucker.jpg",
    tags: ["Web Design", "UX/UI", "Development"],
    link: "#",
  },
  {
    id: 4,
    title: "Yaku Adventures",
    subtitle: "Tourism & Hiking Experiences",
    description: "Adventure tourism platform showcasing breathtaking hiking experiences and outdoor adventures across South America.",
    image: "/images/projects/yaku.jpg",
    tags: ["Web Design", "Branding", "Development"],
    link: "#",
  },
]

export function Portfolio() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const sectionRef = useScrollFadeIn<HTMLDivElement>()
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  // Direction: 1 = next (left to right), -1 = prev (right to left)
  const animateSlide = useCallback((newIndex: number, direction: 1 | -1 = 1) => {
    if (isAnimating || newIndex === currentIndex) return
    setIsAnimating(true)

    const slideOutX = direction === 1 ? -60 : 60
    const slideInX = direction === 1 ? 60 : -60

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(newIndex)
        setIsAnimating(false)
      }
    })

    // Animate out - slide in opposite direction
    tl.to(imageRef.current, {
      opacity: 0,
      x: slideOutX,
      scale: 0.95,
      duration: 0.35,
      ease: "power2.in"
    }, 0)
    tl.to(contentRef.current, {
      opacity: 0,
      x: slideOutX * 0.5,
      duration: 0.3,
      ease: "power2.in"
    }, 0.05)

    // Animate in - slide from direction side
    tl.fromTo(imageRef.current, 
      { opacity: 0, x: slideInX, scale: 1.02 },
      { opacity: 1, x: 0, scale: 1, duration: 0.45, ease: "power2.out" },
      0.4
    )
    tl.fromTo(contentRef.current,
      { opacity: 0, x: slideInX * 0.5 },
      { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
      0.5
    )
  }, [isAnimating, currentIndex])

  const nextSlide = useCallback(() => {
    const newIndex = (currentIndex + 1) % projects.length
    animateSlide(newIndex, 1)
  }, [currentIndex, animateSlide])

  const prevSlide = useCallback(() => {
    const newIndex = (currentIndex - 1 + projects.length) % projects.length
    animateSlide(newIndex, -1)
  }, [currentIndex, animateSlide])

  const goToSlide = useCallback((index: number) => {
    if (index === currentIndex) return
    const direction = index > currentIndex ? 1 : -1
    animateSlide(index, direction)
  }, [currentIndex, animateSlide])

  // Touch swipe handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current
    const threshold = 50 // Minimum swipe distance

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swiped left -> next
        nextSlide()
      } else {
        // Swiped right -> prev
        prevSlide()
      }
    }
  }, [nextSlide, prevSlide])

  // Autoplay
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide()
      if (e.key === "ArrowRight") nextSlide()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide])

  const currentProject = projects[currentIndex]

  return (
    <section id="portfolio" className="py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
      <div ref={sectionRef} className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <p className="text-sm font-medium text-[#FEC700] uppercase tracking-widest mb-2">Selected Work</p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Turning Ideas Into Masterpieces
            </h2>
          </div>
          
          {/* Navigation controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="size-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              aria-label={isAutoPlaying ? "Pause autoplay" : "Resume autoplay"}
            >
              {isAutoPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
            </button>
            <button
              onClick={prevSlide}
              className="size-10 sm:size-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              aria-label="Previous project"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={nextSlide}
              className="size-10 sm:size-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              aria-label="Next project"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {/* Carousel with touch support */}
        <div 
          ref={carouselRef}
          className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Image */}
          <div ref={imageRef} className="relative group">
            <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden border border-border bg-card/30">
              {/* Slide counter */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 bg-background/80 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-foreground">
                {String(currentIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </div>
              
              {/* Image with zoom effect */}
              <div className="w-full h-full overflow-hidden">
                <img
                  src={currentProject.image}
                  alt={currentProject.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="flex flex-col">
            <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
              {currentProject.title}
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground mb-3 sm:mb-4">
              {currentProject.subtitle}
            </p>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
              {currentProject.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
              {currentProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border text-xs sm:text-sm text-muted-foreground hover:border-[#FEC700]/50 hover:text-foreground transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="comet-border rounded-lg w-fit">
              <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 text-sm sm:text-base">
                <a href={currentProject.link} target="_blank" rel="noopener noreferrer">
                  Visit Website
                  <ExternalLink className="size-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-8 sm:mt-12">
          <div className="flex items-center gap-2 mb-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "flex-1 bg-[#FEC700]" 
                    : "w-6 sm:w-8 bg-border hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
          <div className="flex justify-end">
            <span className="text-xs sm:text-sm text-muted-foreground">
              {String(currentIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
