import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Palette, Code, TrendingUp } from "lucide-react"

const services = [
  {
    icon: Palette,
    title: "Branding",
    description: "Strategic brand identity that captures your vision. Logo design, visual systems, and brand guidelines that make your startup memorable.",
    features: ["Logo Design", "Visual Identity", "Brand Guidelines", "Pitch Decks"],
  },
  {
    icon: Code,
    title: "Web Development",
    description: "Fast, modern websites and applications built to convert. From landing pages to full-stack platforms, we build what you need to grow.",
    features: ["Landing Pages", "Web Applications", "E-commerce", "Mobile-First"],
  },
  {
    icon: TrendingUp,
    title: "Marketing",
    description: "Data-driven marketing strategies that fuel growth. We help you reach the right audience and turn visitors into loyal customers.",
    features: ["Social Media", "Content Strategy", "SEO & SEM", "Analytics"],
  },
]

export function Services() {
  return (
    <section id="services" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Launch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            End-to-end services designed for startups. We handle the execution so you can focus on your vision.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card 
              key={service.title} 
              className="bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <CardHeader>
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="size-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="size-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
