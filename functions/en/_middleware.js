import { negotiateMarkdown } from "../../lib/markdown-negotiation.mjs"

/**
 * Scoped to /en/* on purpose. A root functions/_middleware.js would intercept every
 * static asset too — burning the Free plan's Functions quota and putting the whole site
 * behind a Function that could fail. Only the page itself needs to negotiate.
 */
export async function onRequest(context) {
  const { pathname } = new URL(context.request.url)

  if (pathname !== "/en" && pathname !== "/en/") return context.next()

  return negotiateMarkdown(context, "/en/index.md")
}
