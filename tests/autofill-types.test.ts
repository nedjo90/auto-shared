import { describe, it, expect } from "vitest";
import type {
  CertifiedFieldResult,
  ApiSourceStatus,
  ApiSourceStatusState,
  IdentifierType,
  AutoFillRequest,
  AutoFillResponse,
  ICertifiedField,
  IApiCachedData,
} from "../src/types/autofill";

describe("autofill types", () => {
  it("should construct CertifiedFieldResult", () => {
    const field: CertifiedFieldResult = {
      fieldName: "make",
      fieldValue: "Renault",
      source: "SIV",
      sourceTimestamp: "2026-01-01T00:00:00.000Z",
      isCertified: true,
    };
    expect(field.fieldName).toBe("make");
    expect(field.isCertified).toBe(true);
  });

  it("should construct ApiSourceStatus with all states", () => {
    const states: ApiSourceStatusState[] = ["pending", "success", "failed", "cached"];
    states.forEach((status) => {
      const source: ApiSourceStatus = {
        adapterInterface: "IVehicleLookupAdapter",
        providerKey: "mock.vehicle-lookup",
        status,
      };
      expect(source.status).toBe(status);
    });
  });

  it("should construct ApiSourceStatus with optional fields", () => {
    const source: ApiSourceStatus = {
      adapterInterface: "IEmissionAdapter",
      providerKey: "ademe",
      status: "success",
      responseTimeMs: 250,
      errorMessage: undefined,
    };
    expect(source.responseTimeMs).toBe(250);
  });

  it("should accept plate and vin as IdentifierType", () => {
    const types: IdentifierType[] = ["plate", "vin"];
    expect(types).toHaveLength(2);
  });

  it("should construct AutoFillRequest", () => {
    const req: AutoFillRequest = {
      identifier: "AB-123-CD",
      identifierType: "plate",
    };
    expect(req.identifier).toBe("AB-123-CD");
    expect(req.identifierType).toBe("plate");
  });

  it("should construct AutoFillResponse", () => {
    const res: AutoFillResponse = {
      fields: [
        {
          fieldName: "make",
          fieldValue: "Renault",
          source: "SIV",
          sourceTimestamp: "2026-01-01T00:00:00.000Z",
          isCertified: true,
        },
      ],
      sources: [
        {
          adapterInterface: "IVehicleLookupAdapter",
          providerKey: "mock.vehicle-lookup",
          status: "success",
          responseTimeMs: 100,
        },
      ],
    };
    expect(res.fields).toHaveLength(1);
    expect(res.sources).toHaveLength(1);
  });

  it("should construct ICertifiedField", () => {
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
    expect(field.listingId).toBe("listing-1");
  });

  it("should construct IApiCachedData", () => {
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
    expect(cached.isValid).toBe(true);
  });
});
