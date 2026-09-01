"use client"

import { Search, Target, Rocket, TrendingUp } from "lucide-react"
import { useRef, useEffect, useState } from "react"
import { useTimelineProgress } from "@/hooks/use-gsap-animations"
import { SectionHeader, ScrollReveal } from "@/components/scroll-reveal"
import type { Dictionary } from "@/lib/i18n/types"

const stepIcons = [Search, Target, Rocket, TrendingUp]

export function Process({ dict }: { dict: Dictionary }) {
  const stepsRef = useTimelineProgress<HTMLDivElement>()
  const [activeStep, setActiveStep] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <section id="process" className="py-24 px-4 sm:px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title={dict.process.sectionTitle}
          description={dict.process.sectionDescription}
        />

        <div ref={stepsRef} className="grid md:grid-cols-4 gap-8">
          {dict.process.steps.map((step, index) => (
            <ProcessStep
              key={step.number}
              step={{ ...step, icon: stepIcons[index] }}
              index={index}
              isLast={index === dict.process.steps.length - 1}
              isMobile={isMobile}
              isActive={activeStep === step.number}
              onActivate={setActiveStep}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProcessStep({
  step,
  index,
  isLast,
  isMobile,
  isActive,
  onActivate,
}: {
  step: { icon: React.ElementType; number: string; title: string; subtitle: string; description: string }
  index: number
  isLast: boolean
  isMobile: boolean
  isActive: boolean
  onActivate: (number: string | null) => void
}) {
  const itemRef = useRef<HTMLDivElement>(null)

  // Mobile: activate when the step enters the central interaction band.
  // Because activation lives in the parent's single state, scrolling naturally
  // hands the "active" state from one step to the next (one at a time).
  useEffect(() => {
    if (!itemRef.current || !isMobile) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onActivate(step.number)
        }
      },
      {
        rootMargin: "-15% 0px -45% 0px",
        threshold: 0,
      }
    )

    observer.observe(itemRef.current)
    return () => observer.disconnect()
  }, [isMobile, step.number, onActivate])

  // Tap toggles this step on mobile.
  const handleClick = () => {
    if (!isMobile) return
    onActivate(isActive ? null : step.number)
  }

  // Mobile shows the "hover" visual when active. Desktop relies on CSS :hover.
  const showActive = isMobile && isActive

  return (
    <ScrollReveal delay={index * 150}>
      <div ref={itemRef} onClick={handleClick} className={`timeline-item relative group ${isMobile ? "cursor-pointer" : ""}`}>
        {/* Connector line */}
        {!isLast && (
          <div className="timeline-line hidden md:block absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-primary/50 to-primary/10 origin-left" />
        )}

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Icon container with hover effect */}
          <div
            className={`size-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 transition-all duration-300 ${
              isMobile
                ? showActive
                  ? "scale-110 bg-primary/20 border-primary/50 shadow-[0_0_30px_-5px] shadow-primary/40"
                  : ""
                : "group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_-5px] group-hover:shadow-primary/40"
            }`}
          >
            <step.icon
              className={`size-7 text-primary transition-transform duration-300 ${
                isMobile ? (showActive ? "scale-110" : "") : "group-hover:scale-110"
              }`}
            />
          </div>

          {/* Number badge */}
          <span className="text-card-meta font-mono text-primary mb-2">{step.number}</span>

          {/* Title */}
          <h3
            className={`text-card-title font-semibold mb-2 transition-colors ${
              isMobile ? (showActive ? "text-primary" : "text-foreground") : "text-foreground group-hover:text-primary"
            }`}
          >
            {step.title}
          </h3>

          {/* Subtitle */}
          <span className="text-card-meta text-primary uppercase tracking-wider mb-3">{step.subtitle}</span>

          {/* Description */}
          <p className="text-card-body text-muted-foreground">{step.description}</p>
        </div>
      </div>
    </ScrollReveal>
  )
}
