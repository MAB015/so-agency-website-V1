"use client"

import { Zap, DollarSign, Users, Layers } from "lucide-react"
import { useRef, useEffect, useState } from "react"
import { useStaggerChildren } from "@/hooks/use-gsap-animations"
import { SectionHeader, ScrollReveal } from "@/components/scroll-reveal"
import type { Dictionary } from "@/lib/i18n/types"

const benefitIcons = [Users, Zap, DollarSign, Layers]
const benefitGradients = [
  "from-[#3B9EFF] to-cyan-400",
  "from-[#FEC700] to-amber-400",
  "from-emerald-400 to-teal-400",
  "from-violet-400 to-purple-400",
]

export function Benefits({ dict }: { dict: Dictionary }) {
  const gridRef = useStaggerChildren<HTMLDivElement>(0.1)
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const benefits = dict.benefits.items.map((item, i) => ({
    ...item,
    icon: benefitIcons[i],
    gradient: benefitGradients[i],
  }))

  return (
    <section id="benefits" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title={dict.benefits.sectionTitle}
          description={dict.benefits.sectionDescription}
        />

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={benefit.title}
              benefit={benefit}
              index={index}
              isMobile={isMobile}
              isActive={activeCard === benefit.title}
              onActivate={setActiveCard}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function BenefitCard({
  benefit,
  index,
  isMobile,
  isActive,
  onActivate,
}: {
  benefit: { icon: React.ElementType; title: string; description: string; gradient: string }
  index: number
  isMobile: boolean
  isActive: boolean
  onActivate: (title: string | null) => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Mobile: activate when the card enters the central interaction band.
  useEffect(() => {
    if (!cardRef.current || !isMobile) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onActivate(benefit.title)
        }
      },
      {
        rootMargin: "-15% 0px -45% 0px",
        threshold: 0,
      }
    )

    observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [isMobile, benefit.title, onActivate])

  // Tap toggles this card on mobile.
  const handleClick = () => {
    if (!isMobile) return
    onActivate(isActive ? null : benefit.title)
  }

  // Mobile shows the "hover" visual when active. Desktop relies on CSS :hover.
  const showActive = isMobile && isActive

  return (
    <ScrollReveal delay={index * 100}>
      <div
        ref={cardRef}
        onClick={handleClick}
        className={`group text-center p-6 rounded-xl bg-card/30 border transition-all duration-500 card-hover-3d card-shine h-full ${
          isMobile
            ? `cursor-pointer ${showActive ? "border-primary/30" : "border-border/30"}`
            : "border-border/30 hover:border-primary/30"
        }`}
      >
        {/* Icon with gradient background on hover */}
        <div
          className={`size-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
            isMobile
              ? showActive
                ? `bg-gradient-to-br ${benefit.gradient} shadow-lg`
                : ""
              : `group-hover:bg-gradient-to-br group-hover:${benefit.gradient} group-hover:shadow-lg`
          }`}
        >
          <benefit.icon
            className={`size-7 text-primary transition-colors duration-300 ${
              isMobile ? (showActive ? "text-white" : "") : "group-hover:text-white"
            }`}
          />
        </div>

        <h3
          className={`text-card-title font-semibold mb-2 transition-colors ${
            isMobile ? (showActive ? "text-[#FEC700]" : "text-foreground") : "text-foreground group-hover:text-[#FEC700]"
          }`}
        >
          {benefit.title}
        </h3>
        <p className="text-card-body text-muted-foreground">{benefit.description}</p>
      </div>
    </ScrollReveal>
  )
}
