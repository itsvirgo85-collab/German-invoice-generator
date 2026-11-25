import { describe, expect, it } from "vitest";
import {
  computeTotals,
  formatEuro,
  lineTotal,
  parseGermanNumber,
  type LineItem,
} from "./invoice";

function item(
  beschreibung: string,
  menge: string,
  einzelpreis: string,
): LineItem {
  return { id: "test", beschreibung, menge, einzelpreis };
}

describe("Rechnungs-Mathematik", () => {
  it("einzelner Posten: 100 € netto bei 19 % = 119 € brutto", () => {
    const totals = computeTotals([item("Beratung", "1", "100")], "19");
    expect(totals.zwischensumme).toBe(100);
    expect(totals.steuerbetrag).toBe(19);
    expect(totals.gesamtbetrag).toBe(119);
  });

  it("7 % MwSt: 200 € netto = 214 € brutto", () => {
    const totals = computeTotals([item("Buch", "2", "100")], "7");
    expect(totals.zwischensumme).toBe(200);
    expect(totals.steuerbetrag).toBe(14);
    expect(totals.gesamtbetrag).toBe(214);
  });

  it("0 % Kleinunternehmer: keine Umsatzsteuer", () => {
    const totals = computeTotals([item("Design", "1", "250")], "0");
    expect(totals.zwischensumme).toBe(250);
    expect(totals.steuerbetrag).toBe(0);
    expect(totals.gesamtbetrag).toBe(250);
  });

  it("mehrere Posten werden korrekt summiert", () => {
    const totals = computeTotals(
      [
        item("Position A", "2", "50"),
        item("Position B", "3", "20"),
        item("Position C", "1", "15,50"),
      ],
      "19",
    );
    // Netto: 100 + 60 + 15,50 = 175,50; Steuer: 33,35; Brutto: 208,85
    expect(totals.zwischensumme).toBe(175.5);
    expect(totals.steuerbetrag).toBe(33.35);
    expect(totals.gesamtbetrag).toBe(208.85);
  });

  it("keine Posten = 0 € Gesamtbetrag", () => {
    const totals = computeTotals([], "19");
    expect(totals.zwischensumme).toBe(0);
    expect(totals.steuerbetrag).toBe(0);
    expect(totals.gesamtbetrag).toBe(0);
  });

  it("Rundung: 19 % auf 33,33 € = 6,33 € Steuer, 39,66 € brutto", () => {
    const totals = computeTotals([item("Kleinbetrag", "1", "33,33")], "19");
    expect(totals.zwischensumme).toBe(33.33);
    expect(totals.steuerbetrag).toBe(6.33);
    expect(totals.gesamtbetrag).toBe(39.66);
  });

  it("Menge wird multipliziert und auf Cent gerundet", () => {
    expect(lineTotal(item("Stunden", "2,5", "80"))).toBe(200);
    expect(lineTotal(item("Stunden", "3", "19,99"))).toBe(59.97);
  });

  it("deutsche Zahlen mit Komma werden korrekt gelesen", () => {
    expect(parseGermanNumber("1.234,56")).toBe(1234.56);
    expect(parseGermanNumber("33,33")).toBe(33.33);
    expect(parseGermanNumber("")).toBe(0);
    expect(parseGermanNumber("abc")).toBe(0);
  });

  it("Euro-Formatierung im deutschen Format", () => {
    expect(formatEuro(1234.56)).toBe("1.234,56\u00a0€");
    expect(formatEuro(119)).toBe("119,00\u00a0€");
  });
});
