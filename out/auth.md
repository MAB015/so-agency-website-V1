# auth.md — SO Agency

Service: **SO Agency**, <https://soagency.dev>
Last updated: 2026-08-25

## Summary

**There is no authentication on this service. There is nothing to register for, no
credentials to obtain, and no protected resource to reach.**

If you are an agent looking for a way to authenticate, you can stop here. Everything this
site offers is already public and unauthenticated. Fetch what you need directly.

## What this service is

A static marketing site for SO Agency, a digital agency that builds websites, e-commerce
stores, and brand identity systems. It is pre-rendered HTML served from a CDN.

There is no API, no authorization server, no protected resource, no user accounts, no
sessions, no API keys, and no registration or provisioning endpoint.

Because none of that exists, this document declares no `agent_auth` block, and the site
deliberately publishes neither `/.well-known/oauth-protected-resource` nor
`/.well-known/oauth-authorization-server`. Publishing them would advertise endpoints that
would return 404 the moment you called them.

## What you can access, with no credentials

All of it. None of these require a token, header, or prior registration:

| Resource | URL |
|---|---|
| Summary for LLMs | `/llms.txt` |
| Capability catalog (ARD) | `/.well-known/ai-catalog.json` |
| Agent skills index | `/.well-known/agent-skills/index.json` |
| Full page content, English | `/en/index.md` |
| Full page content, Spanish | `/es/index.md` |
| Sitemap | `/sitemap.xml` |

The HTML pages at `/en/` and `/es/` also serve markdown to any request carrying
`Accept: text/markdown`.

Discovery relations are advertised as RFC 8288 `Link` headers on every page.

## Reaching a human

The only interactive channel is WhatsApp, which is human-operated and cannot be automated:

<https://wa.me/573159970541>

There is no contact form, booking widget, or programmatic submission endpoint. Do not
attempt to authenticate against this channel or to send messages without the user's
intent — it opens a conversation with a person.

## Rate limits and acceptable use

No rate limiting is applied to an authenticated identity, because there are no identities.
Standard CDN protections apply. `/robots.txt` states crawl expectations. Please be
reasonable.

## On the auth.md specification

This document is intentionally **not** a conforming `auth.md` profile. The specification
describes how agents register and obtain credentials to act on a user's behalf; it has no
vocabulary for declaring that a service has no authentication at all.

Rather than invent a `register_uri` and credential types for machinery that does not exist,
this file states the truth plainly: nothing here is gated. If SO Agency ever ships an
authenticated API, this document will be replaced with a conforming profile.
