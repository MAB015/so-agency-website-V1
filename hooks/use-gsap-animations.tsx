"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function useScrollFadeIn<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    gsap.fromTo(
      element,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return ref
}

export function useStaggerChildren<T extends HTMLElement>(staggerDelay = 0.1) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    const children = element.children

    // Enhanced stagger with scale and rotation
    gsap.fromTo(
      children,
      { 
        opacity: 0, 
        y: 60,
        scale: 0.95,
        rotateX: 10,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: staggerDelay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [staggerDelay])

  return ref
}

export function useHeroAnimation<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    const tl = gsap.timeline()

    tl.fromTo(
      element.querySelector(".hero-badge"),
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
    )
      .fromTo(
        element.querySelector(".hero-title"),
        { opacity: 0, y: 50, rotateX: 15 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        element.querySelector(".hero-subtitle"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        element.querySelector(".hero-description"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        element.querySelector(".hero-cta"),
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.4)" },
        "-=0.3"
      )
      .fromTo(
        element.querySelector(".hero-trust"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.2"
      )

    return () => {
      tl.kill()
    }
  }, [])

  return ref
}

// New: Parallax effect for sections
export function useParallax<T extends HTMLElement>(speed = 0.5) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    gsap.to(element, {
      yPercent: -20 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [speed])

  return ref
}

// New: Timeline progress animation
export function useTimelineProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    const items = element.querySelectorAll(".timeline-item")
    const lines = element.querySelectorAll(".timeline-line")

    // Animate items with stagger
    gsap.fromTo(
      items,
      { 
        opacity: 0, 
        x: -30,
        scale: 0.9,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    )

    // Animate connecting lines
    gsap.fromTo(
      lines,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: element,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return ref
}

// New: Scale up on scroll
export function useScaleIn<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    gsap.fromTo(
      element,
      { 
        opacity: 0, 
        scale: 0.85,
        y: 40,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return ref
}
