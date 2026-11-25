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

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <p className="text-lg font-bold text-teal-700">
            Rechnungsgenerator
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
          Rechnung erstellen – kostenlos &amp; ohne Anmeldung
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
          Erstellung Rechnung leicht gemacht: Die Erstellung einer Rechnung
          dauert mit diesem Generator nur wenige Minuten. Rechnungen
          kostenlos erstellen, als PDF herunterladen und direkt an Ihre
          Kunden senden – mit MwSt-Berechnung, Kleinunternehmer-Regelung
          nach § 19 UStG und eigenem Logo. Ohne Anmeldung, ohne Abo, ohne
          Installation.
        </p>

        <section className="mt-8" aria-label="Rechnungsgenerator">
          <InvoiceTool />
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900">
            Erstellung Rechnung in 3 Schritten
          </h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {[
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
            ].map((item) => (
              <li
                key={item.step}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-700 text-base font-bold text-white">
                  {item.step}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  {item.text}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              Was muss auf einer Rechnung stehen?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Nach § 14 UStG gehören diese Pflichtangaben auf eine Rechnung:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
              {pflichtangaben.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              Allgemeine Informationen, keine Steuer- oder Rechtsberatung.
              Prüfen Sie im Zweifel Ihre Rechnung mit einem Steuerberater.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              Rechnung als Kleinunternehmer
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Kleinunternehmer nach § 19 UStG berechnen keine Umsatzsteuer und
              weisen sie auf der Rechnung auch nicht aus. Stattdessen steht
              auf der Rechnung der Hinweis: „Gemäß § 19 UStG wird keine
              Umsatzsteuer berechnet.“
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Wählen Sie im Generator einfach die Option „0 %
              Kleinunternehmer nach § 19 UStG“. Der Gesamtbetrag entspricht
              dann dem Nettobetrag, und der Hinweis erscheint automatisch auf
              Ihrer Rechnung. Das ist besonders praktisch für Freiberufler
              und kleine Unternehmen, die keine Umsatzsteuer abführen.
            </p>
            <h3 className="mt-5 text-lg font-semibold text-slate-900">
              Rechnung als Freiberufler – ohne Vorlage
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Als Freiberufler brauchen Sie keine fertige Word-Vorlage oder
              ein Rechnung-Muster: Eine Rechnung Freiberufler Vorlage ist
              damit überflüssig. Der Generator erstellt Ihre Rechnung
              direkt als PDF. Ihre Angaben bleiben im Browser gespeichert,
              sodass Sie beim nächsten Mal nur noch die Positionen ändern
              müssen.
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900">
            Häufige Fragen
          </h2>
          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
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
        </section>
      </main>
    </div>
  );
}
