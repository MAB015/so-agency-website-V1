/**
 * The agency's only direct contact channel. Single source of truth — this URL was
 * previously copy-pasted across six call sites, so changing the number meant six edits.
 */
export const WHATSAPP_URL = 'https://wa.me/message/5MH2JY5B4ERVJ1'

/** Where a contact click came from, so Meta can tell the CTAs apart. */
export type ContactSource = 'cta-primary' | 'cta-secondary' | 'right-click-menu' | 'agent-tool'

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
 */
export function trackContactClick(source: ContactSource) {
  if (typeof window === 'undefined') return

  try {
    window.fbq?.('track', 'Contact', { content_name: source })
  } catch {
    // Ignored on purpose: a failed pixel must not stop the user reaching WhatsApp.
  }
}
