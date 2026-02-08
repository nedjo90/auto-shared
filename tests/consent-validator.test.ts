import { describe, it, expect } from "vitest";
import type { IConfigConsentType } from "../src/types/consent.js";
import {
  buildConsentSchema,
  consentInputSchema,
  consentBatchInputSchema,
} from "../src/validators/consent.validator.js";

const mockConsentTypes: IConfigConsentType[] = [
  {
    ID: "ct-1",
    code: "essential_processing",
    labelKey: "consent.essential.label",
    descriptionKey: "consent.essential.description",
    isMandatory: true,
    isActive: true,
    displayOrder: 10,
    version: 1,
    createdAt: "",
    modifiedAt: "",
    createdBy: "",
    modifiedBy: "",
  },
  {
    ID: "ct-2",
    code: "marketing_email",
    labelKey: "consent.marketing.label",
    descriptionKey: "consent.marketing.description",
    isMandatory: false,
    isActive: true,
    displayOrder: 20,
    version: 1,
    createdAt: "",
    modifiedAt: "",
    createdBy: "",
    modifiedBy: "",
  },
];

describe("buildConsentSchema", () => {
  it("should accept valid input with mandatory consent granted", () => {
    const schema = buildConsentSchema(mockConsentTypes);
    const result = schema.safeParse({ "ct-1": true, "ct-2": false });
    expect(result.success).toBe(true);
  });

  it("should reject when mandatory consent is not granted", () => {
    const schema = buildConsentSchema(mockConsentTypes);
    const result = schema.safeParse({ "ct-1": false, "ct-2": true });
    expect(result.success).toBe(false);
  });

  it("should allow omitting optional consent (defaults to false)", () => {
    const schema = buildConsentSchema(mockConsentTypes);
    const result = schema.safeParse({ "ct-1": true });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data["ct-2"]).toBe(false);
    }
  });

  it("should reject omitting mandatory consent", () => {
    const schema = buildConsentSchema(mockConsentTypes);
    const result = schema.safeParse({ "ct-2": true });
    expect(result.success).toBe(false);
  });

  it("should work with empty consent types", () => {
    const schema = buildConsentSchema([]);
    const result = schema.safeParse({});
    expect(result.success).toBe(true);
  });
});

describe("consentInputSchema", () => {
  it("should accept valid granted consent", () => {
    const result = consentInputSchema.safeParse({
      consentTypeId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      decision: "granted",
    });
    expect(result.success).toBe(true);
  });

  it("should accept valid revoked consent", () => {
    const result = consentInputSchema.safeParse({
      consentTypeId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      decision: "revoked",
    });
    expect(result.success).toBe(true);
  });

  it("should reject invalid decision", () => {
    const result = consentInputSchema.safeParse({
      consentTypeId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      decision: "maybe",
    });
    expect(result.success).toBe(false);
  });

  it("should reject invalid UUID", () => {
    const result = consentInputSchema.safeParse({
      consentTypeId: "not-a-uuid",
      decision: "granted",
    });
    expect(result.success).toBe(false);
  });
});

describe("consentBatchInputSchema", () => {
  it("should accept valid batch", () => {
    const result = consentBatchInputSchema.safeParse({
      consents: [
        {
          consentTypeId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          decision: "granted",
        },
        {
          consentTypeId: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
          decision: "revoked",
        },
      ],
    });
    expect(result.success).toBe(true);
  });

  it("should reject empty batch", () => {
    const result = consentBatchInputSchema.safeParse({ consents: [] });
    expect(result.success).toBe(false);
  });

  it("should reject batch with invalid item", () => {
    const result = consentBatchInputSchema.safeParse({
      consents: [
        {
          consentTypeId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          decision: "invalid",
        },
      ],
    });
    expect(result.success).toBe(false);
  });
});
