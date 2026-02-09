import { describe, it, expect } from "vitest";
import {
  ANONYMIZATION_FIELDS,
  EXPORT_SECTIONS,
  ANONYMIZATION_CONFIRMATION_WORD,
} from "../src/constants/rgpd";

describe("RGPD Constants", () => {
  it("should export ANONYMIZATION_FIELDS with all expected fields", () => {
    expect(ANONYMIZATION_FIELDS).toContain("firstName");
    expect(ANONYMIZATION_FIELDS).toContain("lastName");
    expect(ANONYMIZATION_FIELDS).toContain("email");
    expect(ANONYMIZATION_FIELDS).toContain("phone");
    expect(ANONYMIZATION_FIELDS).toContain("siret");
    expect(ANONYMIZATION_FIELDS).toContain("avatarUrl");
    expect(ANONYMIZATION_FIELDS).toContain("bio");
    expect(ANONYMIZATION_FIELDS).toContain("displayName");
    expect(ANONYMIZATION_FIELDS.length).toBeGreaterThanOrEqual(14);
  });

  it("should export EXPORT_SECTIONS with all expected sections", () => {
    expect(EXPORT_SECTIONS).toContain("profile");
    expect(EXPORT_SECTIONS).toContain("consents");
    expect(EXPORT_SECTIONS).toContain("listings");
    expect(EXPORT_SECTIONS).toContain("messages");
    expect(EXPORT_SECTIONS).toContain("declarations");
    expect(EXPORT_SECTIONS).toContain("auditTrail");
  });

  it("should export ANONYMIZATION_CONFIRMATION_WORD", () => {
    expect(ANONYMIZATION_CONFIRMATION_WORD).toBe("ANONYMISER");
  });
});

describe("RGPD Types", () => {
  it("should export all RGPD types from shared types index", async () => {
    const types = await import("../src/types/index");
    // Type-only exports verified at compile time; module should load
    expect(types).toBeDefined();
  });

  it("should export RGPD constants from shared constants index", async () => {
    const constants = await import("../src/constants/index");
    expect(constants.ANONYMIZATION_FIELDS).toBeDefined();
    expect(constants.EXPORT_SECTIONS).toBeDefined();
    expect(constants.ANONYMIZATION_CONFIRMATION_WORD).toBeDefined();
  });
});
