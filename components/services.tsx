"use client"

import { ArrowRight } from "lucide-react"
import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useStaggerChildren } from "@/hooks/use-gsap-animations"
import { TiltCard } from "@/components/tilt-card"
import { SectionHeader, ScrollReveal } from "@/components/scroll-reveal"
import { WhatsAppLink } from "@/components/whatsapp-link"
import { serviceIcons, DISABLED_SERVICE_INDEX } from "@/lib/service-icons"
import type { Dictionary } from "@/lib/i18n/types"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const serviceStyles = [
  { color: "text-cyan-400", bgColor: "bg-cyan-400/10", borderGlow: "hover:shadow-[0_0_30px_-5px] hover:shadow-cyan-400/30" },
  { color: "text-accent", bgColor: "bg-accent/10", borderGlow: "hover:shadow-[0_0_30px_-5px] hover:shadow-accent/30" },
  { color: "text-foreground", bgColor: "bg-foreground/10", borderGlow: "hover:shadow-[0_0_30px_-5px] hover:shadow-white/20" },
  { color: "text-teal-400", bgColor: "bg-teal-400/10", borderGlow: "hover:shadow-[0_0_30px_-5px] hover:shadow-teal-400/30" },
  { color: "text-accent", bgColor: "bg-accent/10", borderGlow: "hover:shadow-[0_0_30px_-5px] hover:shadow-accent/30" },
  { color: "text-muted-foreground", bgColor: "bg-muted/50", borderGlow: "" },
]

