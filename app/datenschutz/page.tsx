import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | Rechnungsgenerator",
  description:
    "Datenschutzerklärung des Rechnungsgenerators: Ihre Daten bleiben in Ihrem Browser, keine Server-Speicherung, keine Cookies, keine Analyse-Tools. Details hier.",
};

export default function DatenschutzPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900">
        Datenschutzerklärung
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-slate-600">
        Stand: November 2026
      </p>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">
          1. Verantwortlicher
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          Verantwortlich für die Datenverarbeitung auf dieser Website ist
          der im{" "}
          <a href="/impressum" className="text-teal-700 underline">
            Impressum
          </a>{" "}
          genannte Anbieter. Die Angaben dort sind bis zum Launch
          Platzhalter und werden danach vervollständigt.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">
          2. Datenverarbeitung im Browser
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          Dieser Rechnungsgenerator arbeitet vollständig in Ihrem Browser.
          Alle Daten, die Sie eingeben – Firmendaten, Kundendaten,
          Rechnungspositionen und Hinweise – werden nicht an einen Server
          gesendet und nicht auf einem Server gespeichert.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          Ihr Entwurf wird nur lokal in Ihrem Browser (localStorage)
          zwischengespeichert, damit Sie ihn beim nächsten Besuch
          wiederfinden. Sie können den Entwurf jederzeit mit dem Button
          „Neue Rechnung“ löschen. Ein hochgeladenes Logo wird nur als
          Daten-URL in Ihrem Browser gelesen und ebenfalls nicht
          hochgeladen.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">
          3. Hosting und Server-Logs
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          Diese Website wird als statische Website gehostet. Beim Aufruf
          der Seiten kann der Hosting-Anbieter technische Zugriffsdaten
          (zum Beispiel IP-Adresse, Datum und Uhrzeit, aufgerufene Seite)
          in Server-Logs speichern. Diese Daten werden nicht mit Ihren
          Eingaben im Rechnungsgenerator zusammengeführt.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">
          4. Cookies und Analyse
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          Diese Website verwendet keine Cookies zu Tracking-Zwecken und
          keine Analyse-Tools. Es gibt derzeit auch keine Werbung und
          kein Nutzerkonto. localStorage ist kein Cookie und wird nur
          für Ihren eigenen Entwurf verwendet (siehe Abschnitt 2).
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">
          5. Kontaktaufnahme
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          Wenn Sie uns über die{" "}
          <a href="/kontakt" className="text-teal-700 underline">
            Kontaktseite
          </a>{" "}
          schreiben, wird Ihre Nachricht über Ihr eigenes E-Mail-Programm
          gesendet. Es werden dabei keine Daten an einen Server dieser
          Website übertragen. Die in Ihrer E-Mail enthaltenen Daten
          verwenden wir nur, um Ihre Anfrage zu beantworten.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">
          6. Ihre Rechte
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          Sie haben das Recht auf Auskunft über Ihre gespeicherten Daten,
          auf Berichtigung, Löschung und Einschränkung der Verarbeitung
          sowie auf Datenübertragbarkeit und Widerspruch. Außerdem haben
          Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu
          beschweren. Da diese Website Ihre Eingaben nicht speichert,
          liegen hier in der Regel keine personenbezogenen Daten vor, über
          die Auskunft erteilt werden könnte.
        </p>
      </section>
    </main>
  );
}
