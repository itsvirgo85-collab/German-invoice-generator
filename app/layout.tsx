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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        {children}
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-8">
            <nav
              className="flex flex-wrap gap-x-6 gap-y-2 text-sm"
              aria-label="Footer"
            >
              <Link
                href="/"
                className="font-medium text-teal-700 hover:underline"
              >
                Rechnungsgenerator
              </Link>
              <Link
                href="/impressum"
                className="text-slate-600 hover:underline"
              >
                Impressum
              </Link>
              <Link
                href="/datenschutz"
                className="text-slate-600 hover:underline"
              >
                Datenschutz
              </Link>
              <Link href="/kontakt" className="text-slate-600 hover:underline">
                Kontakt
              </Link>
            </nav>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
              Alle Daten, die Sie in den Rechnungsgenerator eingeben,
              bleiben in Ihrem Browser. Es wird nichts hochgeladen und
              nichts auf einem Server gespeichert.
            </p>
            <p className="mt-6 text-xs text-slate-400">
              © 2026 Rechnungsgenerator
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
