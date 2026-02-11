import type { SeoPageType } from "../types/config.js";

/** Available SEO page types. */
export const SEO_PAGE_TYPES: readonly SeoPageType[] = [
  "listing_detail",
  "search_results",
  "brand_page",
  "model_page",
  "city_page",
  "landing_page",
] as const;

/** Available placeholders per page type. */
export const SEO_PLACEHOLDERS: Record<SeoPageType, readonly string[]> = {
  listing_detail: ["brand", "model", "year", "price", "city", "mileage", "fuel", "id"],
  search_results: ["query", "count", "city", "brand"],
  brand_page: ["brand", "count"],
  model_page: ["brand", "model", "count"],
  city_page: ["city", "count"],
  landing_page: ["title"],
} as const;

/** Sample data per page type for SEO preview rendering. */
export const SEO_SAMPLE_DATA: Record<SeoPageType, Record<string, string>> = {
  listing_detail: {
    brand: "Peugeot",
    model: "308",
    year: "2020",
    price: "15000",
    city: "Paris",
    mileage: "45000",
    fuel: "Diesel",
    id: "abc123",
  },
  search_results: {
    query: "SUV diesel",
    count: "142",
    city: "Lyon",
    brand: "Renault",
  },
  brand_page: {
    brand: "Peugeot",
    count: "234",
  },
  model_page: {
    brand: "Peugeot",
    model: "308",
    count: "87",
  },
  city_page: {
    city: "Paris",
    count: "1250",
  },
  landing_page: {
    title: "Vehicules d'occasion certifies",
  },
} as const;

/** Maximum recommended character lengths for SEO fields. */
export const SEO_CHAR_LIMITS = {
  metaTitle: 60,
  metaDescription: 160,
} as const;

/**
 * Replace {{placeholder}} tokens with values from a data object.
 * Unreplaced tokens are removed (replaced with empty string).
 */
export function renderSeoTemplate(template: string, data: Record<string, string>): string {
  if (!template) return "";
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => data[key] ?? "");
}
