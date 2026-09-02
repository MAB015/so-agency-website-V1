/**
 * Decorative astronaut, drawn to stand on the footer's divider line.
 *
 * Hand-authored filled paths rather than a stroke icon, to match the other two
 * SVGs in the codebase (custom-cursor.tsx and rocket-crash.tsx). The visor
 * reuses the rocket window's treatment - dark shape plus an off-centre blue
 * glint - so the two figures read as the same illustration set.
 *
 * lucide has no astronaut of any kind (a search across astronaut, spacesuit,
 * helmet and space turns up only HardHat, a construction hat), which is why
 * this is drawn by hand.
 */
export function Astronaut({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Life-support backpack, behind the torso */}
      <rect x="11" y="25" width="18" height="15" rx="4" fill="#C9C9D1" />

      {/* Arms - drawn before the torso so the shoulders overlap them */}
      <rect x="6" y="26" width="5.5" height="14" rx="2.75" fill="#F2F2F5" />
      <rect x="28.5" y="26" width="5.5" height="14" rx="2.75" fill="#F2F2F5" />
      {/* Gloves */}
      <rect x="6" y="36" width="5.5" height="4.5" rx="2.25" fill="#C9C9D1" />
      <rect x="28.5" y="36" width="5.5" height="4.5" rx="2.25" fill="#C9C9D1" />

      {/* Legs */}
      <rect x="13" y="38" width="6" height="13" rx="3" fill="#F2F2F5" />
      <rect x="21" y="38" width="6" height="13" rx="3" fill="#F2F2F5" />
      {/* Boots - flat-bottomed so the figure reads as planted on the divider */}
      <path d="M12.4 48.5 h7.2 v4.5 a1 1 0 0 1 -1 1 h-5.2 a1 1 0 0 1 -1 -1 Z" fill="#C9C9D1" />
      <path d="M20.4 48.5 h7.2 v4.5 a1 1 0 0 1 -1 1 h-5.2 a1 1 0 0 1 -1 -1 Z" fill="#C9C9D1" />

      {/* Torso */}
      <rect x="12" y="24" width="16" height="17" rx="4.5" fill="#F2F2F5" />
      {/* Chest control panel, the one brand-yellow accent */}
      <rect x="16.5" y="28" width="7" height="5" rx="1.2" fill="#FEC700" />
      <rect x="17.6" y="29.2" width="1.4" height="1.4" rx="0.7" fill="#C89A00" />
      <rect x="20" y="29.2" width="3" height="1.4" rx="0.7" fill="#E6B800" />

      {/* Collar */}
      <rect x="15" y="21.5" width="10" height="3.5" rx="1.75" fill="#C9C9D1" />

      {/* Helmet */}
      <circle cx="20" cy="13" r="10.5" fill="#F2F2F5" />
      {/* Underside shading, gives the dome volume */}
      <path d="M9.9 16 a10.5 10.5 0 0 1 20.2 0 Z" fill="#C9C9D1" opacity="0.55" />
      {/* Visor - same anatomy as the rocket window in custom-cursor.tsx */}
      <ellipse cx="20" cy="12.6" rx="7.4" ry="6.4" fill="#0d0d1a" />
      <ellipse cx="20" cy="12.6" rx="6.4" ry="5.5" fill="#111827" />
      {/* Off-centre glint, matching the rocket's */}
      <ellipse cx="17.2" cy="10.2" rx="2.1" ry="1.6" fill="#3B9EFF" opacity="0.95" transform="rotate(-25 17.2 10.2)" />
      <circle cx="22.4" cy="14.6" r="0.8" fill="#3B9EFF" opacity="0.4" />
    </svg>
  )
}
