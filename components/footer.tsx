import Image from "next/image"
import type { Dictionary } from "@/lib/i18n/types"
import { LanguageSwitcher } from "@/components/language-switcher"
import { serviceIcons, DISABLED_SERVICE_INDEX } from "@/lib/service-icons"
import { BRAND_TAGLINE } from "@/lib/brand"
import { companyLinkIcons, socialIcons } from "@/lib/footer-icons"
import { Astronaut } from "@/components/astronaut"

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-3 text-foreground mb-4">
              <Image
                src="/logo.png"
                alt="SO Agency"
                width={120}
                height={45}
                className="h-10 w-auto"
              />
            </a>
            <p className="font-[family-name:var(--font-roboto)] text-xl font-bold tracking-widest uppercase text-foreground mb-2">
              {BRAND_TAGLINE}
            </p>
            <p className="text-base text-muted-foreground max-w-sm mb-6">
              {dict.footer.description}
            </p>
            {/* Social links */}
            <div className="flex items-center gap-4">
              {dict.footer.social.map((link) => {
                const Icon = socialIcons[link.label]
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-2 text-base text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {Icon && <Icon className="size-4 shrink-0" aria-hidden="true" />}
                    {link.label}
                  </a>
                )
              })}
            </div>
          </div>

          {/* Services are derived from dict.services.items instead of being repeated in
              the footer dictionary. They used to be three hand-written labels that had
              drifted out of sync with the six real services in the section. */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {dict.footer.servicesTitle}
            </h3>
            <ul className="space-y-2">
              {dict.services.items.map((service, index) => {
                const Icon = serviceIcons[index]
                const isDisabled = index === DISABLED_SERVICE_INDEX
                return (
                  <li key={service.title}>
                    <a
                      href="#services"
                      className={`flex items-center gap-2.5 text-base transition-colors ${
                        isDisabled
                          ? "text-muted-foreground/60 hover:text-muted-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className="size-4 shrink-0" aria-hidden="true" />
                      {service.title}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Link columns */}
          {dict.footer.columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-lg font-semibold text-foreground mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => {
                  const Icon = companyLinkIcons[link.href]
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="flex items-center gap-2.5 text-base text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {Icon && <Icon className="size-4 shrink-0" aria-hidden="true" />}
                        {link.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="relative border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Decorative astronaut standing on the divider, centred on the page.
              Absolutely positioned rather than dropped in as a third flex child:
              justify-between splits the row between two items of unequal width,
              so a middle child would sit off-centre relative to the page.
              bottom-full puts its feet exactly on the border, and h-12 matches
              the container's mt-12 so it fills that empty margin without
              touching the footer's height or the columns above.
              The wrapper centres and the child animates, deliberately split:
              both use transform, and on one element the float would overwrite
              -translate-x-1/2 and knock it off centre. */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full pointer-events-none">
            <Astronaut className="astronaut-float h-12 w-auto" />
          </div>
          <p className="text-base text-muted-foreground">
            {dict.footer.copyright}
          </p>
          <div className="flex items-center gap-6">
            <LanguageSwitcher />
            <a href="#" className="text-base text-muted-foreground hover:text-foreground transition-colors">
              {dict.footer.privacy}
            </a>
            <a href="#" className="text-base text-muted-foreground hover:text-foreground transition-colors">
              {dict.footer.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
