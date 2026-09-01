import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// The semantic sizes defined in the @theme block of app/globals.css are not part
// of the scale tailwind-merge ships with. Without registering them here it treats
// them as colour classes and will not dedupe them against text-sm/text-base, so
// cn("text-sm", "text-card-body") returns both and the winning font-size is left
// to CSS source order.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        { text: ['card-title', 'card-title-lg', 'card-body', 'card-meta'] },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
