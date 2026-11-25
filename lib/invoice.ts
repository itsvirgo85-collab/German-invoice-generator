export type TaxRate = "19" | "7" | "0";

export interface LineItem {
  id: string;
  beschreibung: string;
  menge: string;
  einzelpreis: string;
}

export interface InvoiceTotals {
  zwischensumme: number;
  steuerbetrag: number;
  gesamtbetrag: number;
}

/** Runden auf volle Cent (kaufmännisch). */
export function roundToCents(value: number): number {
  return Math.round(value * 100) / 100;
}

/** Deutsche Zahlen parsen: Komma als Dezimaltrennzeichen akzeptieren. */
export function parseGermanNumber(value: string): number {
  const normalized = value.trim().replace(/\./g, "").replace(",", ".");
  const parsed = parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function lineTotal(item: LineItem): number {
  return roundToCents(
    parseGermanNumber(item.menge) * parseGermanNumber(item.einzelpreis),
  );
}

export function taxRateValue(rate: TaxRate): number {
  if (rate === "19") return 0.19;
  if (rate === "7") return 0.07;
  return 0;
}

export function computeTotals(
  items: LineItem[],
  taxRate: TaxRate,
): InvoiceTotals {
  const zwischensumme = roundToCents(
    items.reduce((sum, item) => sum + lineTotal(item), 0),
  );
  const steuerbetrag = roundToCents(zwischensumme * taxRateValue(taxRate));
  const gesamtbetrag = roundToCents(zwischensumme + steuerbetrag);
  return { zwischensumme, steuerbetrag, gesamtbetrag };
}

export function formatEuro(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

/** Datum als lokales YYYY-MM-DD (für <input type="date">). */
export function toInputDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function addDays(date: Date, days: number): Date {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

/** Deutsches Datumsformat, z. B. 25.11.2026. */
export function formatGermanDate(isoDate: string): string {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return isoDate;
  return `${day}.${month}.${year}`;
}

export function newLineItem(): LineItem {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    beschreibung: "",
    menge: "1",
    einzelpreis: "",
  };
}
