"use client"

import { Button } from "@/components/ui/button"
import { StarBackground } from "@/components/star-background"
import { ArrowRight, Sparkles } from "lucide-react"
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
        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm mb-8 opacity-0">
          <Sparkles className="size-4" />
          <span>Mission Control for Startups</span>
        </div>

        {/* Main headline */}
        <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance mb-6 opacity-0">
          <span className="text-primary">Design.</span>{" "}
          <span className="text-foreground">Build.</span>{" "}
          <span className="text-accent">Launch.</span>
        </h1>

        {/* Subheadline */}
        <p className="hero-subtitle text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty opacity-0">
          Strategic branding, powerful web development, and growth-focused marketing. 
          Everything your startup needs to stand out and scale.
        </p>

        {/* CTAs */}
        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 glow-hover transition-all text-base px-8">
            <a href="#contact">
              Get Started
              <ArrowRight className="size-4 ml-2" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-base px-8">
            <a href="#services">See Our Services</a>
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="hero-trust mt-16 pt-8 border-t border-border/50 opacity-0">
          <p className="text-sm text-muted-foreground mb-4">Trusted by ambitious startups</p>
          <div className="flex items-center justify-center gap-8 opacity-50">
            <span className="text-lg font-semibold text-muted-foreground">startup.</span>
            <span className="text-lg font-semibold text-muted-foreground">techco</span>
            <span className="text-lg font-semibold text-muted-foreground">venture+</span>
          </div>
        </div>
      </div>
    </section>
  )
}
