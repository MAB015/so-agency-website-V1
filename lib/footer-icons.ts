import { PlaneTakeoff, UsersRound, Send, Twitter, Linkedin, Instagram } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/**
 * Icons for the footer's company column, keyed by href rather than by label:
 * labels are translated per locale, hrefs are not, so this map keeps working in
 * both dictionaries and survives the links being reordered.
 *
 * The choices lean on the site's aviation framing - the process section runs
 * Pre-Flight Check, Take-off, Orbit - so Process gets a departing plane and
 * Contact a paper plane. Contact opens WhatsApp, hence "send" over "mail".
 */
export const companyLinkIcons: Record<string, LucideIcon> = {
  '#process': PlaneTakeoff,
  '#team': UsersRound,
  '#contact': Send,
}

/**
 * Brand marks for the social links, keyed by label. Brand names are not
 * translated, so the label is stable across locales.
 *
 * Note: lucide's Twitter mark is the original bird, not the current X logo -
 * the library never shipped an X replacement. It matches the "Twitter" label
 * the dictionaries still use.
 */
export const socialIcons: Record<string, LucideIcon> = {
  Twitter,
  LinkedIn: Linkedin,
  Instagram,
}
