import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Process } from "@/components/process"
import { Benefits } from "@/components/benefits"
import { Portfolio } from "@/components/portfolio"
import { Team } from "@/components/team"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <Benefits />
      <Portfolio />
      <Team />
      <CTASection />
      <Footer />
    </main>
  )
}