export function Services({ dict }: { dict: Dictionary }) {
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

  const services = dict.services.items.map((item, i) => ({
    ...item,
    icon: serviceIcons[i],
    ...serviceStyles[i],
    disabled: i === DISABLED_SERVICE_INDEX,
  }))

  return (
    <section id="services" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title={dict.services.sectionTitle}
          description={dict.services.sectionDescription}
        />

        <div className="space-y-4">
          {/* Row 1: 2 columns */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.slice(0, 2).map((service, index) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={index}
                isMobile={isMobile}
                isActive={activeCard === service.title}
                onActivate={setActiveCard}
                ctaLabel={dict.services.cta}
                ctaMessage={dict.services.ctaMessage}
              />
            ))}
          </div>

          {/* Row 2: 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.slice(2, 5).map((service, index) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={index}
                isMobile={isMobile}
                isActive={activeCard === service.title}
                onActivate={setActiveCard}
                ctaLabel={dict.services.cta}
                ctaMessage={dict.services.ctaMessage}
              />
            ))}
          </div>

          {/* Row 3: last card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.slice(5).map((service) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={0}
                isMobile={isMobile}
                isActive={activeCard === service.title}
                onActivate={setActiveCard}
                ctaLabel={dict.services.cta}
                ctaMessage={dict.services.ctaMessage}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Service card: desktop uses CSS :hover (unchanged). Mobile simulates hover
// via tap + in-view activation, driven by a single shared "active" state so
// only one card is active at a time. Only visual properties animate.
function ServiceCard({
  service,
  index,
  isMobile,
  isActive,
  onActivate,
  ctaLabel,
  ctaMessage,
}: {
  service: {
    icon: React.ElementType
    title: string
    description: string
    color: string
    bgColor: string
    borderGlow: string
    badge?: string
    disabled: boolean
  }
  index: number
  isMobile: boolean
  isActive: boolean
  onActivate: (title: string | null) => void
  ctaLabel: string
  ctaMessage: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Mobile: soft-activate when the card is at least 40% in view.
  // Because activation lives in the parent's single state, scrolling naturally
  // hands the "active" state from one card to the next (one at a time).
  useEffect(() => {
    if (!cardRef.current || !isMobile || service.disabled) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onActivate(service.title)
        }
      },
      {
        // Interaction zone: a band between ~35vh (top) and ~75vh (bottom).
        // The card activates as it enters this central band and stays active
        // while scrolling, only turning off once its top moves above
        // ~35vh from the top of the viewport (the upper third).
        rootMargin: "-15% 0px -45% 0px",
        threshold: 0,
      }
    )

    observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [isMobile, service.disabled, service.title, onActivate])

  // Tap toggles this card; tapping a different card is handled by the shared
  // state in the parent (the previous card simply stops matching).
  const handleClick = () => {
    if (!isMobile || service.disabled) return
    onActivate(isActive ? null : service.title)
  }

  // Mobile shows the "hover" visual when active. Desktop relies on CSS :hover.
  const showActive = isMobile && isActive && !service.disabled

  return (
    <ScrollReveal delay={index * 100}>
      <div
        ref={cardRef}
        onClick={handleClick}
        className={`group h-full ${isMobile && !service.disabled ? "cursor-pointer" : ""}`}
      >
        <TiltCard
          className={`relative rounded-2xl border p-6 backdrop-blur-[2px] card-shine overflow-hidden transition duration-300 h-full flex flex-col ${
            service.disabled
              ? "opacity-60 border-white/[0.08] bg-white/[0.01]"
              : isMobile
                ? `${
                    showActive
                      ? "border-accent/50 bg-white/[0.03] shadow-[0_0_30px_-5px_rgba(254,199,0,0.3)]"
                      : "border-white/[0.08] bg-white/[0.01]"
                  }`
                : `border-white/[0.08] bg-white/[0.01] hover:border-accent/50 hover:bg-white/[0.03] ${service.borderGlow}`
          }`}
          max={service.disabled ? 0 : 8}
          scale={service.disabled ? 1 : 1.02}
        >
          {/* Badge */}
          {service.badge && (
            <span className="absolute top-6 right-6 text-card-meta px-3 py-1 rounded-full bg-muted text-muted-foreground">
              {service.badge}
            </span>
          )}

          {/* Icon with scale/rotate animation (transform only - layout safe) */}
          <div
            className={`size-12 rounded-xl ${service.bgColor} flex items-center justify-center mb-6 transition-transform duration-300 ${
              isMobile
                ? showActive
                  ? "scale-110 rotate-6"
                  : ""
                : "group-hover:scale-110 group-hover:rotate-6"
            }`}
          >
            <service.icon
              className={`size-6 ${service.color} transition-transform duration-300 ${
                isMobile ? (showActive ? "scale-110" : "") : "group-hover:scale-110"
              }`}
            />
          </div>

          {/* Content */}
          <h3
            className={`text-card-title-lg font-semibold mb-3 ${
              service.disabled ? "text-muted-foreground" : "text-foreground"
            }`}
          >
            {service.title}
          </h3>
          <p className="text-card-body text-muted-foreground">
            {service.description}
          </p>

          {/* Per-service CTA. Present on every card so all six share one anatomy;
              mt-auto pins it to the bottom so buttons line up across a row whatever
              the description length. relative z-10 is required - .card-shine::before
              covers the card and would otherwise swallow the click. */}
          <div className="mt-auto pt-6 flex justify-end relative z-10">
            {service.disabled ? (
              // Genuinely disabled, not just styled that way: unclickable and skipped
              // when tabbing. The "Standby" badge explains why.
              <button
                type="button"
                disabled
                className="inline-flex items-center gap-1.5 h-9 sm:h-8 px-3 -mr-3 rounded-md text-sm font-medium text-muted-foreground/50 cursor-not-allowed"
              >
                {ctaLabel}
                <ArrowRight className="size-3.5" />
              </button>
            ) : (
              <WhatsAppLink
                source="service-card"
                detail={service.title}
                message={ctaMessage.replace('{service}', service.title)}
                // Stop the mobile card-tap handler from also toggling the card.
                onClick={(event) => event.stopPropagation()}
                className={`inline-flex items-center gap-1.5 h-9 sm:h-8 px-3 -mr-3 rounded-md text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  isMobile
                    ? showActive
                      ? "text-accent"
                      : "text-muted-foreground"
                    : "text-muted-foreground group-hover:text-accent"
                }`}
              >
                {ctaLabel}
                <ArrowRight className="size-3.5" />
              </WhatsAppLink>
            )}
          </div>

          {/* Accent line - gradient border bottom (transform only - layout safe) */}
          {!service.disabled && (
            <div
              className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3B9EFF] to-accent transition-transform duration-500 origin-left ${
                isMobile
                  ? showActive
                    ? "scale-x-100"
                    : "scale-x-0"
                  : "scale-x-0 group-hover:scale-x-100"
              }`}
            />
          )}
        </TiltCard>
      </div>
    </ScrollReveal>
  )
}
