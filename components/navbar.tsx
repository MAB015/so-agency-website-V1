"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import type { Dictionary } from "@/lib/i18n/types"
import { LanguageSwitcher } from "@/components/language-switcher"

export function Navbar({ dict }: { dict: Dictionary }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20
      setIsScrolled(scrolled)
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      // maxScroll is 0 on pages that never overflow the viewport; without the
      // guard this is NaN, and the bottom bar - which is always on screen - would
      // get an invalid width.
      const progress = maxScroll > 0 ? Math.min((window.scrollY / maxScroll) * 100, 100) : 0
      setScrollProgress(progress)
    }
    // Seed the initial state: on a reload part-way down the page the bars must
    // start at their real position rather than at zero.
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-xl shadow-[0_4px_30px_-10px] shadow-accent/20"
            : "bg-transparent"
        }`}
      >
        {/* Scroll progress gradient line */}
        <div
          className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#3B9EFF] via-[#FEC700] to-[#3B9EFF] transition-opacity duration-300 ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
          style={{ width: `${scrollProgress}%` }}
        />

        <div className={`max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-500 ${
          isScrolled ? "py-2" : "py-4"
        }`}>
          <div className={`flex items-center justify-between transition-all duration-500 ${
            isScrolled ? "h-12" : "h-16"
          }`}>
            {/* Logo */}
            <a href="#" className={`flex items-center gap-2 text-foreground transition-all duration-500 ${
              isScrolled ? "scale-90" : "scale-100"
            }`}>
              <Image
                src="/logo.png"
                alt="SO Agency"
                width={100}
                height={38}
                className="h-8 w-auto"
              />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {dict.navbar.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base text-muted-foreground hover:text-foreground transition-all duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#3B9EFF] to-[#FEC700] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>

            {/* Language switcher + CTA */}
            <div className="hidden md:flex items-center gap-3">
              <LanguageSwitcher />
            <div className={`comet-border rounded-md transition-all duration-500 ${
              isScrolled ? "scale-95" : "scale-100"
            }`}>
              {/* text-base rather than a custom token: Button composes through
                  cn()/tailwind-merge, which resolves the @theme --text-* keys correctly
                  only because lib/utils.ts registers them. Standard scale keeps it obvious. */}
              <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 text-base font-medium">
                <a href="#contact">{dict.navbar.cta}</a>
              </Button>
            </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-foreground p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border/50 bg-background/95 backdrop-blur-xl">
              <nav className="flex flex-col gap-4">
                {dict.navbar.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-lg text-muted-foreground hover:text-foreground hover:pl-2 py-1 transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 w-full mt-2 text-base">
                  <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                    {dict.navbar.cta}
                  </a>
                </Button>
                <div className="mt-4 flex justify-center">
                  <LanguageSwitcher />
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Same progress bar as the navbar's, pinned to the bottom of the viewport and
          always visible. It shares scrollProgress with the one above, so the two advance
          in lockstep by construction rather than through a second scroll listener.
          It sits outside <header> deliberately: the header's backdrop-blur establishes a
          containing block, so a nested position:fixed would anchor to the header, not
          to the viewport. */}
      <div
        className="fixed bottom-0 left-0 z-50 h-[2px] bg-gradient-to-r from-[#3B9EFF] via-[#FEC700] to-[#3B9EFF] pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />
    </>
  )
}
