import { describe, it, expect } from "vitest";
import {
  profileUpdateInputSchema,
  siretSchema,
  validateSirenLuhn,
} from "../src/validators/profile.validator";

describe("validateSirenLuhn", () => {
  it("should return true for valid SIREN (443061841)", () => {
    expect(validateSirenLuhn("443061841")).toBe(true);
  });

  it("should return false for invalid SIREN", () => {
    expect(validateSirenLuhn("123456789")).toBe(false);
  });

  it("should return false for wrong length", () => {
    expect(validateSirenLuhn("12345")).toBe(false);
    expect(validateSirenLuhn("1234567890")).toBe(false);
  });
});

describe("siretSchema", () => {
  it("should accept valid SIRET (443061841 + NIC)", () => {
    const result = siretSchema.safeParse("44306184100015");
    expect(result.success).toBe(true);
  });

  it("should reject non-14-digit string", () => {
    const result = siretSchema.safeParse("1234");
    expect(result.success).toBe(false);
  });

  it("should reject SIRET with invalid SIREN Luhn", () => {
    const result = siretSchema.safeParse("12345678901234");
    expect(result.success).toBe(false);
  });

  it("should reject alphabetic characters", () => {
    const result = siretSchema.safeParse("abcdefghijklmn");
    expect(result.success).toBe(false);
  });
});

describe("profileUpdateInputSchema", () => {
  it("should accept valid profile update", () => {
    const result = profileUpdateInputSchema.safeParse({
      displayName: "Marie Dupont",
      phone: "+33612345678",
      bio: "Vendeuse professionnelle",
    });
    expect(result.success).toBe(true);
  });

  it("should accept empty object (all fields optional)", () => {
    const result = profileUpdateInputSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  it("should reject phone with invalid format", () => {
    const result = profileUpdateInputSchema.safeParse({
      phone: "not-a-phone!!",
    });
    expect(result.success).toBe(false);
  });

  it("should reject bio exceeding 500 chars", () => {
    const result = profileUpdateInputSchema.safeParse({
      bio: "x".repeat(501),
    });
    expect(result.success).toBe(false);
  });

  it("should accept empty string for optional fields", () => {
    const result = profileUpdateInputSchema.safeParse({
      phone: "",
      addressCity: "",
      bio: "",
    });
    expect(result.success).toBe(true);
  });

  it("should reject invalid avatar URL", () => {
    const result = profileUpdateInputSchema.safeParse({
      avatarUrl: "not-a-url",
    });
    expect(result.success).toBe(false);
  });

  it("should accept valid avatar URL", () => {
    const result = profileUpdateInputSchema.safeParse({
      avatarUrl: "https://example.com/avatar.jpg",
    });
    expect(result.success).toBe(true);
  });

  it("should reject postal code with invalid format", () => {
    const result = profileUpdateInputSchema.safeParse({
      addressPostalCode: "abc!!",
    });
    expect(result.success).toBe(false);
  });

  it("should accept valid French postal code", () => {
    const result = profileUpdateInputSchema.safeParse({
      addressPostalCode: "75001",
    });
    expect(result.success).toBe(true);
  });

  it("should validate SIRET when provided", () => {
    const result = profileUpdateInputSchema.safeParse({
      siret: "12345678901234", // fails Luhn
    });
    expect(result.success).toBe(false);
  });

  it("should accept valid SIRET", () => {
    const result = profileUpdateInputSchema.safeParse({
      siret: "44306184100015",
    });
    expect(result.success).toBe(true);
  });
});
