# Agent Readiness

Response to the `isitagentready.com` audit of <https://soagency.dev>.

**Read this before "fixing" a red item.** Five of the eleven audited mechanisms describe
backend infrastructure this site does not have. This is a Next.js static export
(`output: 'export'`) on Cloudflare Pages: no server, no API routes, no middleware, no
authentication, no MCP server. Publishing `.well-known` files for those would turn the
audit green while pointing agents at URLs that 404. They are deliberately absent, and each
one below says why.

## Platform constraints

| Mechanism | Available here |
|---|---|
| `middleware.ts` | No — disallowed under `output: 'export'` |
| `next.config` `headers()` | No — a no-op under `output: 'export'` |
| Route handlers / API routes | No — there is no server |
| Response headers | Yes — **only** via `public/_headers` (Cloudflare Pages) |
| `Accept:`-based content negotiation | Not from this repo — needs the Cloudflare zone feature |

Cloudflare Pages skips dot-directories on upload **except `.well-known`**, which is why
the discovery files live in `public/.well-known/`.

## Status

| # | Audit item | Status | Where |
|---|---|---|---|
| 1 | Link headers (RFC 8288) | **Done** | `public/_headers` |
| 2 | ARD capability manifest | **Done** | `public/.well-known/ai-catalog.json` |
| 3 | Agent Skills index | **Done** | `public/.well-known/agent-skills/` |
| 4 | WebMCP browser tools | **Done** | `components/webmcp-tools.tsx` |
| 5 | Markdown for Agents | **Partial** | `public/en/index.md`, `public/es/index.md` + a Cloudflare dashboard toggle |
| 6 | DNS-AID records | **Manual** | Cloudflare DNS — see below |
| 7 | API Catalog (RFC 9727) | **N/A** | No API exists to catalog |
| 8 | OAuth/OIDC discovery | **N/A** | No authorization server |
| 9 | OAuth Protected Resource Metadata (RFC 9728) | **N/A** | No protected resources |
| 10 | `auth.md` | **N/A** | Nothing for an agent to register against |
| 11 | MCP Server Card (SEP-1649) | **N/A** | No MCP server is operated |

Also fixed: `public/robots.txt` contained `Disallow: /.well-known/`, which blocked every
file in this list from compliant crawlers.

## What was published

- **`public/_headers`** — RFC 8288 `Link` headers on every page. Relations used are all
  IANA-registered (`service-desc`, `service-doc`, `describedby`, `alternate`) and every
  target resolves. `rel="api-catalog"` is intentionally not emitted. Cloudflare Pages does
  not reliably append repeated header names, so each rule uses a single comma-separated
  `Link:` line.
- **`public/llms.txt`** — condensed overview: services, pricing bands, timelines, process,
  selected work, contact.
- **`public/en/index.md`, `public/es/index.md`** — full page content as markdown, the
  targets of `rel="alternate"; type="text/markdown"`.
- **`public/.well-known/ai-catalog.json`** — ARD manifest with `representativeQueries` per
  entry so registries can build embeddings.
- **`public/.well-known/agent-skills/`** — `index.json` plus `engage-so-agency/SKILL.md`,
  a real skill covering how to scope a project and request a quote.
- **`components/webmcp-tools.tsx`** — five tools (`list_services`,
  `get_pricing_guidance`, `answer_faq`, `navigate_to_section`, `open_contact`) exposed via
  `navigator.modelContext`. Feature-detected; an inert no-op elsewhere. Content is read
  from `lib/i18n/` rather than duplicated.

## Maintenance

**The SKILL.md digest is load-bearing.** `agent-skills/index.json` carries a `sha256` of
`engage-so-agency/SKILL.md`. Any edit to that file invalidates it. Recompute and update:

```powershell
(Get-FileHash -Algorithm SHA256 public\.well-known\agent-skills\engage-so-agency\SKILL.md).Hash.ToLower()
```

`.gitattributes` pins `.md`, `.txt`, and `.json` to LF so the bytes are identical on a
Windows checkout and the Linux Cloudflare build — otherwise `core.autocrlf` changes the
file and the digest stops verifying.

Pricing, timelines, services, and FAQ copy are stated in **four** places: `lib/i18n/en.ts`
and `lib/i18n/es.ts` (the source of truth, read by the site and by WebMCP),
`components/schema-markup.tsx` (JSON-LD, a pre-existing duplicate), `public/llms.txt` and
the two markdown twins, and `SKILL.md`. Changing a price means updating all of them.

## Remaining manual steps (Cloudflare dashboard)

Neither can be done from this repo.

**Markdown for Agents** — gives true `Accept: text/markdown` negotiation, which a static
export cannot do on its own. Requires `soagency.dev` proxied (orange cloud) through
Cloudflare. Dashboard → the `soagency.dev` zone → Settings / Fundamentals → enable
**Markdown for Agents**. Verify:

```bash
curl -sI -H "Accept: text/markdown" https://soagency.dev/en/ | grep -i 'content-type\|x-markdown-tokens'
```

The static `.md` twins remain the fallback and stay useful either way.

**DNS-AID** — lowest value here: it is an early IETF draft
(`draft-mozleywilliams-dnsop-dnsaid`) and this site has no A2A or MCP endpoint to
advertise. Do it last, after the catalog is confirmed live. Dashboard → `soagency.dev` →
DNS → add a ServiceMode SVCB record at `_index._agents.soagency.dev` with `alpn=h2` and an
`endpoint` parameter pointing at `https://soagency.dev/.well-known/ai-catalog.json`, then
enable **DNSSEC** under DNS → Settings.

## Verifying a deploy

`_headers` only takes effect on Cloudflare Pages — it is not honoured by a local static
server.

```bash
curl -sI https://soagency.dev/en/ | grep -i '^link:'
curl -s  https://soagency.dev/.well-known/ai-catalog.json | jq .
curl -sI https://soagency.dev/.well-known/ai-catalog.json | grep -i 'access-control-allow-origin\|content-type'
curl -s  https://soagency.dev/llms.txt
curl -s  https://soagency.dev/.well-known/agent-skills/engage-so-agency/SKILL.md | sha256sum
```

**Known caveat:** `public/_redirects` 301s `/` to `/en/`, and Cloudflare Pages may not
attach `_headers` to a redirect response. Check both the redirect and the destination:

```bash
curl -sI  https://soagency.dev/ | grep -i '^link:\|^location:'
curl -sIL https://soagency.dev/ | grep -i '^link:'
```

If an audit that does not follow redirects still reports no `Link` headers, the fix is to
serve real content at `/` instead of redirecting — not to paper over it.
