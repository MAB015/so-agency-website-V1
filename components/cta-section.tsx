"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Rocket } from "lucide-react"
import { useScrollFadeIn } from "@/hooks/use-gsap-animations"
import { ScrollReveal } from "@/components/scroll-reveal"
import { WhatsAppLink } from "@/components/whatsapp-link"
import type { Dictionary } from "@/lib/i18n/types"

export function CTASection({ dict }: { dict: Dictionary }) {
  const sectionRef = useScrollFadeIn<HTMLDivElement>()

  return (
    <section id="contact" className="py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div
          ref={sectionRef}
          className="relative rounded-2xl bg-primary/[0.02] backdrop-blur-[2px] border border-white/[0.08] p-8 sm:p-12 text-center overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 size-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 size-48 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <ScrollReveal direction="scale">
              <div className="size-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-6">
                <Rocket className="size-8 text-primary" />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="blur" delay={100}>
              <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
                {dict.cta.headline}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                {dict.cta.description}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="comet-border rounded-lg">
                  <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 transition-all text-base px-8">
                    <WhatsAppLink source="cta-primary">
                      {dict.cta.ctaPrimary}
                      <ArrowRight className="size-4 ml-2" />
                    </WhatsAppLink>
                  </Button>
                </div>
                <Button asChild variant="outline" size="lg" className="text-base px-8 border-foreground/30 hover:border-accent hover:shadow-lg hover:shadow-accent/40">
                  <WhatsAppLink source="cta-secondary">
                    {dict.cta.ctaSecondary}
                  </WhatsAppLink>
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <p className="text-sm text-muted-foreground mt-6">
                {dict.cta.responseTime}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
