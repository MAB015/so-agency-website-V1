"use client"

import { Zap, DollarSign, Users, Layers } from "lucide-react"
import { useStaggerChildren } from "@/hooks/use-gsap-animations"

const benefits = [
  {
    icon: Users,
    title: "Partner-Driven",
    description: "We work alongside you, not just for you. Your success is our mission — we are invested in your growth.",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Quality at speed. We move efficiently to hit your milestones without compromising on results.",
  },
  {
    icon: DollarSign,
    title: "Flexible Pricing",
    description: "Premium quality at accessible rates. Packages designed to fit businesses of all sizes.",
  },
  {
    icon: Layers,
    title: "End-to-End",
    description: "One team for branding, web, and marketing. Seamless execution across all your digital needs.",
  },
]

export function Benefits() {
  const gridRef = useStaggerChildren<HTMLDivElement>(0.1)

  return (
    <section id="benefits" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Clients Choose Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We are not just another agency. We are your launch partners, invested in your success.
          </p>
        </div>

        {/* Benefits grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <div 
              key={benefit.title} 
              className="text-center p-6 rounded-xl bg-card/30 border border-border/30 hover:border-primary/30 transition-colors"
            >
              <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="size-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
