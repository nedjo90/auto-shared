import { describe, it, expect } from "vitest";
import type {
  IListing,
  FieldStatus,
  ListingFieldState,
  UpdateListingFieldResult,
  SaveDraftResult,
  ICertifiedFieldHistory,
  IListingAnalytics,
  ISellerListingHistoryItem,
  IListingLifecycleResult,
  ISellerPublishedListing,
} from "../src/types/listing";
import type { UpdateListingFieldInput } from "../src/validators/listing.validator";

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
      visibilityLabel: "Très documenté",
      completionPercentage: 60,
    };
    expect(listing.ID).toBe("test-id");
    expect(listing.status).toBe("draft");
    expect(listing.completionPercentage).toBe(60);
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
      visibilityLabel: "Très documenté",
      suggestions: "[]",
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
      visibilityLabel: "Très documenté",
      suggestions: "[]",
      previousCertifiedValue: "50000",
    };
    expect(result.previousCertifiedValue).toBe("50000");
  });

  it("should allow creating a SaveDraftResult", () => {
    const result: SaveDraftResult = {
      listingId: "listing-1",
      success: true,
      completionPercentage: 45,
      visibilityScore: 60,
      visibilityLabel: "Bien documenté",
    };
    expect(result.success).toBe(true);
    expect(result.completionPercentage).toBe(45);
    expect(result.visibilityScore).toBe(60);
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

  it("should allow creating an IListingAnalytics", () => {
    const analytics: IListingAnalytics = {
      ID: "analytics-1",
      listingId: "listing-1",
      viewCount: 150,
      favoriteCount: 12,
      chatCount: 3,
    };
    expect(analytics.viewCount).toBe(150);
    expect(analytics.favoriteCount).toBe(12);
    expect(analytics.chatCount).toBe(3);
  });

  it("should allow creating an ISellerListingHistoryItem", () => {
    const item: ISellerListingHistoryItem = {
      ID: "listing-1",
      make: "Renault",
      model: "Clio",
      year: 2022,
      price: 15000,
      status: "sold",
      visibilityScore: 85,
      publishedAt: "2026-01-15T10:00:00Z",
      soldAt: "2026-02-10T14:00:00Z",
      archivedAt: null,
      viewCount: 320,
      favoriteCount: 25,
      chatCount: 8,
      daysOnMarket: 26,
      photoCount: 10,
      primaryPhotoUrl: "https://cdn.example.com/photo.jpg",
    };
    expect(item.status).toBe("sold");
    expect(item.daysOnMarket).toBe(26);
    expect(item.publishedAt).toBeTruthy();
    expect(item.soldAt).toBeTruthy();
  });

  it("should allow creating an IListingLifecycleResult", () => {
    const result: IListingLifecycleResult = {
      success: true,
      listingId: "listing-1",
      newStatus: "sold",
      timestamp: "2026-02-24T10:00:00Z",
    };
    expect(result.success).toBe(true);
    expect(result.newStatus).toBe("sold");
  });

  it("should allow creating an ISellerPublishedListing", () => {
    const listing: ISellerPublishedListing = {
      ID: "listing-1",
      make: "Peugeot",
      model: "308",
      year: 2023,
      price: 22000,
      status: "published",
      visibilityScore: 90,
      publishedAt: "2026-02-01T08:00:00Z",
      viewCount: 200,
      favoriteCount: 15,
      chatCount: 5,
      daysOnMarket: 23,
      photoCount: 8,
      primaryPhotoUrl: "https://cdn.example.com/photo.jpg",
    };
    expect(listing.status).toBe("published");
    expect(listing.daysOnMarket).toBe(23);
  });
});
