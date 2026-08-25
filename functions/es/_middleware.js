import { negotiateMarkdown } from "../../lib/markdown-negotiation.mjs"

/** Scoped to /es/* — see functions/en/_middleware.js for why this is not at the root. */
export async function onRequest(context) {
  const { pathname } = new URL(context.request.url)

  if (pathname !== "/es" && pathname !== "/es/") return context.next()

  return negotiateMarkdown(context, "/es/index.md")
}
