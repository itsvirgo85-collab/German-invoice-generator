import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Erstellung Rechnung – Kostenloser Rechnungsgenerator",
  description:
    "Rechnungen kostenlos erstellen: Professionelle Rechnungen als PDF – mit MwSt, Kleinunternehmer-Regelung und Logo. Kostenlos, ohne Anmeldung, direkt im Browser.",
  openGraph: {
    title: "Erstellung Rechnung – Kostenloser Rechnungsgenerator",
    description:
      "Rechnungen kostenlos erstellen: Professionelle Rechnungen als PDF – mit MwSt, Kleinunternehmer-Regelung und Logo. Kostenlos, ohne Anmeldung, direkt im Browser.",
    type: "website",
    locale: "de_DE",
  },
  twitter: {
    card: "summary",
    title: "Erstellung Rechnung – Kostenloser Rechnungsgenerator",
    description:
      "Rechnungen kostenlos erstellen: Professionelle Rechnungen als PDF – mit MwSt, Kleinunternehmer-Regelung und Logo. Kostenlos, ohne Anmeldung, direkt im Browser.",
  },
};

function LogoMark({ id }: { id: string }) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 64 64"
      aria-hidden="true"
      className="h-9 w-9 shrink-0"
    >
      <defs>
        <linearGradient
          id={id}
          x1="0"
          y1="0"
          x2="64"
          y2="64"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0d9488" />
          <stop offset="1" stopColor="#115e59" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill={`url(#${id})`} />
      <path
        d="M22 12h15l9 9v29a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4V16a4 4 0 0 1 4-4z"
        fill="#ffffff"
      />
      <path d="M37 12v9h9" fill="#99f6e4" />
      <path
        d="M24 28h10M24 34h16M24 40h16"
        stroke="#0f766e"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

const navLinks = [
  { href: "/#generator", label: "Generator" },
  { href: "/#so-funktionierts", label: "So funktioniert's" },
  { href: "/#pflichtangaben", label: "Pflichtangaben" },
  { href: "/#faq", label: "FAQ" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
            <Link href="/" className="flex min-w-0 items-center gap-2.5">
              <LogoMark id="logo-header" />
              <span className="truncate text-base font-bold tracking-tight text-slate-900 sm:text-lg">
                Rechnungsgenerator
              </span>
            </Link>
            <nav
              className="ml-auto hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex"
              aria-label="Hauptnavigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-teal-700"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/#generator"
              className="ml-auto shrink-0 rounded-lg bg-teal-700 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 md:ml-0"
            >
              <span className="sm:hidden">Erstellen</span>
              <span className="hidden sm:inline">
                Jetzt Rechnung erstellen
              </span>
            </Link>
          </div>
        </header>

        {children}

        <footer className="bg-slate-900 text-slate-300">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <div className="grid gap-10 md:grid-cols-3">
              <div>
                <div className="flex items-center gap-2.5">
                  <LogoMark id="logo-footer" />
                  <span className="text-lg font-bold tracking-tight text-white">
                    Rechnungsgenerator
                  </span>
                </div>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
                  Rechnungen kostenlos erstellen, als PDF herunterladen und
                  direkt an Ihre Kunden senden – mit MwSt-Berechnung,
                  Kleinunternehmer-Regelung und eigenem Logo.
                </p>
              </div>
              <nav aria-label="Footer-Navigation">
                <p className="text-sm font-semibold tracking-wide text-white uppercase">
                  Navigation
                </p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <nav aria-label="Rechtliches">
                <p className="text-sm font-semibold tracking-wide text-white uppercase">
                  Rechtliches
                </p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  <li>
                    <Link
                      href="/impressum"
                      className="transition-colors hover:text-white"
                    >
                      Impressum
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/datenschutz"
                      className="transition-colors hover:text-white"
                    >
                      Datenschutz
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/kontakt"
                      className="transition-colors hover:text-white"
                    >
                      Kontakt
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="mt-10 border-t border-slate-800 pt-6">
              <p className="max-w-3xl text-sm leading-relaxed text-slate-400">
                Alle Daten, die Sie in den Rechnungsgenerator eingeben,
                bleiben in Ihrem Browser. Es wird nichts hochgeladen und
                nichts auf einem Server gespeichert.
              </p>
              <p className="mt-4 text-xs text-slate-500">
                © 2026 Rechnungsgenerator
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
