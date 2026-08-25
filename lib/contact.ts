/**
 * The agency's only direct contact channel. Single source of truth — this URL was
 * previously copy-pasted across six call sites, so changing the number meant six edits.
 */
export const WHATSAPP_NUMBER = '573159970541'

/**
 * Builds the chat URL, optionally with the message already written.
 *
 * The number form is required for prefilling. The short link the site used before
 * (`wa.me/message/5MH2JY5B4ERVJ1`) silently **drops** `?text=` — it redirects to
 * `api.whatsapp.com/message/<code>?autoload=1`, discarding the parameter, whereas the
 * number form redirects to `api.whatsapp.com/send/?phone=…&text=…` and keeps it.
 *
 * The trade-off is that the number is now published in the page source.
 */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`

  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

/** The channel with no message attached, for JSON-LD and other non-interactive references. */
export const WHATSAPP_URL = whatsappUrl()

/** Where a contact click came from, so Meta can tell the CTAs apart. */
export type ContactSource =
  | 'cta-primary'
  | 'cta-secondary'
  | 'right-click-menu'
  | 'agent-tool'
  | 'service-card'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

/**
 * Reports a contact click to the Meta Pixel initialised in app/layout.tsx.
 *
 * Without this the Pixel only ever sees PageView, so Meta cannot optimise ad delivery
 * toward people who actually make contact, and no lookalike audience can be built from
 * converters.
 *
 * `fbq` is absent whenever the Pixel is blocked or has not loaded yet, so every call is
 * optional-chained and wrapped — analytics must never break the click-through.
 *
 * @param detail Optional extra dimension, e.g. which service card was clicked.
 */
export function trackContactClick(source: ContactSource, detail?: string) {
  if (typeof window === 'undefined') return

  try {
    window.fbq?.('track', 'Contact', {
      content_name: source,
      ...(detail ? { content_category: detail } : {}),
    })
  } catch {
    // Ignored on purpose: a failed pixel must not stop the user reaching WhatsApp.
  }
}
