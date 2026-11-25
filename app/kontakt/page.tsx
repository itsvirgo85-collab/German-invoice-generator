import type { Metadata } from "next";
import KontaktForm from "@/components/KontaktForm";

export const metadata: Metadata = {
  title: "Kontakt | Rechnungsgenerator",
  description:
    "Kontakt zum Rechnungsgenerator: Schreiben Sie uns bei Fragen zur Rechnungserstellung, zu Vorlagen oder zum PDF-Download. Wir antworten so schnell wie möglich.",
};

export default function KontaktPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900">Kontakt</h1>
      <p className="mt-4 text-sm leading-relaxed text-slate-600">
        Haben Sie eine Frage zur Rechnungserstellung, zu Vorlagen oder zum
        PDF-Download? Schreiben Sie uns – wir antworten so schnell wie
        möglich.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        Ihre Nachricht wird über Ihr eigenes E-Mail-Programm gesendet. Es
        werden keine Daten an einen Server übertragen.
      </p>
      <KontaktForm />
    </main>
  );
}
