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
| Response headers | Yes — via `public/_headers` (Cloudflare Pages) |
| `Accept:`-based content negotiation | Yes — via Pages Functions, see `functions/` |

Cloudflare Pages skips dot-directories on upload **except `.well-known`**, which is why
the discovery files live in `public/.well-known/`.

## Status

| # | Audit item | Status | Where |
|---|---|---|---|
| 1 | Link headers (RFC 8288) | **Done** | `public/_headers` |
| 2 | ARD capability manifest | **Done** | `public/.well-known/ai-catalog.json` |
| 3 | Agent Skills index | **Done** | `public/.well-known/agent-skills/` |
| 4 | WebMCP browser tools | **Done** | `components/webmcp-tools.tsx` |
| 5 | Markdown for Agents | **Done** | `functions/en/_middleware.js`, `functions/es/_middleware.js`, `lib/markdown-negotiation.mjs` |
| 6 | DNS-AID records | **Manual** | Cloudflare DNS — see below |
| 7 | API Catalog (RFC 9727) | **N/A** | No API exists to catalog |
| 8 | OAuth/OIDC discovery | **N/A** | No authorization server |
| 9 | OAuth Protected Resource Metadata (RFC 9728) | **N/A** | No protected resources |
| 10 | `auth.md` | **Published, still red** | `public/auth.md` — truthful, but cannot pass; see below |
| 11 | MCP Server Card (SEP-1649) | **N/A** | No MCP server is operated |

Also fixed: `public/robots.txt` contained `Disallow: /.well-known/`, which blocked every
file in this list from compliant crawlers.

## What was published

- **`public/_headers`** — RFC 8288 `Link` headers on every page. Relations used are all
  IANA-registered (`service-desc`, `service-doc`, `describedby`, `alternate`) and every
  target resolves. `rel="api-catalog"` is intentionally not emitted.

  **Cloudflare Pages merges every matching rule.** The `/*` values are already present on
  `/en/` and `/es/`, so the locale rules add only their own `alternate` links — repeating
  the shared ones there emits each relation twice. Within a single rule, keep all values on
  one comma-separated `Link:` line.
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

## Why `auth.md` stays red on purpose

`public/auth.md` exists and is truthful, but it **will not pass the audit, and that is
intended**. Do not "fix" it.

The `auth.md` specification describes how agents register and obtain credentials to act on
a user's behalf. Its check requires, when no OAuth metadata is present, that the file
"document registration or provisioning endpoint(s), list supported method(s), and explain
credential use" — and it states outright that a completely unauthenticated service will
fail, because it cannot satisfy those minimums. The spec has **no vocabulary for declaring
that a service has no authentication**.

This site has no API, no authorization server, no protected resource, and no accounts.
Passing would mean inventing a `register_uri` and credential types for machinery that does
not exist, and any agent following them would get a 404.

So `auth.md` states the truth instead: nothing here is gated, here is the public surface.
That is worth publishing on its own — it stops an agent probing for credentials — even
though the score does not move. The same reasoning is why
`/.well-known/oauth-protected-resource` and `/.well-known/oauth-authorization-server` are
absent.

If SO Agency ever ships an authenticated API, replace `auth.md` with a conforming profile
and publish the two OAuth documents for real.

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

## Markdown negotiation (Pages Functions)

Cloudflare's native **Markdown for Agents** (dashboard → zone → AI Crawl Control) converts
HTML at the edge, but it needs a **Pro plan or higher**. `soagency.dev` is on Free, so this
repo implements the same behaviour with **Pages Functions**, which *are* included on Free.

The result is arguably better than the native feature: it serves the hand-written twins in
`public/en|es/index.md` rather than a machine conversion, so there is no navigation chrome
or layout noise in the output.

| File | Role |
|---|---|
| `lib/markdown-negotiation.mjs` | The negotiation logic, shared by both locales |
| `functions/en/_middleware.js` | Applies it to `/en/` |
| `functions/es/_middleware.js` | Applies it to `/es/` |

Behaviour:

- `Accept: text/markdown` → `200` with `Content-Type: text/markdown; charset=utf-8`,
  `x-markdown-tokens` (a ~4-chars-per-token estimate), `Vary: Accept`, CORS, and the same
  discovery `Link` relations `_headers` puts on the HTML.
- Anything else, **including `Accept: */*`** → the HTML, untouched apart from an appended
  `Vary: Accept`. Wildcards deliberately do not match, so browsers and generic crawlers are
  unaffected.
- On any error, it falls through to the HTML. Negotiation must never take the page down.

**Why the middleware is scoped to `/en/*` and `/es/*` and not `functions/_middleware.js`:**
a root middleware intercepts *every* request, including all static assets. On the Free plan
that burns the 100k/day Functions quota (static assets alone are free and unlimited — only
Function invocations count) and puts the entire site behind a Function that could fail.
Scoped, only the two real pages invoke it. **Do not move these to the root.**

### Testing it locally

`_headers` and Functions are both ignored by a plain static server. Use Wrangler:

```bash
pnpm run build
npx wrangler pages dev out --port 8788 --compatibility-date=2025-01-01
```

```bash
curl -sI -H 'Accept: text/markdown' http://127.0.0.1:8788/en/   # -> text/markdown
curl -sI -H 'Accept: */*'           http://127.0.0.1:8788/en/   # -> text/html
```

## Remaining manual step (Cloudflare dashboard)

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

**Verified behaviour** (checked against the live deploy, 2026-08-25):

- `public/_redirects` 301s `/` to `/en/`, and Cloudflare Pages **does** attach `_headers`
  to that 301 response. An audit that does not follow redirects still sees the `Link`
  header on the homepage. No workaround needed.
- `.md` files are served as `text/markdown; charset=utf-8` and `.json` as
  `application/json`, both derived from the file extension.
- `Access-Control-Allow-Origin: *` is present on `/.well-known/*`.

Watch for **duplicated relations** — the symptom that a locale rule is repeating what `/*`
already provides:

```bash
curl -sI https://soagency.dev/es/ | grep -i '^link:' | tr ',' '\n' | nl
```

Each relation should appear exactly once.

Markdown negotiation, which must flip on the `Accept` header and nothing else:

```bash
curl -sI -H 'Accept: text/markdown' https://soagency.dev/en/ | grep -iE 'content-type|x-markdown-tokens'
curl -sI -H 'Accept: */*'           https://soagency.dev/en/ | grep -i  'content-type'
```
