import { Zap, DollarSign, Users, Layers } from "lucide-react"

const benefits = [
  {
    icon: Users,
    title: "Startup-Focused",
    description: "We understand the unique challenges of early-stage companies. Our approach is tailored to your stage and budget.",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Startup speed without compromising quality. We move as fast as you need to hit your milestones.",
  },
  {
    icon: DollarSign,
    title: "Affordable Pricing",
    description: "Premium quality at startup-friendly rates. Flexible packages designed for growing companies.",
  },
  {
    icon: Layers,
    title: "End-to-End",
    description: "One team for branding, web, and marketing. Seamless execution across all your digital needs.",
  },
]

export function Benefits() {
  return (
    <section id="benefits" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Startups Choose Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We are not just another agency. We are your launch partners, invested in your success.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
