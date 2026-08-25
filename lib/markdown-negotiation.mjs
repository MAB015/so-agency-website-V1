/**
 * Content negotiation for AI agents, for Cloudflare Pages Functions.
 *
 * Cloudflare's native "Markdown for Agents" converts HTML at the edge, but it requires a
 * Pro plan or higher. This does the same job on the Free plan by serving the hand-written
 * markdown twins in public/en/ and public/es/ — which are cleaner than a conversion,
 * since they carry no navigation chrome or layout artifacts.
 *
 * HTML stays the default. Markdown is returned only when a client asks for it explicitly.
 */

const MARKDOWN_TYPE = "text/markdown"

/** Rough estimate at ~4 characters per token. Advertised as an estimate, not a count. */
function estimateTokens(text) {
  return Math.ceil(text.length / 4)
}

/**
 * True only when text/markdown is named explicitly. A browser sending a wildcard Accept,
 * or `text/html,...`, must still get HTML — wildcards deliberately do not match.
 */
function wantsMarkdown(request) {
  const accept = request.headers.get("accept")
  if (!accept) return false

  return accept
    .split(",")
    .some((entry) => entry.trim().toLowerCase().split(";")[0] === MARKDOWN_TYPE)
}

/** Same discovery relations as public/_headers, which does not apply to Function responses. */
const DISCOVERY_LINKS = [
  '</.well-known/ai-catalog.json>; rel="service-desc"; type="application/json"',
  '</llms.txt>; rel="service-doc"; type="text/plain"',
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
].join(", ")

/**
 * @param {EventContext} context  The Pages Function context.
 * @param {string} markdownPath   Absolute path of the markdown twin, e.g. "/en/index.md".
 */
export async function negotiateMarkdown(context, markdownPath) {
  const { request, env, next } = context

  // Serve the page as normal, but tell caches the response depends on Accept.
  const serveHtml = async () => {
    const response = await next()
    const headers = new Headers(response.headers)
    headers.append("Vary", "Accept")
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    })
  }

  if (!wantsMarkdown(request)) return serveHtml()

  try {
    const url = new URL(request.url)
    url.pathname = markdownPath
    url.search = ""

    // Always GET the asset so the body can be measured, even for a HEAD request.
    const asset = await env.ASSETS.fetch(new Request(url, { method: "GET" }))
    if (!asset.ok) return serveHtml()

    const body = await asset.text()

    return new Response(request.method === "HEAD" ? null : body, {
      status: 200,
      headers: new Headers({
        "Content-Type": "text/markdown; charset=utf-8",
        Vary: "Accept",
        "x-markdown-tokens": String(estimateTokens(body)),
        "Cache-Control": "public, max-age=0, must-revalidate",
        "Access-Control-Allow-Origin": "*",
        Link: DISCOVERY_LINKS,
      }),
    })
  } catch {
    // Negotiation must never be able to take the page down.
    return serveHtml()
  }
}
