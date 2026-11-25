import Link from "next/link";
import InvoiceTool from "@/components/InvoiceTool";
import { faqs } from "@/lib/faqs";

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Rechnungsgenerator – Rechnung erstellen",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Webbrowser",
  inLanguage: "de",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  description:
    "Rechnungen kostenlos erstellen: Professionelle Rechnungen als PDF – mit MwSt, Kleinunternehmer-Regelung und Logo. Kostenlos, ohne Anmeldung, direkt im Browser.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const pflichtangaben = [
  "Vollständiger Name und Anschrift des Leistenden",
  "Vollständiger Name und Anschrift des Empfängers",
  "Steuernummer oder USt-IdNr des Leistenden",
  "Fortlaufende Rechnungsnummer",
  "Ausstellungsdatum der Rechnung",
  "Zeitpunkt der Leistung oder des Leistungszeitraums",
  "Menge und Art der gelieferten Gegenstände oder der Leistung",
  "Entgelt (netto) für die Leistung",
  "Steuersatz und Steuerbetrag",
  "Gesamtbetrag (brutto)",
];

const steps = [
  {
    step: "1",
    title: "Angaben eintragen",
    text: "Tragen Sie Ihre Firmendaten, den Kunden und Ihre Positionen ein. Die Summen und die Umsatzsteuer werden automatisch berechnet.",
  },
  {
    step: "2",
    title: "Vorschau prüfen",
    text: "Die Rechnung erscheint sofort in der Vorschau – mit Logo, Rechnungsnummer, Daten und allen Pflichtangaben.",
  },
  {
    step: "3",
    title: "Als PDF herunterladen",
    text: "Klicken Sie auf „Als PDF herunterladen“ und speichern Sie die Rechnung. Fertig – ohne Anmeldung und ohne Kosten.",
  },
];

