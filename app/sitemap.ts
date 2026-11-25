import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/impressum", "/datenschutz", "/kontakt"];
  return pages.map((path) => ({
    url: `${SITE_URL}${path === "" ? "/" : path}`,
    lastModified: new Date("2026-11-25"),
    changeFrequency: path === "" ? "monthly" : "yearly",
    priority: path === "" ? 1 : 0.5,
  }));
}
