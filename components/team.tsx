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
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-border/50 bg-card/30 mb-4 transition-all duration-500 group-hover:border-[#FEC700]/50 group-hover:shadow-[0_0_40px_-10px] group-hover:shadow-[#FEC700]/30 card-hover-3d">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                
                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3B9EFF] to-[#FEC700] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-[#FEC700] transition-colors">{member.name}</h3>
              <p className="text-sm text-[#3B9EFF]">{member.role}</p>
            </div>
          ))}

          {/* Join the team card */}
          <div className="group">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-dashed border-border/50 bg-card/20 mb-4 flex items-center justify-center transition-all duration-500 group-hover:border-primary/30 group-hover:bg-card/30 hover-scale">
              <div className="flex flex-col items-center gap-3">
                <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                  <UserPlus className="size-8 text-muted-foreground/50 group-hover:text-primary transition-colors duration-300" />
                </div>
                <span className="text-sm text-muted-foreground/70 group-hover:text-muted-foreground transition-colors">We&apos;re hiring</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-muted-foreground group-hover:text-foreground transition-colors">Join the Team</h3>
            <p className="text-sm text-muted-foreground/70">Open Positions</p>
          </div>
        </div>
      </div>
    </section>
  )
}
