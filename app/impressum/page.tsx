import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | Rechnungsgenerator",
  description:
    "Impressum des kostenlosen Rechnungsgenerators: Angaben gemäß § 5 DDG zum Anbieter, Kontakt und Verantwortlichem. Alle Angaben werden vor dem Launch ergänzt.",
};

export default function ImpressumPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900">Impressum</h1>

      <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
        Hinweis: Die Angaben auf dieser Seite sind Platzhalter und müssen
        vor dem Launch durch die echten Angaben des Anbieters ersetzt
        werden.
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">
          Angaben gemäß § 5 DDG
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          [Name]
          <br />
          [Straße und Hausnummer]
          <br />
          [PLZ Ort]
          <br />
          Deutschland
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">Kontakt</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          Telefon: [Telefonnummer]
          <br />
          E-Mail: [E-Mail-Adresse]
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">
          Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          [Name, Anschrift wie oben]
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">
          Umsatzsteuer-Identifikationsnummer
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          [USt-IdNr, falls vorhanden – sonst diesen Abschnitt vor dem
          Launch entfernen]
        </p>
      </section>
    </main>
  );
}
