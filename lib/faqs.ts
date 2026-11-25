export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "Kann ich Rechnungen kostenlos erstellen?",
    answer:
      "Ja. Mit diesem Rechnungsgenerator erstellen Sie Rechnungen kostenlos, ohne Anmeldung und ohne Abo. Sie geben Ihre Daten und Positionen ein, prüfen die Vorschau und laden die Rechnung als PDF herunter. Alle Berechnungen laufen direkt in Ihrem Browser, und es gibt keine Begrenzung der Anzahl Ihrer Rechnungen.",
  },
  {
    question: "Was ist eine Rechnung für Kleinunternehmer?",
    answer:
      "Eine Rechnung für Kleinunternehmer ist eine Rechnung ohne ausgewiesene Umsatzsteuer. Kleinunternehmer nach § 19 UStG berechnen keine Umsatzsteuer und weisen sie auch nicht aus. Stattdessen steht auf der Rechnung der Hinweis, dass gemäß § 19 UStG keine Umsatzsteuer berechnet wird. Wählen Sie im Generator einfach die Option 0 % Kleinunternehmer.",
  },
  {
    question: "Gibt es eine Freiberufler Rechnung Vorlage?",
    answer:
      "Nein, eine feste Vorlage ist nicht nötig. Als Freiberufler müssen Sie nur die gesetzlichen Pflichtangaben auf Ihre Rechnung schreiben. Dieser Generator ersetzt die Vorlage: Daten eintragen, Leistungen hinzufügen, Rechnung als PDF erhalten. Ihre Angaben werden im Browser gespeichert und stehen beim nächsten Mal wieder bereit. Auch als Freelancer brauchen Sie keine separate Freelancer Rechnung Vorlage.",
  },
  {
    question: "Was muss auf einer Rechnung stehen?",
    answer:
      "Nach § 14 UStG gehören auf eine Rechnung: vollständiger Name und Anschrift von Verkäufer und Käufer, Steuernummer oder USt-IdNr, eine fortlaufende Rechnungsnummer, das Ausstellungsdatum, der Zeitpunkt der Leistung, Menge und Art der Leistung, das Entgelt netto, der Steuersatz mit Steuerbetrag und der Gesamtbetrag. Alle diese Felder finden Sie in diesem Generator.",
  },
  {
    question: "Wie lange muss ich Rechnungen aufbewahren?",
    answer:
      "Rechnungen müssen in Deutschland zehn Jahre aufbewahrt werden. Die Aufbewahrungspflicht gilt für ausgestellte und erhaltene Rechnungen und beginnt mit dem Ende des Kalenderjahres, in dem die Rechnung erstellt wurde. Bewahren Sie Ihre Rechnungen daher als PDF oder Ausdruck sicher auf, damit Sie sie bei einer Prüfung vorlegen können.",
  },
  {
    question: "Muss ich Umsatzsteuer auf der Rechnung ausweisen?",
    answer:
      "Ja, in der Regel weisen Sie auf einer Rechnung die Umsatzsteuer aus – meist 19 Prozent, für bestimmte Leistungen 7 Prozent. Der Generator berechnet den Steuerbetrag automatisch aus Ihren Positionen. Nur Kleinunternehmer nach § 19 UStG weisen keine Umsatzsteuer aus und schreiben stattdessen den entsprechenden Hinweis auf die Rechnung.",
  },
  {
    question: "Kann ich mein Logo auf die Rechnung setzen?",
    answer:
      "Ja. Sie können Ihr Logo als Bilddatei hochladen, und es erscheint oben auf Ihrer Rechnung in der Vorschau und im PDF. Das Bild wird nur in Ihrem Browser verarbeitet und niemals hochgeladen oder gespeichert. So wirkt Ihre Rechnung professionell und Ihre Kunden erkennen Ihr Unternehmen sofort wieder.",
  },
  {
    question: "Wo finde ich eine Rechnung für Kleinunternehmer Vorlage?",
    answer:
      "Hier – eine Rechnung für Kleinunternehmer Vorlage brauchen Sie nicht herunterzuladen. Tragen Sie einfach Ihre Daten in den Generator ein und wählen Sie die Option 0 % Kleinunternehmer nach § 19 UStG. Die fertige Rechnung enthält automatisch den richtigen Hinweis und steht als PDF bereit. Ihre Angaben bleiben für die nächste Rechnung im Browser gespeichert.",
  },
  {
    question: "Gibt es eine Einnahmen Überschuss Rechnung Excel Vorlage?",
    answer:
      "Nein, dieser Generator erstellt Rechnungen als PDF und keine Excel-Vorlage für die Einnahmen-Überschuss-Rechnung. Die Einnahmen-Überschuss-Rechnung ist die Gewinnermittlung für Ihre Steuererklärung, für die Sie Ihre Rechnungen als Belege sammeln. Eine Einnahmen Überschuss Rechnung Vorlage Excel erhalten Sie zum Beispiel bei Ihrem Steuerberater oder als Formular des Finanzamts.",
  },
  {
    question: "Gibt es auch eine Mahnung Rechnung Vorlage?",
    answer:
      "Nein, der Generator erstellt nur Rechnungen und keine Mahnungen. Wenn ein Kunde nach Ablauf der Zahlungsfrist nicht zahlt, schreiben Sie eine Mahnung mit Rechnungsnummer, offenem Betrag und neuem Zahlungsziel. Eine Rechnung Mahnung Vorlage ist dafür nicht nötig – ein kurzes Schreiben mit diesen Angaben genügt in der Regel völlig.",
  },
  {
    question: "Gibt es eine Vorlage Rechnung Word Kleinunternehmer?",
    answer:
      "Nein, eine Word-Vorlage brauchen Sie nicht. Dieser Generator ersetzt die Vorlage Rechnung Word Kleinunternehmer vollständig: Sie geben Ihre Daten einmal ein, wählen die Kleinunternehmer-Option nach § 19 UStG und laden die fertige Rechnung als PDF herunter. Ihre Angaben bleiben im Browser gespeichert und stehen bei der nächsten Rechnung sofort wieder bereit.",
  },
  {
    question: "Kann ich einen QR Code für Rechnungen erstellen?",
    answer:
      "Der Generator erstellt aktuell keinen QR-Code. Ein QR Code für Rechnungen ist meist ein EPC-QR-Code, auch GiroCode genannt: Er enthält IBAN, Betrag und Verwendungszweck, und der Kunde scannt ihn mit seiner Banking-App, statt die Daten abzutippen. Ihre Bank oder ein kostenloser EPC-Generator im Internet kann einen solchen Code für Sie erzeugen.",
  },
];
