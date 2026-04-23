"use client"

import { Zap, DollarSign, Users, Layers } from "lucide-react"
import { useStaggerChildren } from "@/hooks/use-gsap-animations"

const benefits = [
  {
    icon: Users,
    title: "Partner-Driven",
    description: "We work alongside you, not just for you. Your success is our mission — we are invested in your growth.",
    gradient: "from-[#3B9EFF] to-cyan-400",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Quality at speed. We move efficiently to hit your milestones without compromising on results.",
    gradient: "from-[#FEC700] to-amber-400",
  },
  {
    icon: DollarSign,
    title: "Flexible Pricing",
    description: "Premium quality at accessible rates. Packages designed to fit businesses of all sizes.",
    gradient: "from-emerald-400 to-teal-400",
  },
  {
    icon: Layers,
    title: "End-to-End",
    description: "One team for branding, web, and marketing. Seamless execution across all your digital needs.",
    gradient: "from-violet-400 to-purple-400",
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
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => (
            <div 
              key={benefit.title} 
              className="group text-center p-6 rounded-xl bg-card/30 border border-border/30 transition-all duration-500 card-hover-3d card-shine hover:border-primary/30"
            >
              {/* Icon with gradient background on hover */}
              <div className={`size-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:${benefit.gradient} group-hover:shadow-lg`}>
                <benefit.icon className="size-7 text-primary transition-colors duration-300 group-hover:text-white" />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-[#FEC700] transition-colors">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
