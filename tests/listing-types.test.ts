import { describe, it, expect } from "vitest";
import type {
  IListing,
  FieldStatus,
  ListingFieldState,
  UpdateListingFieldInput,
  UpdateListingFieldResult,
  ICertifiedFieldHistory,
} from "../src/types/listing";

describe("listing types", () => {
  it("should allow creating an IListing object", () => {
    const listing: IListing = {
      ID: "test-id",
      sellerId: "seller-1",
      plate: "AB-123-CD",
      vin: null,
      make: "Renault",
      model: "Clio",
      variant: null,
      year: 2022,
      registrationDate: "2022-03-15",
      fuelType: "essence",
      engineCapacityCc: 1200,
      powerKw: 74,
      powerHp: 100,
      gearbox: "manuelle",
      bodyType: "berline",
      doors: 5,
      seats: 5,
      color: "rouge",
      co2GKm: 120,
      euroNorm: "Euro 6",
      energyClass: "C",
      critAirLevel: "1",
      critAirLabel: "Crit'Air 1",
      critAirColor: "violet",
      recallCount: 0,
      price: 15000,
      mileage: 50000,
      description: "Véhicule en bon état",
      condition: "Bon",
      options: '["GPS", "Climatisation"]',
      interiorColor: "noir",
      exteriorColor: "rouge",
      numberOfDoors: 5,
      transmission: "manuelle",
      driveType: "traction",
      bodyClass: null,
      engineCylinders: 4,
      manufacturer: "Renault",
      vehicleType: "Passenger Car",
      plantCountry: "France",
      status: "draft",
      visibilityScore: 75,
    };
    expect(listing.ID).toBe("test-id");
    expect(listing.status).toBe("draft");
  });

  it("should support all FieldStatus values", () => {
    const statuses: FieldStatus[] = ["certified", "declared", "empty"];
    expect(statuses).toHaveLength(3);
  });

  it("should allow creating a ListingFieldState", () => {
    const field: ListingFieldState = {
      fieldName: "make",
      value: "Renault",
      status: "certified",
      certifiedSource: "SIV",
      certifiedTimestamp: "2026-02-23T10:00:00Z",
    };
    expect(field.status).toBe("certified");
    expect(field.certifiedSource).toBe("SIV");
  });

  it("should allow creating a ListingFieldState with empty status", () => {
    const field: ListingFieldState = {
      fieldName: "price",
      value: null,
      status: "empty",
    };
    expect(field.status).toBe("empty");
    expect(field.value).toBeNull();
  });

  it("should allow creating an UpdateListingFieldInput", () => {
    const input: UpdateListingFieldInput = {
      listingId: "listing-1",
      fieldName: "price",
      value: "15000",
    };
    expect(input.fieldName).toBe("price");
  });

  it("should allow creating an UpdateListingFieldResult", () => {
    const result: UpdateListingFieldResult = {
      fieldName: "price",
      value: "15000",
      status: "declared",
      visibilityScore: 80,
    };
    expect(result.status).toBe("declared");
    expect(result.visibilityScore).toBe(80);
  });

  it("should allow creating an UpdateListingFieldResult with previous certified value", () => {
    const result: UpdateListingFieldResult = {
      fieldName: "mileage",
      value: "55000",
      status: "declared",
      visibilityScore: 75,
      previousCertifiedValue: "50000",
    };
    expect(result.previousCertifiedValue).toBe("50000");
  });

  it("should allow creating an ICertifiedFieldHistory", () => {
    const history: ICertifiedFieldHistory = {
      ID: "hist-1",
      listingId: "listing-1",
      fieldName: "mileage",
      originalValue: "50000",
      originalSource: "SIV",
      overriddenAt: "2026-02-23T12:00:00Z",
      overriddenBy: "seller-1",
    };
    expect(history.originalValue).toBe("50000");
    expect(history.overriddenBy).toBe("seller-1");
  });
});
