import type { LucideIcon } from "lucide-react";
import { Mail, MessageCircle, Rss } from "lucide-react";
import Link from "next/link";

type FooterLink = {
  href: string;
  label: string;
};

type FooterGroup = {
  title: string;
  links: FooterLink[];
};

type FooterSocialLink = FooterLink & {
  icon: LucideIcon;
};

const footerGroups: FooterGroup[] = [
  {
    title: "Product",
    links: [
      { href: "/dashboard", label: "Generator" },
      { href: "/pricing", label: "Pricing" },
      { href: "/#benefits", label: "Benefits" },
    ],
  },
  {
    title: "Workflow",
    links: [
      { href: "/dashboard", label: "Email drafts" },
      { href: "/dashboard", label: "Tone controls" },
      { href: "/profile", label: "Saved drafts" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/#faq", label: "FAQ" },
      { href: "/signup", label: "Get started" },
      { href: "mailto:support@aiemailgenerator.app", label: "Support" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/login", label: "Sign in" },
      { href: "/signup", label: "Create workspace" },
      { href: "/dashboard", label: "Open dashboard" },
    ],
  },
];

const socialLinks: FooterSocialLink[] = [
  {
    href: "mailto:hello@aiemailgenerator.app",
    icon: Mail,
    label: "Email AI Email Generator",
  },
  {
    href: "/#faq",
    icon: MessageCircle,
    label: "Read frequently asked questions",
  },
  {
    href: "/pricing",
    icon: Rss,
    label: "View product updates",
  },
];

const legalLinks: FooterLink[] = [
  { href: "mailto:privacy@aiemailgenerator.app", label: "Privacy" },
  { href: "mailto:legal@aiemailgenerator.app", label: "Terms" },
  { href: "mailto:security@aiemailgenerator.app", label: "Security" },
];

function isExternalHref(href: string) {
  return href.startsWith("mailto:") || href.startsWith("http");
}

function FooterTextLink({ href, label }: FooterLink) {
  const className =
    "flex min-h-11 items-center text-sm font-[460] leading-5 text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-9";

  if (isExternalHref(href)) {
    return (
      <a className={className} href={href}>
        {label}
      </a>
    );
  }

  return (
    <Link className={className} href={href}>
      {label}
    </Link>
  );
}

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background px-5 py-16 text-muted-foreground sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.95fr)] lg:gap-16">
          <div className="max-w-sm">
            <Link
              className="inline-flex min-h-11 items-center gap-3 text-base font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              href="/"
            >
              <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Mail className="size-4" aria-hidden="true" />
              </span>
              <span>AI Email Generator</span>
            </Link>
            <p className="mt-5 text-sm font-[460] leading-6">
              Turn a short brief into polished outreach, sales, and lifecycle
              email drafts.
            </p>
            <nav className="mt-7 flex gap-3" aria-label="Social links">
              {socialLinks.map(({ href, icon: Icon, label }) => {
                const className =
                  "flex size-11 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors duration-200 hover:border-primary/30 hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

                if (isExternalHref(href)) {
                  return (
                    <a
                      aria-label={label}
                      className={className}
                      href={href}
                      key={label}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </a>
                  );
                }

                return (
                  <Link
                    aria-label={label}
                    className={className}
                    href={href}
                    key={label}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-sm font-semibold leading-none text-foreground">
                  {group.title}
                </h2>
                <nav className="mt-4 grid gap-1" aria-label={group.title}>
                  {group.links.map((link) => (
                    <FooterTextLink key={`${group.title}-${link.label}`} {...link} />
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-border pt-8 text-sm font-[460] leading-5 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {currentYear} AI Email Generator. All rights reserved.</p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Legal">
            {legalLinks.map((link) => (
              <FooterTextLink key={link.label} {...link} />
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
