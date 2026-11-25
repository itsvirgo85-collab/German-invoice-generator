"use client";

import { useEffect, useState } from "react";
import {
  addDays,
  computeTotals,
  formatEuro,
  formatGermanDate,
  lineTotal,
  newLineItem,
  parseGermanNumber,
  toInputDate,
  type LineItem,
  type TaxRate,
} from "@/lib/invoice";

const STORAGE_KEY = "rechnungsgenerator-entwurf-v1";

interface SellerData {
  firmenname: string;
  strasse: string;
  plzOrt: string;
  email: string;
  telefon: string;
  steuernummer: string;
  iban: string;
  bankname: string;
}

interface BuyerData {
  name: string;
  strasse: string;
  plzOrt: string;
  ustIdnr: string;
}

interface Draft {
  seller: SellerData;
  buyer: BuyerData;
  rechnungsnummer: string;
  rechnungsdatum: string;
  faelligkeit: string;
  leistungsdatum: string;
  items: LineItem[];
  taxRate: TaxRate;
  hinweise: string;
}

function defaultDraft(): Draft {
  const today = new Date();
  return {
    seller: {
      firmenname: "",
      strasse: "",
      plzOrt: "",
      email: "",
      telefon: "",
      steuernummer: "",
      iban: "",
      bankname: "",
    },
    buyer: { name: "", strasse: "", plzOrt: "", ustIdnr: "" },
    rechnungsnummer: "2026-001",
    rechnungsdatum: toInputDate(today),
    faelligkeit: toInputDate(addDays(today, 14)),
    leistungsdatum: "",
    items: [newLineItem()],
    taxRate: "19",
    hinweise: "Zahlbar innerhalb von 14 Tagen ohne Abzug.",
  };
}

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 transition placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/30";
const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

