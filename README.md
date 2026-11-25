# Rechnungsgenerator – German Invoice Generator

Kostenloser, deutscher Rechnungsgenerator als Single-Page-Tool-Website.
Alle Berechnungen laufen im Browser – es wird nichts hochgeladen.

## Keyword-Ziele (SEMrush, 24. Nov. 2026 – exakt so platziert)

| Keyword | Volumen | KD | CPC | Platzierung |
| --- | --- | --- | --- | --- |
| erstellung rechnung (primär) | 590 | 10 % | $4,28 | Title (52 Zeichen), H2 „Erstellung Rechnung in 3 Schritten“, Intro |
| rechnungen kostenlos erstellen (sekundär) | 320 | 9 % | $7,33 | Meta-Description, Intro, FAQ 1 (Frage) |
| rechnung für kleinunternehmer vorlage | 590 | 12 % | $2,73 | FAQ 8 (Frage + Antwort) |
| freiberufler rechnung vorlage | 260 | 11 % | $2,56 | FAQ 3 (Frage) |
| rechnung freiberufler vorlage | 260 | 12 % | $2,45 | Abschnitt „Rechnung als Freiberufler“ |
| einnahmen überschuss rechnung excel vorlage | 210 | 4 % | $4,12 | FAQ 9 (Frage) |
| mahnung rechnung vorlage | 210 | 10 % | $1,12 | FAQ 10 (Frage) |
| vorlage rechnung word kleinunternehmer | 210 | 13 % | $1,68 | FAQ 11 (Frage + Antwort) |
| einnahmen überschuss rechnung vorlage excel | 170 | 12 % | $3,95 | FAQ 9 (Antwort) |
| rechnung mahnung vorlage | 170 | 10 % | $1,10 | FAQ 10 (Antwort) |
| freelancer rechnung vorlage | 140 | 10 % | $3,64 | FAQ 3 (Antwort) |
| qr code für rechnungen erstellen | 110 | 9 % | $2,43 | FAQ 12 (Frage + Antwort, EPC/SEPA-QR) |

Alle 12 FAQ-Antworten sind 40–60 Wörter lang und stimmen exakt mit dem
FAQPage-JSON-LD überein. „lebenslauf vorlage“ und andere Nicht-Rechnungs-
Keywords werden bewusst NICHT targetiert.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS 4
- Statischer Export (`output: 'export'` in `next.config.ts`) – deploybar
  überall (Vercel, Cloudflare Pages, Netlify, statisches Hosting)
- Keine externen Fonts (System-Font-Stack), kein AdSense, kein Analytics
- Tests: Vitest (Unit-Tests für die Rechnungs-Mathematik)

## Lokal starten

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # Vitest, 9 Tests
npm run build      # statischer Export nach out/
```

Produktions-Build lokal prüfen:

```bash
npm run build
npx serve out     # oder: python3 -m http.server --directory out 8000
```

## Seiten

- `/` – Rechnungsgenerator (Tool + Inhalte + 12 FAQs)
- `/impressum` – Impressum (§ 5 DDG, Platzhalter – siehe Launch-Checkliste)
- `/datenschutz` – Datenschutzerklärung
- `/kontakt` – Kontaktformular (mailto, kein Backend)
- `/sitemap.xml` und `/robots.txt` werden beim Build erzeugt

## Entscheidungen

- Kein Canonical-Tag, bis eine echte Domain gewählt ist.
- `SITE_URL` in `lib/site.ts` steht auf `https://example.com` (Platzhalter,
  nur für Sitemap/Robots nötig) – vor dem Launch ersetzen.
- Das Tool speichert den Entwurf in `localStorage`; das Logo wird nur als
  Data-URL im Browser gelesen und nie persistiert.
- PDF-Download läuft über `window.print()` + Print-CSS (nur die Rechnung
  wird gedruckt).
- Drucken, 360-px-Layout und Steuer-Hinweise: „Allgemeine Informationen,
  keine Steuer- oder Rechtsberatung.“

## Launch-Checkliste

- [ ] Domain wählen und kaufen
- [ ] `SITE_URL` in `lib/site.ts` auf die echte Domain setzen
- [ ] Impressum: alle `[…]`-Platzhalter durch echte Angaben ersetzen
- [ ] Kontakt: echte E-Mail-Adresse in `lib/site.ts` (`KONTAKT_EMAIL`) setzen
- [ ] Sitemap bei Google Search Console einreichen
- [ ] Impressum/Datenschutz von einem Steuerberater/Anwalt prüfen lassen
- [ ] AdSense erst nach Traffic (später)
