import { Code, Palette, ShoppingCart, Fingerprint, Megaphone, Bot } from 'lucide-react'

/**
 * Service icons, in the same order as `dict.services.items`: the array index is
 * the service index. This lives here rather than inside components/services.tsx
 * because the footer lists the same services and both must read from one place.
 */
export const serviceIcons = [Code, Palette, ShoppingCart, Fingerprint, Megaphone, Bot]

/** Index of the service that is not available yet (AI Automation). */
export const DISABLED_SERVICE_INDEX = 5
