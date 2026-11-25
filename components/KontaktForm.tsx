"use client";

import { useState } from "react";
import { KONTAKT_EMAIL } from "@/lib/site";

const inputClass =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600";

export default function KontaktForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nachricht, setNachricht] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const subject = encodeURIComponent(
      `Anfrage Rechnungsgenerator von ${name || "einem Besucher"}`,
    );
    const body = encodeURIComponent(
      `Name: ${name}\nE-Mail: ${email}\n\n${nachricht}`,
    );
    window.location.href = `mailto:${KONTAKT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-slate-700">
          Name
        </span>
        <input
          type="text"
          required
          className={inputClass}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-slate-700">
          E-Mail
        </span>
        <input
          type="email"
          required
          className={inputClass}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-slate-700">
          Nachricht
        </span>
        <textarea
          rows={6}
          required
          className={inputClass}
          value={nachricht}
          onChange={(e) => setNachricht(e.target.value)}
        />
      </label>
      <button
        type="submit"
        className="rounded-md bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
      >
        E-Mail-Programm öffnen
      </button>
    </form>
  );
}
