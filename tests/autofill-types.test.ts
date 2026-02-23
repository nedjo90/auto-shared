import { describe, it, expect } from "vitest";
import {
  PLATE_REGEX,
  VIN_REGEX,
  autoFillRequestSchema,
  parseAutoFillResponse,
} from "../src/validators/autofill.validator";
import type { AutoFillResponse, ICertifiedField, IApiCachedData } from "../src/types/autofill";

describe("autofill validators", () => {
  describe("PLATE_REGEX", () => {
    it("should match valid SIV plate format", () => {
      expect(PLATE_REGEX.test("AB-123-CD")).toBe(true);
      expect(PLATE_REGEX.test("ZZ-999-AA")).toBe(true);
    });

    it("should reject invalid plate formats", () => {
      expect(PLATE_REGEX.test("AB123CD")).toBe(false);
      expect(PLATE_REGEX.test("A-123-CD")).toBe(false);
      expect(PLATE_REGEX.test("AB-12-CD")).toBe(false);
      expect(PLATE_REGEX.test("AB-123-C")).toBe(false);
      expect(PLATE_REGEX.test("")).toBe(false);
      expect(PLATE_REGEX.test("ab-123-cd")).toBe(false);
    });
  });

  describe("VIN_REGEX", () => {
    it("should match valid VIN format", () => {
      expect(VIN_REGEX.test("VF1RFB00X56789012")).toBe(true);
      expect(VIN_REGEX.test("WVWZZZ3CZWE123456")).toBe(true);
    });

    it("should reject VIN containing I, O, or Q", () => {
      expect(VIN_REGEX.test("VF1RFB00I56789012")).toBe(false);
      expect(VIN_REGEX.test("VF1RFB00O56789012")).toBe(false);
      expect(VIN_REGEX.test("VF1RFB00Q56789012")).toBe(false);
    });

    it("should reject wrong length VIN", () => {
      expect(VIN_REGEX.test("VF1RFB00X5678901")).toBe(false);
      expect(VIN_REGEX.test("VF1RFB00X567890123")).toBe(false);
      expect(VIN_REGEX.test("")).toBe(false);
    });
  });

  describe("autoFillRequestSchema", () => {
    it("should accept valid plate request", () => {
      const result = autoFillRequestSchema.safeParse({
        identifier: "AB-123-CD",
        identifierType: "plate",
      });
      expect(result.success).toBe(true);
    });

    it("should accept valid VIN request", () => {
      const result = autoFillRequestSchema.safeParse({
        identifier: "VF1RFB00X56789012",
        identifierType: "vin",
      });
      expect(result.success).toBe(true);
    });

    it("should accept case-insensitive plate (normalized internally)", () => {
      const result = autoFillRequestSchema.safeParse({
        identifier: "ab-123-cd",
        identifierType: "plate",
      });
      expect(result.success).toBe(true);
    });

    it("should reject empty identifier", () => {
      const result = autoFillRequestSchema.safeParse({
        identifier: "",
        identifierType: "plate",
      });
      expect(result.success).toBe(false);
    });

    it("should reject invalid identifierType", () => {
      const result = autoFillRequestSchema.safeParse({
        identifier: "AB-123-CD",
        identifierType: "ssn",
      });
      expect(result.success).toBe(false);
    });

    it("should reject invalid plate format", () => {
      const result = autoFillRequestSchema.safeParse({
        identifier: "NOTAPLATE",
        identifierType: "plate",
      });
      expect(result.success).toBe(false);
    });

    it("should reject invalid VIN format (contains I)", () => {
      const result = autoFillRequestSchema.safeParse({
        identifier: "VF1RFB00I56789012",
        identifierType: "vin",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("parseAutoFillResponse", () => {
    it("should parse valid wire format response", () => {
      const wire: AutoFillResponse = {
        fields: JSON.stringify([
          {
            fieldName: "make",
            fieldValue: "Renault",
            source: "SIV",
            sourceTimestamp: "2026-01-01T00:00:00.000Z",
            isCertified: true,
          },
        ]),
        sources: JSON.stringify([
          {
            adapterInterface: "IVehicleLookupAdapter",
            providerKey: "mock",
            status: "success",
            responseTimeMs: 100,
          },
        ]),
      };

      const result = parseAutoFillResponse(wire);
      expect(result.fields).toHaveLength(1);
      expect(result.fields[0].fieldName).toBe("make");
      expect(result.sources).toHaveLength(1);
      expect(result.sources[0].status).toBe("success");
    });

    it("should return empty arrays for empty/undefined fields", () => {
      const result = parseAutoFillResponse({ fields: undefined, sources: undefined });
      expect(result.fields).toEqual([]);
      expect(result.sources).toEqual([]);
    });

    it("should throw on malformed JSON in fields", () => {
      expect(() => parseAutoFillResponse({ fields: "not-json", sources: "[]" })).toThrow();
    });

    it("should throw on malformed field structure", () => {
      const wire = {
        fields: JSON.stringify([{ wrong: "structure" }]),
        sources: "[]",
      };
      expect(() => parseAutoFillResponse(wire)).toThrow();
    });

    it("should throw on invalid source status enum", () => {
      const wire = {
        fields: "[]",
        sources: JSON.stringify([
          {
            adapterInterface: "X",
            providerKey: "y",
            status: "invalid_status",
          },
        ]),
      };
      expect(() => parseAutoFillResponse(wire)).toThrow();
    });

    it("should accept response with optional fields omitted", () => {
      const wire = {
        fields: "[]",
        sources: JSON.stringify([
          {
            adapterInterface: "IVehicleLookupAdapter",
            providerKey: "mock",
            status: "pending",
          },
        ]),
      };

      const result = parseAutoFillResponse(wire);
      expect(result.sources[0].responseTimeMs).toBeUndefined();
      expect(result.sources[0].errorMessage).toBeUndefined();
    });
  });
});

describe("autofill types (structural)", () => {
  it("should construct ICertifiedField with all required fields", () => {
    const field: ICertifiedField = {
      ID: "uuid-1",
      listingId: "listing-1",
      fieldName: "make",
      fieldValue: "Renault",
      source: "SIV",
      sourceTimestamp: "2026-01-01T00:00:00.000Z",
      isCertified: true,
      createdAt: "2026-01-01T00:00:00.000Z",
    };
    expect(field.ID).toBe("uuid-1");
  });

  it("should construct IApiCachedData with all required fields", () => {
    const cached: IApiCachedData = {
      ID: "uuid-2",
      vehicleIdentifier: "AB-123-CD",
      identifierType: "plate",
      adapterName: "IVehicleLookupAdapter",
      responseData: '{"make":"Renault"}',
      fetchedAt: "2026-01-01T00:00:00.000Z",
      expiresAt: "2026-01-03T00:00:00.000Z",
      isValid: true,
    };
    expect(cached.vehicleIdentifier).toBe("AB-123-CD");
  });
});
