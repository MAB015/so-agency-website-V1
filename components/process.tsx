"use client"

import { Search, Target, Rocket, TrendingUp } from "lucide-react"
import { useTimelineProgress } from "@/hooks/use-gsap-animations"

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discovery",
    subtitle: "Pre-Flight Check",
    description: "We dive deep into your business, understanding your goals, audience, and competitive landscape.",
  },
  {
    icon: Target,
    number: "02",
    title: "Strategy",
    subtitle: "Mission Planning",
    description: "Together, we craft a clear roadmap with defined milestones and measurable outcomes.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Launch",
    subtitle: "Liftoff",
    description: "We execute with precision, delivering high-quality work on your timelines.",
  },
  {
    icon: TrendingUp,
    number: "04",
    title: "Growth",
    subtitle: "Orbit",
    description: "Ongoing support and optimization to keep your business scaling and thriving.",
  },
]

export function Process() {
  const stepsRef = useTimelineProgress<HTMLDivElement>()

  return (
    <section id="process" className="py-24 px-4 sm:px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How We Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A proven process that takes you from idea to impact. Clear, collaborative, and built for speed.
          </p>
        </div>

        {/* Process steps */}
        <div ref={stepsRef} className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="timeline-item relative group">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="timeline-line hidden md:block absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-primary/50 to-primary/10 origin-left" />
              )}
              
              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Icon container with hover effect */}
                <div className="size-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_-5px] group-hover:shadow-primary/40">
                  <step.icon className="size-7 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                
                {/* Number badge */}
                <span className="text-xs font-mono text-primary mb-2">{step.number}</span>
                
                {/* Title */}
                <h3 className="text-lg font-semibold text-foreground mb-1 transition-colors group-hover:text-primary">{step.title}</h3>
                
                {/* Subtitle */}
                <span className="text-xs text-primary/80 uppercase tracking-wider mb-3">{step.subtitle}</span>
                
                {/* Description */}
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
