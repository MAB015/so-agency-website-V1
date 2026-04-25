"use client"

import { Code, Palette, ShoppingCart, Fingerprint, Megaphone, Bot } from "lucide-react"
import { useStaggerChildren } from "@/hooks/use-gsap-animations"

const services = [
  {
    icon: Code,
    title: "Web Design & Dev",
    description: "Custom, performance-driven sites built on modern stacks. We engineer high-performance platforms that keep users engaged.",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    borderGlow: "hover:shadow-[0_0_30px_-5px] hover:shadow-cyan-400/30",
    size: "col-span-1",
  },
  {
    icon: Palette,
    title: "UX/UI Design",
    description: "Intuitive, conversion-focused interfaces. Every pixel serves a purpose in guiding the user's journey.",
    color: "text-[#FEC700]",
    bgColor: "bg-[#FEC700]/10",
    borderGlow: "hover:shadow-[0_0_30px_-5px] hover:shadow-[#FEC700]/30",
    size: "col-span-1",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description: "End-to-end online store solutions designed for frictionless transactions and maximum conversion.",
    color: "text-foreground",
    bgColor: "bg-foreground/10",
    borderGlow: "hover:shadow-[0_0_30px_-5px] hover:shadow-white/20",
    size: "col-span-1",
  },
  {
    icon: Fingerprint,
    title: "Branding & Identity",
    description: "Full visual identity systems. We forge a unique signature that resonates across your industry, establishing undeniable authority.",
    color: "text-teal-400",
    bgColor: "bg-teal-400/10",
    borderGlow: "hover:shadow-[0_0_30px_-5px] hover:shadow-teal-400/30",
    size: "md:col-span-2",
  },
  {
    icon: Megaphone,
    title: "Social Media",
    description: "Turning engagement into leads through calculated content strategies and data-driven campaigns.",
    color: "text-[#FEC700]",
    bgColor: "bg-[#FEC700]/10",
    borderGlow: "hover:shadow-[0_0_30px_-5px] hover:shadow-[#FEC700]/30",
    size: "col-span-1",
  },
  {
    icon: Bot,
    title: "AI Automation",
    description: "Streamlining operations with intelligent tools. Next-gen tech currently in development.",
    color: "text-muted-foreground",
    bgColor: "bg-muted/50",
    borderGlow: "",
    size: "col-span-1",
    badge: "Standby",
    disabled: true,
  },
]

export function Services() {
  const gridRef = useStaggerChildren<HTMLDivElement>(0.1)

  return (
    <section id="services" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Core Systems
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Specialized services designed to ensure total business success across all digital channels.
          </p>
        </div>

        {/* Bento grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((service) => (
            <div
              key={service.title}
              className={`${service.size} relative group rounded-2xl border border-border bg-card/30 p-6 transition-all duration-500 card-shine overflow-hidden ${
                service.disabled 
                  ? "opacity-60" 
                  : `hover:border-[#FEC700]/50 card-hover-3d ${service.borderGlow}`
              }`}
            >
              {/* Badge */}
              {service.badge && (
                <span className="absolute top-6 right-6 text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">
                  {service.badge}
                </span>
              )}

              {/* Icon with animation on hover */}
              <div className={`size-12 rounded-xl ${service.bgColor} flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                <service.icon className={`size-6 ${service.color} transition-transform duration-300 group-hover:scale-110`} />
              </div>

              {/* Content */}
              <h3 className={`text-xl font-semibold mb-3 ${service.disabled ? "text-muted-foreground" : "text-foreground"}`}>
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
              
              {/* Hover accent line - gradient border bottom */}
              {!service.disabled && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3B9EFF] to-[#FEC700] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
