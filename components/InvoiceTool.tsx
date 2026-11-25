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
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600";
const labelClass = "block text-sm font-medium text-slate-700 mb-1";
const sectionTitleClass = "text-base font-semibold text-slate-900 mb-3";

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
    <label className="block">
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
    <div className="grid gap-6 lg:grid-cols-2">
      {/* ---------- Formular ---------- */}
      <div className="space-y-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <p className="text-sm text-slate-600">
          Alle Daten bleiben in Ihrem Browser – nichts wird hochgeladen oder
          gespeichert.
        </p>

        <section>
          <h3 className={sectionTitleClass}>Ihre Angaben (Verkäufer)</h3>
          <div className="grid gap-3 sm:grid-cols-2">
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

        <section>
          <h3 className={sectionTitleClass}>Kunde (Rechnungsempfänger)</h3>
          <div className="grid gap-3 sm:grid-cols-2">
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

        <section>
          <h3 className={sectionTitleClass}>Rechnungsdaten</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              label="Rechnungsnummer"
              value={draft.rechnungsnummer}
              onChange={(v) => setDraft((d) => ({ ...d, rechnungsnummer: v }))}
            />
            <Field
              label="Rechnungsdatum"
              type="date"
              value={draft.rechnungsdatum}
              onChange={(v) => setDraft((d) => ({ ...d, rechnungsdatum: v }))}
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
              onChange={(v) => setDraft((d) => ({ ...d, leistungsdatum: v }))}
              placeholder="z. B. November 2026"
            />
          </div>
        </section>

        <section>
          <h3 className={sectionTitleClass}>Positionen</h3>
          <div className="space-y-3">
            {draft.items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_5rem_7rem_7rem_2rem]"
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
                <div>
                  <span className={labelClass}>Betrag</span>
                  <div className="rounded-md bg-slate-100 px-2 py-2 text-right text-sm font-medium text-slate-800">
                    {formatEuro(lineTotal(item))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  aria-label="Position entfernen"
                  className="mb-0.5 rounded-md border border-slate-300 px-2 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addItem}
            className="mt-3 rounded-md border border-teal-700 px-4 py-2 text-sm font-medium text-teal-700 hover:bg-teal-50"
          >
            + Position hinzufügen
          </button>
        </section>

        <section>
          <h3 className={sectionTitleClass}>Umsatzsteuer</h3>
          <div className="space-y-2">
            {(
              [
                ["19", "19 % MwSt (Standard)"],
                ["7", "7 % MwSt (ermäßigt)"],
                [
                  "0",
                  "0 % Kleinunternehmer nach § 19 UStG",
                ],
              ] as [TaxRate, string][]
            ).map(([value, label]) => (
              <label key={value} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="taxRate"
                  value={value}
                  checked={draft.taxRate === value}
                  onChange={() =>
                    setDraft((d) => ({ ...d, taxRate: value }))
                  }
                  className="accent-teal-700"
                />
                {label}
              </label>
            ))}
          </div>
          {draft.taxRate === "0" && (
            <p className="mt-2 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800">
              Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.
            </p>
          )}
        </section>

        <section>
          <h3 className={sectionTitleClass}>Logo (optional)</h3>
          <input
            type="file"
            accept="image/*"
            className="text-sm text-slate-700"
            onChange={(e) => handleLogo(e.target.files?.[0])}
          />
          {logo && (
            <button
              type="button"
              onClick={() => setLogo(null)}
              className="ml-3 text-sm text-red-600 underline"
            >
              Logo entfernen
            </button>
          )}
          <p className="mt-1 text-xs text-slate-500">
            Das Logo wird nur in Ihrem Browser gelesen und nicht hochgeladen.
          </p>
        </section>

        <section>
          <label className="block">
            <span className={labelClass}>
              Hinweise / Zahlungsbedingungen
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

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-md bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
          >
            Als PDF herunterladen
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="rounded-md border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Neue Rechnung
          </button>
        </div>
      </div>

      {/* ---------- Vorschau ---------- */}
      <div>
        <div className="lg:sticky lg:top-4">
          <h3 className="mb-3 text-base font-semibold text-slate-900">
            Vorschau
          </h3>
          <div
            id="invoice-print"
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm leading-relaxed text-slate-700">
                <p className="font-semibold text-slate-900">
                  {draft.seller.firmenname || "Ihr Firmenname"}
                </p>
                {draft.seller.strasse && <p>{draft.seller.strasse}</p>}
                {draft.seller.plzOrt && <p>{draft.seller.plzOrt}</p>}
                {draft.seller.email && <p>{draft.seller.email}</p>}
                {draft.seller.telefon && <p>{draft.seller.telefon}</p>}
                {draft.seller.steuernummer && (
                  <p>Steuernummer / USt-IdNr: {draft.seller.steuernummer}</p>
                )}
              </div>
              {logo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logo}
                  alt="Firmenlogo"
                  className="max-h-20 max-w-40 object-contain"
                />
              )}
            </div>

            <h2 className="mt-8 text-2xl font-bold text-slate-900">
              RECHNUNG
            </h2>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-slate-700">
              <p>Rechnungsnummer</p>
              <p className="font-medium">{draft.rechnungsnummer}</p>
              <p>Rechnungsdatum</p>
              <p>{formatGermanDate(draft.rechnungsdatum)}</p>
              <p>Fälligkeitsdatum</p>
              <p>{formatGermanDate(draft.faelligkeit)}</p>
              {draft.leistungsdatum && (
                <>
                  <p>Leistungsdatum</p>
                  <p>{draft.leistungsdatum}</p>
                </>
              )}
            </div>

            <div className="mt-6 text-sm leading-relaxed text-slate-700">
              <p className="font-semibold text-slate-900">Rechnungsempfänger</p>
              <p className="font-medium">{draft.buyer.name || "Kunde"}</p>
              {draft.buyer.strasse && <p>{draft.buyer.strasse}</p>}
              {draft.buyer.plzOrt && <p>{draft.buyer.plzOrt}</p>}
              {draft.buyer.ustIdnr && <p>USt-IdNr: {draft.buyer.ustIdnr}</p>}
            </div>

            <table className="mt-6 w-full text-sm">
              <thead>
                <tr className="border-b border-slate-300 text-left text-slate-600">
                  <th className="py-2 pr-2 font-medium">Beschreibung</th>
                  <th className="w-12 py-2 text-right font-medium">Menge</th>
                  <th className="w-24 py-2 text-right font-medium">
                    Einzelpreis
                  </th>
                  <th className="w-24 py-2 text-right font-medium">Betrag</th>
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

            <div className="mt-4 ml-auto w-full max-w-xs space-y-1 text-sm text-slate-700">
              <div className="flex justify-between">
                <span>Zwischensumme (netto)</span>
                <span>{formatEuro(totals.zwischensumme)}</span>
              </div>
              <div className="flex justify-between">
                <span>{taxLabel}</span>
                <span>{formatEuro(totals.steuerbetrag)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-300 pt-2 text-base font-bold text-slate-900">
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
              <p className="mt-6 text-sm whitespace-pre-line text-slate-700">
                {draft.hinweise}
              </p>
            )}

            {(draft.seller.iban || draft.seller.bankname) && (
              <p className="mt-4 text-sm text-slate-700">
                Bankverbindung: {draft.seller.bankname}
                {draft.seller.bankname && draft.seller.iban ? " – " : ""}
                {draft.seller.iban}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
