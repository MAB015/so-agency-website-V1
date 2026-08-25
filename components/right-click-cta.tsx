"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { ArrowRight, Rocket, X } from "lucide-react"
import { WhatsAppLink } from "@/components/whatsapp-link"

type Position = { x: number; y: number }

const CLOSE_TIMEOUT_MS = 8000

export function RightClickCTA() {
  const [position, setPosition] = useState<Position | null>(null)
  const [visible, setVisible] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isTouch = useRef(false)

  const close = useCallback(() => {
    setVisible(false)
    setTimeout(() => setPosition(null), 200) // wait for fade-out
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  const scheduleClose = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(close, CLOSE_TIMEOUT_MS)
  }, [close])

  useEffect(() => {
    // Mark as touch device on first touch — disable the menu entirely
    const markTouch = () => { isTouch.current = true }
    window.addEventListener("touchstart", markTouch, { once: true, passive: true })

    const handleContextMenu = (e: MouseEvent) => {
      if (isTouch.current) return

      e.preventDefault()

      // Clamp position so the menu never clips off-screen
      const menuW = 280
      const menuH = 160
      const x = Math.min(e.clientX, window.innerWidth - menuW - 12)
      const y = Math.min(e.clientY, window.innerHeight - menuH - 12)

      setPosition({ x, y })
      setVisible(false)
      // Trigger enter animation on next tick
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true))
      })
      scheduleClose()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }

    const handlePointerDown = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        close()
      }
    }

    document.addEventListener("contextmenu", handleContextMenu)
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("pointerdown", handlePointerDown)

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("pointerdown", handlePointerDown)
      window.removeEventListener("touchstart", markTouch)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [close, scheduleClose])

  if (!position) return null

  return (
    <div
      ref={menuRef}
      role="dialog"
      aria-label="Quick contact menu"
      aria-modal="true"
      style={{ left: position.x, top: position.y }}
      className={[
        "fixed z-[9999] w-[280px] rounded-xl",
        "bg-card border border-border",
        "shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
        "p-4 select-none",
        "transition-all duration-200 origin-top-left",
        visible
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-95 -translate-y-1 pointer-events-none",
      ].join(" ")}
    >
      {/* Close button */}
      <button
        onClick={close}
        aria-label="Close menu"
        className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors rounded focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <X className="size-3.5" />
      </button>

      {/* Icon + heading */}
      <div className="flex items-center gap-2.5 mb-3 pr-5">
        <div className="size-8 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0">
          <Rocket className="size-4 text-accent" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground leading-tight">SO Agency</p>
          <p className="text-sm font-semibold text-foreground leading-tight">
            {"Let's build something great"}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border mb-3" />

      {/* CTA button */}
      <WhatsAppLink
        source="right-click-menu"
        onClick={close}
        className={[
          "comet-border rounded-lg block w-full",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        ].join(" ")}
      >
        <span
          className={[
            "flex items-center justify-center gap-2 w-full",
            "bg-accent text-accent-foreground hover:bg-accent/90",
            "rounded-lg px-4 py-2.5 text-sm font-semibold",
            "transition-colors duration-150",
          ].join(" ")}
        >
          Contact Us
          <ArrowRight className="size-3.5" />
        </span>
      </WhatsAppLink>

      {/* Hint */}
      <p className="text-[11px] text-muted-foreground text-center mt-2.5">
        We typically respond within 24 hours
      </p>
    </div>
  )
}
