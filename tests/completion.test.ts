import { describe, it, expect } from "vitest";
import { calculateCompletionPercentage } from "../src/utils/completion";
import { LISTING_FIELDS } from "../src/constants/listing";

describe("calculateCompletionPercentage", () => {
  it("should return 0 for empty listing with no photos", () => {
    const result = calculateCompletionPercentage({}, 0);
    expect(result).toBe(0);
  });

  it("should return 100 for fully filled listing with photos", () => {
    const fieldValues: Record<string, unknown> = {};
    for (const field of LISTING_FIELDS) {
      fieldValues[field.fieldName] = "some-value";
    }
    const result = calculateCompletionPercentage(fieldValues, 5);
    expect(result).toBe(100);
  });

  it("should count only known listing fields", () => {
    const result = calculateCompletionPercentage({ unknownField: "value", anotherUnknown: 123 }, 0);
    expect(result).toBe(0);
  });

  it("should not count null or empty string values", () => {
    const result = calculateCompletionPercentage({ make: null, model: "", year: "2022" }, 0);
    // 1 filled field (year) out of LISTING_FIELDS.length + 1
    const expected = Math.round((1 / (LISTING_FIELDS.length + 1)) * 100);
    expect(result).toBe(expected);
  });

  it("should not count 0 as a filled value", () => {
    const result = calculateCompletionPercentage({ price: 0 }, 0);
    expect(result).toBe(0);
  });

  it("should count non-zero numbers as filled", () => {
    const result = calculateCompletionPercentage({ price: 15000 }, 0);
    const expected = Math.round((1 / (LISTING_FIELDS.length + 1)) * 100);
    expect(result).toBe(expected);
  });

  it("should add 1 point when at least 1 photo exists", () => {
    const noPhotos = calculateCompletionPercentage({}, 0);
    const withPhotos = calculateCompletionPercentage({}, 1);
    expect(withPhotos).toBeGreaterThan(noPhotos);
    // 1 photo point out of totalPossible
    expect(withPhotos).toBe(Math.round((1 / (LISTING_FIELDS.length + 1)) * 100));
  });

  it("should not give extra points for multiple photos beyond 1", () => {
    const onePhoto = calculateCompletionPercentage({}, 1);
    const manyPhotos = calculateCompletionPercentage({}, 20);
    expect(manyPhotos).toBe(onePhoto);
  });

  it("should handle partial fill correctly", () => {
    // Fill 5 fields + 1 photo
    const fieldValues: Record<string, unknown> = {
      make: "Renault",
      model: "Clio",
      year: 2022,
      price: 15000,
      mileage: 50000,
    };
    const result = calculateCompletionPercentage(fieldValues, 3);
    // 5 fields + 1 photo point = 6 out of LISTING_FIELDS.length + 1
    const expected = Math.round((6 / (LISTING_FIELDS.length + 1)) * 100);
    expect(result).toBe(expected);
  });

  it("should round to nearest integer", () => {
    const result = calculateCompletionPercentage({ make: "Renault" }, 0);
    expect(Number.isInteger(result)).toBe(true);
  });
});
