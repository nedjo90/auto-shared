/**
 * Replace {{placeholder}} tokens with values from a data object.
 * Unreplaced tokens are removed (replaced with empty string).
 */
export function renderSeoTemplate(template: string, data: Record<string, string>): string {
  if (!template) return "";
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => data[key] ?? "");
}

/**
 * Remove diacritics/accents from a string.
 */
function removeDiacritics(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/**
 * Generate a semantic URL slug from listing data.
 * Format: {brand}-{model}-{year}-{city}-{id}
 * Lowercase, diacritics removed, spaces to hyphens, special chars removed.
 */
export function generateListingSlug(listing: {
  ID: string;
  make?: string | null;
  model?: string | null;
  year?: number | null;
  city?: string | null;
}): string {
  const parts = [
    listing.make,
    listing.model,
    listing.year != null ? String(listing.year) : null,
    listing.city,
    listing.ID,
  ];

  return parts
    .filter((p): p is string => p != null && p !== "")
    .map((p) => removeDiacritics(p).toLowerCase().trim())
    .map((p) => p.replace(/[^a-z0-9]+/g, "-"))
    .map((p) => p.replace(/^-+|-+$/g, ""))
    .filter((p) => p.length > 0)
    .join("-");
}

/**
 * Extract listing ID (UUID) from a semantic slug.
 * The UUID is the last 5 hyphen-separated segments (8-4-4-4-12).
 */
export function extractIdFromSlug(slug: string): string | null {
  if (!slug) return null;
  const parts = slug.split("-");
  if (parts.length >= 5) {
    const last5 = parts.slice(-5).join("-");
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(last5)) {
      return last5;
    }
  }
  return parts[parts.length - 1] || null;
}
