"use client"

import { Button } from "@/components/ui/button"
import { StarBackground } from "@/components/star-background"
import { ArrowRight, Rocket } from "lucide-react"
import { useHeroAnimation } from "@/hooks/use-gsap-animations"

export function Hero() {
  const heroRef = useHeroAnimation<HTMLDivElement>()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
      
      {/* Stars */}
      <StarBackground />

      {/* Content */}
      <div ref={heroRef} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-20">
        {/* Badge with blinking rocket */}
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm mb-8 opacity-0">
          <Rocket className="size-4 animate-pulse-glow text-[#FEC700]" />
          <span>Your Digital Launch Partner</span>
        </div>

        {/* Main headline */}
        <h1 className="hero-title font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance mb-4 opacity-0">
          Your vision, our{" "}
          <span className="text-foreground">stellar</span> design
        </h1>

        {/* Slogan */}
        <div className="hero-subtitle mb-6 opacity-0">
          <p className="font-[family-name:var(--font-roboto)] text-xl sm:text-2xl md:text-3xl font-bold tracking-widest uppercase text-foreground">
            Design. Build. Launch.
          </p>
        </div>

        {/* Description */}
        <p className="hero-description text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty opacity-0">
          We transform your business ideas into high-performing digital presences — 
          from stunning websites to complete brand identities.
        </p>

        {/* CTAs */}
        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
          {/* Comet border button */}
          <div className="comet-border rounded-lg">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 transition-all text-base px-8 relative z-10">
              <a href="#contact">
                Book Your Free Diagnostic
                <ArrowRight className="size-4 ml-2" />
              </a>
            </Button>
          </div>
          <Button asChild variant="outline" size="lg" className="text-base px-8 hover-scale border-[#FEC700] text-foreground hover:bg-[#FEC700]/10 hover:text-foreground hover:border-[#FEC700]">
            <a href="#services">See Our Services</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
