"use client"

import { useEffect } from "react"
import type { Dictionary } from "@/lib/i18n/types"
import { WHATSAPP_URL, trackContactClick } from "@/lib/contact"

// Section ids rendered on the page, matching dict.navbar.links hrefs.
const SECTIONS = ["services", "process", "team", "faq", "contact"] as const
type Section = (typeof SECTIONS)[number]

type ToolResult = { content: { type: "text"; text: string }[] }

type ToolDescriptor = {
  name: string
  description: string
  inputSchema: Record<string, unknown>
  execute: (args: Record<string, unknown>) => Promise<ToolResult>
}

declare global {
  interface Navigator {
    modelContext?: {
      provideContext: (context: { tools: ToolDescriptor[] }) => void
    }
  }
}

const text = (value: string): ToolResult => ({ content: [{ type: "text", text: value }] })

const NO_ARGS = { type: "object", properties: {}, additionalProperties: false }

/** Rank FAQ entries by how many of the query's words appear in the question. */
function findFaq(items: Dictionary["faq"]["items"], query: string) {
  const words = query
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter((w) => w.length > 3)

  if (words.length === 0) return null

  const [best] = items
    .map((item) => {
      const haystack = `${item.question} ${item.answer}`.toLowerCase()
      return { item, score: words.filter((w) => haystack.includes(w)).length }
    })
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score)

  return best?.item ?? null
}

/**
 * Exposes the page's real capabilities to AI agents via the WebMCP browser API.
 * Feature-detected: a no-op in browsers without navigator.modelContext.
 * @see https://webmachinelearning.github.io/webmcp/
 */
export function WebMCPTools({ dict }: { dict: Dictionary }) {
  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.modelContext) return

    const isSpanish = dict.locale === "es"

    const tools: ToolDescriptor[] = [
      {
        name: "list_services",
        description:
          "List the digital services SO Agency offers, with a description of each. Covers web design and development, UX/UI, e-commerce, branding, social media, and AI automation.",
        inputSchema: NO_ARGS,
        execute: async () =>
          text(
            dict.services.items
              .map((s) => `- ${s.title}${s.badge ? ` (${s.badge})` : ""}: ${s.description}`)
              .join("\n"),
          ),
      },
      {
        name: "get_pricing_guidance",
        description:
          "Get SO Agency's starting price bands and typical delivery timelines. These are scoping references, not quotes — a precise quote requires a free diagnostic call.",
        inputSchema: NO_ARGS,
        execute: async () => {
          // Sourced from the pricing and timeline FAQ entries so the copy stays in one place.
          const pricing = dict.faq.items[1]
          const timeline = dict.faq.items[0]
          return text(
            [
              `${pricing.question}\n${pricing.answer}`,
              "",
              `${timeline.question}\n${timeline.answer}`,
              "",
              isSpanish
                ? "Nota: estas cifras son puntos de partida, no cotizaciones finales."
                : "Note: these figures are starting points, not final quotes.",
            ].join("\n"),
          )
        },
      },
      {
        name: "answer_faq",
        description:
          "Answer a question about SO Agency using its published FAQ — pricing, timelines, services, SEO, post-launch support, branding prerequisites, and which regions it serves.",
        inputSchema: {
          type: "object",
          properties: {
            question: {
              type: "string",
              description: "The user's question about SO Agency.",
            },
          },
          required: ["question"],
          additionalProperties: false,
        },
        execute: async ({ question }) => {
          const match = findFaq(dict.faq.items, String(question ?? ""))
          if (match) return text(`${match.question}\n\n${match.answer}`)

          return text(
            [
              isSpanish
                ? "No hay una entrada de FAQ que coincida. Preguntas disponibles:"
                : "No matching FAQ entry. Available questions:",
              ...dict.faq.items.map((item) => `- ${item.question}`),
            ].join("\n"),
          )
        },
      },
      {
        name: "navigate_to_section",
        description:
          "Scroll the current page to one of its sections so the user can see it: services, process, team, faq, or contact.",
        inputSchema: {
          type: "object",
          properties: {
            section: {
              type: "string",
              enum: [...SECTIONS],
              description: "The section to scroll to.",
            },
          },
          required: ["section"],
          additionalProperties: false,
        },
        execute: async ({ section }) => {
          const target = String(section ?? "") as Section
          if (!SECTIONS.includes(target)) {
            return text(`Unknown section "${target}". Valid sections: ${SECTIONS.join(", ")}.`)
          }
          // Matches the navbar's plain-anchor behaviour.
          window.location.hash = target
          return text(`Scrolled to the "${target}" section.`)
        },
      },
      {
        name: "open_contact",
        description:
          "Open SO Agency's WhatsApp conversation to book a free diagnostic call or request a quote. This is the agency's only direct contact channel — there is no contact form or booking widget.",
        inputSchema: NO_ARGS,
        execute: async () => {
          // An agent-driven contact is still a contact — report it like any other CTA.
          trackContactClick("agent-tool")
          window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer")
          return text(
            `${
              isSpanish
                ? "Se abrió WhatsApp para contactar a SO Agency. Normalmente responden en menos de 24 horas."
                : "Opened WhatsApp to contact SO Agency. They typically respond within 24 hours."
            }\n${WHATSAPP_URL}`,
          )
        },
      },
    ]

    navigator.modelContext.provideContext({ tools })
  }, [dict])

  return null
}
