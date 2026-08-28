import { AnimatedWordmark } from "@/components/animated-wordmark";
import {
  GitHubLogo,
  LinkedInLogo,
  SlackLogo,
  XLogo,
} from "@/components/ui/brand-logos";
import { BrandLockup } from "@/components/ui/brand-lockup";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Traces", href: "#workspace" },
      { label: "Prompts", href: "#capabilities" },
      { label: "Evals", href: "#capabilities" },
      { label: "Dashboards", href: "#capabilities" },
      { label: "Integrations", href: "#integrations" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Docs", href: "https://docs.neatlogs.com" },
      { label: "SDK reference", href: "https://docs.neatlogs.com" },
      { label: "Changelog", href: "#" },
      { label: "Glossary", href: "#" },
      { label: "GitHub", href: "https://github.com" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#demo" },
      { label: "Privacy policy", href: "#" },
      { label: "Terms of service", href: "#" },
    ],
  },
];

const socials = [
  { label: "GitHub", href: "https://github.com", Logo: GitHubLogo },
  { label: "X", href: "#", Logo: XLogo },
  { label: "LinkedIn", href: "#", Logo: LinkedInLogo },
  { label: "Slack community", href: "#", Logo: SlackLogo },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,2fr)]">
          <div>
            <BrandLockup className="transition-opacity hover:opacity-70" />
            <p className="mt-3.5 max-w-xs text-[13.5px] leading-relaxed text-muted">
              The collaborative debugging workspace for teams shipping AI agents.
            </p>

            <div className="mt-5 flex w-fit gap-px bg-line">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center bg-surface text-muted transition-colors hover:bg-brand-soft hover:text-brand"
                >
                  <social.Logo className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="font-mono text-[10.5px] tracking-[0.18em] text-faint uppercase">
                  {column.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[13.5px] text-ink-soft transition-colors hover:text-brand"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-faint">
            © {new Date().getFullYear()} Neatlogs Inc. All rights reserved.
          </p>
          <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] text-faint uppercase">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping bg-signal-green opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 bg-signal-green" />
            </span>
            all systems operational
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <AnimatedWordmark />
      </div>
    </footer>
  );
}
