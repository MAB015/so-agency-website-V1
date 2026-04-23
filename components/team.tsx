"use client"

import { UserPlus } from "lucide-react"
import { useStaggerChildren } from "@/hooks/use-gsap-animations"

const team = [
  {
    name: "Oscar Carabali",
    role: "Strategy & Developer",
    image: "/images/oscar.jpg",
  },
  {
    name: "Miguel Angel",
    role: "UX/UI Designer",
    image: "/images/miguel.jpg",
  },
]

export function Team() {
  const gridRef = useStaggerChildren<HTMLDivElement>(0.15)

  return (
    <section id="team" className="py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Our Leadership
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The crew behind your mission to success.
          </p>
        </div>

        {/* Team grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {/* Team members */}
          {team.map((member) => (
            <div key={member.name} className="group">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-border/50 bg-card/30 mb-4 transition-all duration-300 group-hover:border-primary/50">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
              <p className="text-sm text-cyan-400">{member.role}</p>
            </div>
          ))}

          {/* Join the team card */}
          <div className="group">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-dashed border-border/50 bg-card/20 mb-4 flex items-center justify-center transition-all duration-300 group-hover:border-primary/30 group-hover:bg-card/30">
              <UserPlus className="size-12 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-muted-foreground">Join the Team</h3>
            <p className="text-sm text-muted-foreground/70">Open Positions</p>
          </div>
        </div>
      </div>
    </section>
  )
}