function SectionHeading({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xs font-bold text-white">
        {number}
      </span>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  inputMode?: "decimal" | "email" | "tel" | "text";
}) {
  return (
    <label className="block min-w-0">
      <span className={labelClass}>{label}</span>
      <input
        type={type}
        className={inputClass}
        value={value}
        placeholder={placeholder}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export default function InvoiceTool() {
  const [draft, setDraft] = useState<Draft>(defaultDraft);
  const [logo, setLogo] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Entwurf beim Laden wiederherstellen.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Draft;
        if (parsed && Array.isArray(parsed.items) && parsed.items.length > 0) {
          setDraft({ ...defaultDraft(), ...parsed });
        }
      }
    } catch {
      // Beschädigter Entwurf wird ignoriert.
    }
    setLoaded(true);
  }, []);

  // Entwurf automatisch speichern (Logo ausgenommen).
  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // Speicher voll oder blockiert – kein Fehler für den Nutzer.
    }
  }, [draft, loaded]);

  const totals = computeTotals(draft.items, draft.taxRate);
  const taxLabel =
    draft.taxRate === "19"
      ? "Umsatzsteuer 19 %"
      : draft.taxRate === "7"
        ? "Umsatzsteuer 7 %"
        : "Umsatzsteuer 0 % (Kleinunternehmer)";

  function updateSeller(key: keyof SellerData, value: string) {
    setDraft((d) => ({ ...d, seller: { ...d.seller, [key]: value } }));
  }

  function updateBuyer(key: keyof BuyerData, value: string) {
    setDraft((d) => ({ ...d, buyer: { ...d.buyer, [key]: value } }));
  }

  function updateItem(id: string, key: keyof LineItem, value: string) {
    setDraft((d) => ({
      ...d,
      items: d.items.map((item) =>
        item.id === id ? { ...item, [key]: value } : item,
      ),
    }));
  }

  function addItem() {
    setDraft((d) => ({ ...d, items: [...d.items, newLineItem()] }));
  }

  function removeItem(id: string) {
    setDraft((d) => ({
      ...d,
      items:
        d.items.length > 1
          ? d.items.filter((item) => item.id !== id)
          : d.items,
    }));
  }

  function handleLogo(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setLogo(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function resetForm() {
    const fresh = defaultDraft();
    setDraft(fresh);
    setLogo(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignorieren.
    }
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-2">
      {/* ---------- Formular ---------- */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
        <div className="border-b border-slate-100 bg-teal-50/60 px-5 py-4 sm:px-6">
          <p className="flex items-center gap-2 text-sm font-medium text-teal-900">
            <svg
              className="h-4 w-4 shrink-0 text-teal-700"
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
            Alle Daten bleiben in Ihrem Browser – nichts wird hochgeladen
            oder gespeichert.
          </p>
        </div>

        <div className="space-y-8 px-5 py-6 sm:px-6">
          <section>
            <SectionHeading number="01" title="Ihre Angaben (Verkäufer)" />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Field
                label="Firmenname"
                value={draft.seller.firmenname}
                onChange={(v) => updateSeller("firmenname", v)}
                placeholder="Muster GmbH"
              />
              <Field
                label="Straße und Hausnummer"
                value={draft.seller.strasse}
                onChange={(v) => updateSeller("strasse", v)}
                placeholder="Musterstraße 12"
              />
              <Field
                label="PLZ und Ort"
                value={draft.seller.plzOrt}
                onChange={(v) => updateSeller("plzOrt", v)}
                placeholder="10115 Berlin"
              />
              <Field
                label="E-Mail"
                type="email"
                value={draft.seller.email}
                onChange={(v) => updateSeller("email", v)}
                placeholder="info@beispiel.de"
                inputMode="email"
              />
              <Field
                label="Telefon (optional)"
                type="tel"
                value={draft.seller.telefon}
                onChange={(v) => updateSeller("telefon", v)}
                placeholder="030 123456"
                inputMode="tel"
              />
              <Field
                label="Steuernummer oder USt-IdNr"
                value={draft.seller.steuernummer}
                onChange={(v) => updateSeller("steuernummer", v)}
                placeholder="DE123456789"
              />
              <Field
                label="IBAN"
                value={draft.seller.iban}
                onChange={(v) => updateSeller("iban", v)}
                placeholder="DE89 3704 0044 0532 0130 00"
              />
              <Field
                label="Bankname"
                value={draft.seller.bankname}
                onChange={(v) => updateSeller("bankname", v)}
                placeholder="Musterbank"
              />
            </div>
          </section>

          <section className="border-t border-slate-100 pt-8">
            <SectionHeading number="02" title="Kunde (Rechnungsempfänger)" />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Field
                label="Name / Firma"
                value={draft.buyer.name}
                onChange={(v) => updateBuyer("name", v)}
                placeholder="Kunden GmbH"
              />
              <Field
                label="Straße und Hausnummer"
                value={draft.buyer.strasse}
                onChange={(v) => updateBuyer("strasse", v)}
                placeholder="Kundenweg 5"
              />
              <Field
                label="PLZ und Ort"
                value={draft.buyer.plzOrt}
                onChange={(v) => updateBuyer("plzOrt", v)}
                placeholder="80331 München"
              />
              <Field
                label="USt-IdNr (optional)"
                value={draft.buyer.ustIdnr}
                onChange={(v) => updateBuyer("ustIdnr", v)}
                placeholder="DE987654321"
              />
            </div>
          </section>

          <section className="border-t border-slate-100 pt-8">
            <SectionHeading number="03" title="Rechnungsdaten" />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Field
                label="Rechnungsnummer"
                value={draft.rechnungsnummer}
                onChange={(v) =>
                  setDraft((d) => ({ ...d, rechnungsnummer: v }))
                }
              />
              <Field
                label="Rechnungsdatum"
                type="date"
                value={draft.rechnungsdatum}
                onChange={(v) =>
                  setDraft((d) => ({ ...d, rechnungsdatum: v }))
                }
              />
              <Field
                label="Fälligkeitsdatum"
                type="date"
                value={draft.faelligkeit}
                onChange={(v) => setDraft((d) => ({ ...d, faelligkeit: v }))}
              />
              <Field
                label="Leistungsdatum / Leistungszeitraum (optional)"
                value={draft.leistungsdatum}
                onChange={(v) =>
                  setDraft((d) => ({ ...d, leistungsdatum: v }))
                }
                placeholder="z. B. November 2026"
              />
            </div>
          </section>

          <section className="border-t border-slate-100 pt-8">
            <SectionHeading number="04" title="Positionen" />
            <div className="mt-4 space-y-3">
              {draft.items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 gap-2 rounded-xl border border-slate-200 bg-slate-50/60 p-3 sm:grid-cols-[1fr_5rem_7rem_7rem_2.5rem] sm:bg-transparent sm:p-0 sm:py-1"
                >
                  <Field
                    label="Beschreibung"
                    value={item.beschreibung}
                    onChange={(v) => updateItem(item.id, "beschreibung", v)}
                    placeholder="Leistung"
                  />
                  <Field
                    label="Menge"
                    value={item.menge}
                    onChange={(v) => updateItem(item.id, "menge", v)}
                    inputMode="decimal"
                  />
                  <Field
                    label="Einzelpreis (€)"
                    value={item.einzelpreis}
                    onChange={(v) => updateItem(item.id, "einzelpreis", v)}
                    placeholder="0,00"
                    inputMode="decimal"
                  />
                  <div className="min-w-0">
                    <span className={labelClass}>Betrag</span>
                    <div className="rounded-lg bg-slate-100 px-2 py-2.5 text-right text-sm font-semibold text-slate-800">
                      {formatEuro(lineTotal(item))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label="Position entfernen"
                    className="h-10 w-10 shrink-0 justify-self-end rounded-lg border border-slate-300 text-sm text-red-600 transition hover:border-red-300 hover:bg-red-50 sm:mt-6 sm:justify-self-center"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addItem}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-teal-700 px-4 py-2 text-sm font-medium text-teal-700 transition hover:bg-teal-50"
            >
              <span className="text-base leading-none">+</span> Position
              hinzufügen
            </button>
          </section>

          <section className="border-t border-slate-100 pt-8">
            <SectionHeading number="05" title="Umsatzsteuer" />
            <div className="mt-4 space-y-2.5">
              {(
                [
                  ["19", "19 % MwSt (Standard)"],
                  ["7", "7 % MwSt (ermäßigt)"],
                  ["0", "0 % Kleinunternehmer nach § 19 UStG"],
                ] as [TaxRate, string][]
              ).map(([value, label]) => (
                <label
                  key={value}
                  className="tax-option flex cursor-pointer items-center gap-3 rounded-lg border border-slate-300 px-3.5 py-3 text-sm font-medium text-slate-800 transition"
                >
                  <input
                    type="radio"
                    name="taxRate"
                    value={value}
                    checked={draft.taxRate === value}
                    onChange={() =>
                      setDraft((d) => ({ ...d, taxRate: value }))
                    }
                    className="h-4 w-4 shrink-0 accent-teal-700"
                  />
                  {label}
                </label>
              ))}
            </div>
            {draft.taxRate === "0" && (
              <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-sm text-amber-800">
                Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.
              </p>
            )}
          </section>

          <section className="border-t border-slate-100 pt-8">
            <SectionHeading number="06" title="Logo (optional)" />
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <input
                type="file"
                accept="image/*"
                className="min-w-0 text-sm text-slate-700 file:mr-3 file:rounded-lg file:border file:border-slate-300 file:bg-white file:px-3 file:py-2 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-100"
                onChange={(e) => handleLogo(e.target.files?.[0])}
              />
              {logo && (
                <button
                  type="button"
                  onClick={() => setLogo(null)}
                  className="text-sm text-red-600 underline"
                >
                  Logo entfernen
                </button>
              )}
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Das Logo wird nur in Ihrem Browser gelesen und nicht
              hochgeladen.
            </p>
          </section>

          <section className="border-t border-slate-100 pt-8">
            <label className="block">
              <span className="mb-1.5 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xs font-bold text-white">
                  07
                </span>
                <span className="text-base font-semibold text-slate-900">
                  Hinweise / Zahlungsbedingungen
                </span>
              </span>
              <textarea
                rows={3}
                className={inputClass}
                value={draft.hinweise}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, hinweise: e.target.value }))
                }
              />
            </label>
          </section>

          <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-teal-800 sm:w-auto"
            >
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
              Als PDF herunterladen
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Neue Rechnung
            </button>
          </div>
        </div>
      </div>

      {/* ---------- Vorschau ---------- */}
      <div>
        <div className="lg:sticky lg:top-24">
          <div className="mb-3 flex items-center gap-2">
            <h3 className="text-base font-semibold text-slate-900">
              Vorschau
            </h3>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-semibold text-teal-800">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-600" />
              Live
            </span>
          </div>
          <div className="rounded-2xl bg-slate-200/70 p-3 sm:p-5">
            <div
              id="invoice-print"
              className="rounded-lg bg-white p-4 shadow-xl ring-1 ring-slate-900/5 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 text-sm leading-relaxed break-words text-slate-700">
                  <p className="font-semibold text-slate-900">
                    {draft.seller.firmenname || "Ihr Firmenname"}
                  </p>
                  {draft.seller.strasse && <p>{draft.seller.strasse}</p>}
                  {draft.seller.plzOrt && <p>{draft.seller.plzOrt}</p>}
                  {draft.seller.email && <p>{draft.seller.email}</p>}
                  {draft.seller.telefon && <p>{draft.seller.telefon}</p>}
                  {draft.seller.steuernummer && (
                    <p>
                      Steuernummer / USt-IdNr: {draft.seller.steuernummer}
                    </p>
                  )}
                </div>
                {logo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logo}
                    alt="Firmenlogo"
                    className="max-h-20 max-w-40 shrink-0 object-contain"
                  />
                )}
              </div>

              <h2 className="mt-8 border-b-2 border-teal-700 pb-2 text-2xl font-bold tracking-wide text-slate-900">
                RECHNUNG
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-slate-700">
                <p className="text-slate-500">Rechnungsnummer</p>
                <p className="font-medium text-slate-900">
                  {draft.rechnungsnummer}
                </p>
                <p className="text-slate-500">Rechnungsdatum</p>
                <p>{formatGermanDate(draft.rechnungsdatum)}</p>
                <p className="text-slate-500">Fälligkeitsdatum</p>
                <p>{formatGermanDate(draft.faelligkeit)}</p>
                {draft.leistungsdatum && (
                  <>
                    <p className="text-slate-500">Leistungsdatum</p>
                    <p>{draft.leistungsdatum}</p>
                  </>
                )}
              </div>

              <div className="mt-6 text-sm leading-relaxed break-words text-slate-700">
                <p className="font-semibold text-slate-900">
                  Rechnungsempfänger
                </p>
                <p className="font-medium">{draft.buyer.name || "Kunde"}</p>
                {draft.buyer.strasse && <p>{draft.buyer.strasse}</p>}
                {draft.buyer.plzOrt && <p>{draft.buyer.plzOrt}</p>}
                {draft.buyer.ustIdnr && <p>USt-IdNr: {draft.buyer.ustIdnr}</p>}
              </div>

              <table className="mt-6 w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-200 text-left text-slate-500">
                    <th className="py-2 pr-2 font-medium">Beschreibung</th>
                    <th className="w-10 py-2 text-right font-medium sm:w-12">
                      Menge
                    </th>
                    <th className="w-16 py-2 text-right font-medium sm:w-24">
                      Einzelpreis
                    </th>
                    <th className="w-16 py-2 text-right font-medium sm:w-24">
                      Betrag
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {draft.items.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-slate-100 text-slate-800"
                    >
                      <td className="py-2 pr-2">
                        {item.beschreibung || "–"}
                      </td>
                      <td className="py-2 text-right">{item.menge || "0"}</td>
                      <td className="py-2 text-right">
                        {formatEuro(parseGermanNumber(item.einzelpreis))}
                      </td>
                      <td className="py-2 text-right">
                        {formatEuro(lineTotal(item))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-5 ml-auto w-full max-w-xs space-y-1.5 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700">
                <div className="flex justify-between">
                  <span>Zwischensumme (netto)</span>
                  <span className="font-medium">
                    {formatEuro(totals.zwischensumme)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{taxLabel}</span>
                  <span className="font-medium">
                    {formatEuro(totals.steuerbetrag)}
                  </span>
                </div>
                <div className="flex justify-between border-t-2 border-teal-700 pt-2 text-base font-bold text-slate-900">
                  <span>Gesamtbetrag (brutto)</span>
                  <span>{formatEuro(totals.gesamtbetrag)}</span>
                </div>
              </div>

              {draft.taxRate === "0" && (
                <p className="mt-4 text-sm text-slate-600">
                  Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.
                </p>
              )}

              {draft.hinweise && (
                <p className="mt-6 text-sm break-words whitespace-pre-line text-slate-700">
                  {draft.hinweise}
                </p>
              )}

              {(draft.seller.iban || draft.seller.bankname) && (
                <p className="mt-4 text-sm break-words text-slate-700">
                  Bankverbindung: {draft.seller.bankname}
                  {draft.seller.bankname && draft.seller.iban ? " – " : ""}
                  {draft.seller.iban}
                </p>
              )}
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-slate-500">
            Die Vorschau aktualisiert sich automatisch bei jeder Eingabe.
          </p>
        </div>
      </div>
    </div>
  );
}
