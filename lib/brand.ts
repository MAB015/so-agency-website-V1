/**
 * Brand tagline. It is never translated and never changes case: identical in
 * every locale and on every surface (hero, footer, titles, structured data).
 *
 * It deliberately lives outside lib/i18n. While it sat in the dictionaries there
 * was a per-locale slot for it, and it ended up translated two different ways at
 * once - "Diseña. Construye. Lanza." in the footer against "Diseña. Construye.
 * Despega." in the hero. With no slot there is nothing to translate.
 */
export const BRAND_TAGLINE = 'DESIGN. BUILD. LAUNCH.'

/** Branded page title, identical across locales for the same reason. */
export const BRAND_TITLE = `SO Agency | ${BRAND_TAGLINE}`
