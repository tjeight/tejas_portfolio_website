import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import type {
  ContactCopy,
  ContactSectionCopy,
  Site,
} from "@/lib/types";
import { telHref } from "@/lib/utils";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { SocialLinks } from "@/components/ui/SocialLinks";

interface ContactProps {
  contact: ContactCopy;
  section: ContactSectionCopy;
  site: Site;
}

export function Contact({ contact, section, site }: ContactProps) {
  const linkedin = site.socials.find((social) => social.id === "linkedin");

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-shell relative overflow-hidden border-t border-line bg-ink-soft"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-16 size-[34rem] rounded-full border border-line/40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-32 size-[20rem] rounded-full border border-line/30"
      />

      <div className="container-x relative">
        <div
          className="grid gap-8 border-t border-line pt-7 md:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] md:gap-16 md:pt-9"
          data-reveal
        >
          <div>
            <span className="eyebrow">
              {section.index} / {section.eyebrow}
            </span>
            <DisplayHeading
              id="contact-heading"
              segments={section.heading}
              className="mt-6 max-w-[14ch] text-[clamp(2.9rem,6.4vw,6.4rem)]"
            />
          </div>
          <p className="max-w-md self-end text-pretty text-[0.95rem] leading-relaxed text-muted md:justify-self-end md:text-base">
            {section.description}
          </p>
        </div>

        <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
          <div data-reveal>
            <a
              href={`mailto:${site.email}`}
              className="link-underline display inline-block max-w-full break-words text-[clamp(1.55rem,3.4vw,3.15rem)] text-accent"
            >
              {site.email}
            </a>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
              <CopyEmailButton
                email={site.email}
                copyLabel={contact.copyLabel}
                copiedLabel={contact.copiedLabel}
                errorLabel={contact.copyErrorLabel}
                className="text-muted hover:text-bone"
              />
              <span className="hidden h-3 w-px bg-line sm:block" aria-hidden="true" />
              <span className="text-[0.72rem] text-faint">{section.responseNote}</span>
            </div>

            <div className="mt-9 flex flex-wrap gap-2.5">
              <a href={`mailto:${site.email}`} className="btn btn-primary">
                {section.primaryCta}
                <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.6} />
              </a>
              {linkedin ? (
                <a
                  href={linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${section.secondaryCta}. ${linkedin.ariaLabel}`}
                  className="btn btn-ghost"
                >
                  {section.secondaryCta}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4"
                    strokeWidth={1.6}
                  />
                </a>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-7">
            <div>
              <p className="mono-label text-faint">{contact.emailLabel}</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-3 inline-flex items-start gap-2 break-all text-sm leading-relaxed text-muted transition-colors hover:text-bone"
              >
                <Mail aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" strokeWidth={1.5} />
                <span>{site.email}</span>
              </a>
            </div>
            <div>
              <p className="mono-label text-faint">{contact.phoneLabel}</p>
              <a
                href={telHref(site.phoneHref)}
                className="mt-3 inline-flex items-start gap-2 text-sm leading-relaxed text-muted transition-colors hover:text-bone"
              >
                <Phone aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" strokeWidth={1.5} />
                <span>{site.phone}</span>
              </a>
            </div>
            <div>
              <p className="mono-label text-faint">{contact.locationLabel}</p>
              <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-muted">
                <MapPin aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" strokeWidth={1.5} />
                <span>{site.location.label}</span>
              </p>
            </div>
            <div>
              <p className="mono-label text-faint">{contact.socialLabel}</p>
              <SocialLinks
                socials={site.socials}
                className="mt-3 flex-col items-start gap-2.5"
                linkClassName="text-sm text-muted hover:text-accent"
              />
            </div>
            <div className="col-span-2 flex items-center gap-3 rounded-full border border-line px-4 py-3">
              <span className="size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              <p className="text-[0.68rem] text-faint">
                {section.availabilityLabel} {site.location.label}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
