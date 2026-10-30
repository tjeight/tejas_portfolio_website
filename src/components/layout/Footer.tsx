import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import type { Footer as FooterCopy, Nav, Site } from "@/lib/types";
import { telHref } from "@/lib/utils";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { SocialLinks } from "@/components/ui/SocialLinks";

interface FooterProps {
  footer: FooterCopy;
  nav: Nav;
  site: Site;
}

export function Footer({ footer, nav, site }: FooterProps) {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="container-x py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.65fr)_minmax(0,0.85fr)] lg:gap-10">
          <div>
            <a
              href="#top"
              className="inline-flex items-center gap-3"
            >
              <span className="flex size-10 items-center justify-center rounded-full border border-line-strong font-mono text-[0.68rem] tracking-[0.12em] text-bone">
                {nav.brand.mark}
              </span>
              <span className="text-lg font-medium tracking-[-0.03em]">{site.name}</span>
              <span className="sr-only">{nav.brand.homeLabel}</span>
            </a>
            <p className="mt-6 max-w-sm text-pretty text-sm leading-relaxed text-muted">
              {footer.tagline}
            </p>
            <p className="mono-label mt-8 flex items-center gap-2 text-faint">
              <MapPin aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
              {footer.locationNote}
            </p>
          </div>

          <div>
            <p className="mono-label text-faint">{footer.sectionsLabel}</p>
            <ul className="mt-5 space-y-3">
              {nav.links.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-bone"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mono-label text-faint">{footer.connectLabel}</p>
            <SocialLinks
              socials={site.socials}
              showHandle
              className="mt-5 flex-col items-start gap-3"
              linkClassName="text-sm text-muted hover:text-accent"
            />
            <p className="mono-label mt-9 text-faint">{footer.contactLabel}</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-bone"
                >
                  <Mail aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={telHref(site.phoneHref)}
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-bone"
                >
                  <Phone aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
                  {site.phone}
                </a>
              </li>
              <li>
                <ExternalLink
                  href={site.website}
                  className="text-sm text-muted transition-colors hover:text-bone"
                >
                  {site.website.replace("https://", "")}
                </ExternalLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-line pt-6 text-[0.72rem] text-faint md:mt-20 md:flex-row md:items-center md:justify-between">
          <p>{footer.copyright}</p>
          <p className="max-w-md md:text-center">{footer.colophon}</p>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 transition-colors hover:text-bone"
          >
            {footer.backToTopLabel}
            <span className="flex size-7 items-center justify-center rounded-full border border-line transition-colors group-hover:border-bone">
              <ArrowUp
                aria-hidden="true"
                className="size-3 transition-transform duration-500 group-hover:-translate-y-0.5"
                strokeWidth={1.6}
              />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
