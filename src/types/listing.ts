// ─── Listing DTOs (Story 3-3) ─────────────────────────────────────────────

import type { ListingCondition } from "../constants/listing.js";

/** Full listing entity shape. */
export interface IListing {
  ID: string;
  sellerId: string;

  // Vehicle identity (certifiable)
  plate: string | null;
  vin: string | null;
  make: string | null;
  model: string | null;
  variant: string | null;
  year: number | null;
  registrationDate: string | null;
  fuelType: string | null;
  engineCapacityCc: number | null;
  powerKw: number | null;
  powerHp: number | null;
  gearbox: string | null;
  bodyType: string | null;
  doors: number | null;
  seats: number | null;
  color: string | null;
  co2GKm: number | null;
  euroNorm: string | null;
  energyClass: string | null;
  critAirLevel: string | null;
  critAirLabel: string | null;
  critAirColor: string | null;
  recallCount: number | null;

  // Declared fields (seller input)
  price: number | null;
  mileage: number | null;
  description: string | null;
  condition: ListingCondition | null;
  options: string | null; // JSON array
  interiorColor: string | null;
  exteriorColor: string | null;
  numberOfDoors: number | null;
  transmission: string | null;
  driveType: string | null;

  // VIN-technical (certifiable)
  bodyClass: string | null;
  engineCylinders: number | null;
  manufacturer: string | null;
  vehicleType: string | null;
  plantCountry: string | null;

  // Status
  status: string;
  visibilityScore: number;

  // Managed
  createdAt?: string;
  modifiedAt?: string;
  createdBy?: string;
  modifiedBy?: string;
}

/** Field status for UI display. */
export type FieldStatus = "certified" | "declared" | "empty";

/** Listing field with its current status for form rendering. */
export interface ListingFieldState {
  fieldName: string;
  value: string | number | null;
  status: FieldStatus;
  certifiedSource?: string;
  certifiedTimestamp?: string;
  originalCertifiedValue?: string;
}

/** Input for updating a single listing field. */
export interface UpdateListingFieldInput {
  listingId: string;
  fieldName: string;
  value: string;
}

/** Result of updating a listing field. */
export interface UpdateListingFieldResult {
  fieldName: string;
  value: string;
  status: FieldStatus;
  visibilityScore: number;
  previousCertifiedValue?: string;
}

/** Certified field history record. */
export interface ICertifiedFieldHistory {
  ID: string;
  listingId: string;
  fieldName: string;
  originalValue: string;
  originalSource: string;
  overriddenAt: string;
  overriddenBy: string;
}
