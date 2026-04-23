import Image from "next/image"

const footerLinks = [
  {
    title: "Services",
    links: [
      { label: "Web Design & Dev", href: "#services" },
      { label: "Branding & Identity", href: "#services" },
      { label: "E-Commerce", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Process", href: "#process" },
      { label: "Team", href: "#team" },
      { label: "Contact", href: "#contact" },
    ],
  },
]

const socialLinks = [
  { label: "Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
]

export function Footer() {
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
            <p className="text-xl font-black tracking-tight mb-2">
              <span className="text-[#3B9EFF]">Design.</span>{" "}
              <span className="text-foreground">Build.</span>{" "}
              <span className="text-[#FEC700]">Launch.</span>
            </p>
            <p className="text-sm text-muted-foreground max-w-sm mb-6">
              Your digital launch partner. We help businesses launch and grow with strategic branding, web development, and marketing.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="font-semibold text-foreground mb-4">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} SO Agency. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
