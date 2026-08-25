'use client'

import * as React from 'react'
import { WHATSAPP_URL, trackContactClick, type ContactSource } from '@/lib/contact'

type Props = Omit<React.ComponentPropsWithoutRef<'a'>, 'href' | 'target' | 'rel'> & {
  source: ContactSource
}

/**
 * The one way to link to WhatsApp from the site.
 *
 * Guarantees three things every call site previously had to remember, and mostly did not:
 * the Meta Pixel contact event fires, the chat opens in a new tab (wa.me redirects to
 * web.whatsapp.com on desktop — navigating in place loses the page), and `rel` is set so
 * the opened tab cannot reach back through `window.opener`.
 *
 * Forwards its ref and spreads props so it works as a shadcn `<Button asChild>` child.
 */
export const WhatsAppLink = React.forwardRef<HTMLAnchorElement, Props>(
  function WhatsAppLink({ source, onClick, ...rest }, ref) {
    return (
      <a
        ref={ref}
        {...rest}
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => {
          trackContactClick(source)
          onClick?.(event)
        }}
      />
    )
  },
)
