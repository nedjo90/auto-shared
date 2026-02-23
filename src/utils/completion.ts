import { LISTING_FIELDS } from "../constants/listing.js";

/**
 * Calculate the completion percentage for a listing based on filled fields and photo count.
 *
 * - Counts how many LISTING_FIELDS have a non-null, non-empty value
 * - Adds 1 point if at least 1 photo is present
 * - Returns percentage 0–100
 */
export function calculateCompletionPercentage(
  fieldValues: Record<string, unknown>,
  photoCount: number,
): number {
  let filledCount = 0;

  for (const field of LISTING_FIELDS) {
    const val = fieldValues[field.fieldName];
    if (val != null && val !== "" && val !== 0) {
      filledCount++;
    }
  }

  const photoPoint = photoCount >= 1 ? 1 : 0;
  const totalPossible = LISTING_FIELDS.length + 1; // +1 for at least one photo

  return Math.round(((filledCount + photoPoint) / totalPossible) * 100);
}