function CheckIcon() {
  return (
    <svg
      className="h-5 w-5 shrink-0 text-teal-700"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.707-9.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function TrustChip({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <li className="flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-sm font-medium text-teal-50">
      {icon}
      {label}
    </li>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-950 via-teal-900 to-teal-800 text-white">
        <div
          className="hero-pattern pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-20">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              Rechnung erstellen – kostenlos &amp; ohne Anmeldung
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-teal-100 sm:text-lg">
              Erstellung Rechnung leicht gemacht: Die Erstellung einer
              Rechnung dauert mit diesem Generator nur wenige Minuten.
              Rechnungen kostenlos erstellen, als PDF herunterladen und
              direkt an Ihre Kunden senden – mit MwSt-Berechnung,
              Kleinunternehmer-Regelung nach § 19 UStG und eigenem Logo.
              Ohne Anmeldung, ohne Abo, ohne Installation.
            </p>
            <ul className="mt-7 flex flex-wrap gap-2.5">
              <TrustChip
                label="Kostenlos"
                icon={
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.707-9.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              />
              <TrustChip
                label="Ohne Anmeldung"
                icon={
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 17a7 7 0 0 1 14 0v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1Z" />
                  </svg>
                }
              />
              <TrustChip
                label="Daten bleiben im Browser"
                icon={
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 1.5 4 4v5c0 4.418 2.686 7.35 6 8.5 3.314-1.15 6-4.082 6-8.5V4l-6-2.5Zm-.707 10.707 3-3a1 1 0 0 0-1.414-1.414L9 9.586 7.707 8.293a1 1 0 1 0-1.414 1.414l2 2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              />
              <TrustChip
                label="PDF-Download"
                icon={
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 0 1 1 1v7.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L9 10.586V3a1 1 0 0 1 1-1ZM3 14a1 1 0 0 1 1 1v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a1 1 0 1 1 2 0v1a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4v-1a1 1 0 0 1 1-1Z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              />
            </ul>
            <p className="mt-8">
              <Link
                href="#generator"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-teal-900 shadow-lg transition-colors hover:bg-teal-50"
              >
                Jetzt Rechnung erstellen
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a1 1 0 0 1 1-1h8.586L9.293 5.707a1 1 0 0 1 1.414-1.414l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414-1.414L12.586 11H4a1 1 0 0 1-1-1Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </p>
          </div>

          {/* Dekorative Rechnungs-Vorschau (nur Optik, kein Inhalt) */}
          <div
            className="hidden rotate-1 rounded-2xl bg-white p-6 text-slate-900 shadow-2xl ring-1 ring-white/20 lg:block"
            aria-hidden="true"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold">Muster GmbH</p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Musterstraße 12 · 10115 Berlin
                </p>
              </div>
              <span className="rounded-md bg-teal-700 px-2.5 py-1 text-xs font-bold text-white">
                RECHNUNG
              </span>
            </div>
            <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Beratung, November 2026</span>
                <span className="font-medium text-slate-900">100,00 €</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Umsatzsteuer 19 %</span>
                <span className="font-medium text-slate-900">19,00 €</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2.5 text-base font-bold">
                <span>Gesamtbetrag</span>
                <span>119,00 €</span>
              </div>
            </div>
            <p className="mt-5 rounded-lg bg-teal-50 px-3 py-2 text-center text-xs font-semibold text-teal-800">
              Fertig als PDF – in wenigen Minuten
            </p>
          </div>
        </div>
      </section>

      <main>
        {/* ---------- Generator ---------- */}
        <section
          id="generator"
          aria-label="Rechnungsgenerator"
          className="scroll-mt-24 bg-white"
        >
          <div className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
            <p className="text-sm font-semibold tracking-wide text-teal-700 uppercase">
              Kostenloser Rechnungsgenerator
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Rechnung erstellen
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
              Daten eintragen, Vorschau prüfen, PDF herunterladen – alles
              direkt in Ihrem Browser.
            </p>
            <div className="mt-8">
              <InvoiceTool />
            </div>
          </div>
        </section>

        {/* ---------- 3 Schritte ---------- */}
        <section
          id="so-funktionierts"
          className="scroll-mt-24 bg-slate-50"
        >
          <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
            <p className="text-sm font-semibold tracking-wide text-teal-700 uppercase">
              So einfach geht&apos;s
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Erstellung Rechnung in 3 Schritten
            </h2>
            <ol className="relative mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
              <div
                className="absolute top-6 right-[16.6%] left-[16.6%] hidden border-t-2 border-dashed border-teal-200 md:block"
                aria-hidden="true"
              />
              {steps.map((item) => (
                <li
                  key={item.step}
                  className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <p className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-teal-700 text-lg font-bold text-white ring-4 ring-slate-50">
                    {item.step}
                  </p>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    {item.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- Pflichtangaben + Kleinunternehmer ---------- */}
        <section id="pflichtangaben" className="scroll-mt-24 bg-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:py-16 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Was muss auf einer Rechnung stehen?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Nach § 14 UStG gehören diese Pflichtangaben auf eine
                Rechnung:
              </p>
              <ul className="mt-5 space-y-3">
                {pflichtangaben.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckIcon />
                    <span className="text-sm leading-relaxed text-slate-700">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-slate-200 pt-4 text-xs leading-relaxed text-slate-500">
                Allgemeine Informationen, keine Steuer- oder Rechtsberatung.
                Prüfen Sie im Zweifel Ihre Rechnung mit einem Steuerberater.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Rechnung als Kleinunternehmer
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Kleinunternehmer nach § 19 UStG berechnen keine Umsatzsteuer
                und weisen sie auf der Rechnung auch nicht aus. Stattdessen
                steht auf der Rechnung der Hinweis: „Gemäß § 19 UStG wird
                keine Umsatzsteuer berechnet.“
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Wählen Sie im Generator einfach die Option „0 %
                Kleinunternehmer nach § 19 UStG“. Der Gesamtbetrag
                entspricht dann dem Nettobetrag, und der Hinweis erscheint
                automatisch auf Ihrer Rechnung. Das ist besonders praktisch
                für Freiberufler und kleine Unternehmen, die keine
                Umsatzsteuer abführen.
              </p>
              <h3 className="mt-6 border-t border-slate-200 pt-5 text-lg font-semibold text-slate-900">
                Rechnung als Freiberufler – ohne Vorlage
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Als Freiberufler brauchen Sie keine fertige Word-Vorlage
                oder ein Rechnung-Muster: Eine Rechnung Freiberufler
                Vorlage ist damit überflüssig. Der Generator erstellt Ihre
                Rechnung direkt als PDF. Ihre Angaben bleiben im Browser
                gespeichert, sodass Sie beim nächsten Mal nur noch die
                Positionen ändern müssen.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section id="faq" className="scroll-mt-24 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
            <p className="text-sm font-semibold tracking-wide text-teal-700 uppercase">
              Fragen &amp; Antworten
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Häufige Fragen
            </h2>
            <div className="mt-8 space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-slate-200 border-l-4 border-l-teal-600 bg-white p-5 shadow-sm sm:p-6"
                >
                  <h3 className="text-lg font-semibold text-slate-900">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
