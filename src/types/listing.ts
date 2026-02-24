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
  visibilityLabel: string;
  completionPercentage: number;

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

/** Result of updating a listing field. */
export interface UpdateListingFieldResult {
  fieldName: string;
  value: string;
  status: FieldStatus;
  visibilityScore: number;
  visibilityLabel: string;
  suggestions: string; // JSON array of ScoreSuggestion
  previousCertifiedValue?: string;
}

// ─── Listing Photo (Story 3-4) ──────────────────────────────────────────

/** Photo attached to a listing. */
export interface IListingPhoto {
  ID: string;
  listingId: string;
  blobUrl: string;
  cdnUrl: string;
  sortOrder: number;
  isPrimary: boolean;
  fileSize: number;
  mimeType: string;
  width: number;
  height: number;
  uploadedAt: string;
  createdAt?: string;
  modifiedAt?: string;
}

/** Allowed MIME types for photo upload. */
export type PhotoMimeType = "image/jpeg" | "image/png" | "image/webp" | "image/heic";

/** Result of a photo upload action. */
export interface UploadPhotoResult {
  ID: string;
  cdnUrl: string;
  sortOrder: number;
  isPrimary: boolean;
  fileSize: number;
  mimeType: string;
  width: number;
  height: number;
}

/** Input for reordering photos. */
export interface ReorderPhotosInput {
  listingId: string;
  photoIds: string[];
}

/** Result of saving a draft. */
export interface SaveDraftResult {
  listingId: string;
  success: boolean;
  completionPercentage: number;
  visibilityScore: number;
  visibilityLabel: string;
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

// ─── Listing Lifecycle (Story 3-10) ──────────────────────────────────────

/** Performance analytics for a listing. */
export interface IListingAnalytics {
  ID: string;
  listingId: string;
  viewCount: number;
  favoriteCount: number;
  chatCount: number;
}

/** Seller listing history item with performance metrics. */
export interface ISellerListingHistoryItem {
  ID: string;
  make: string | null;
  model: string | null;
  year: number | null;
  price: number | null;
  status: string;
  visibilityScore: number;
  publishedAt: string | null;
  soldAt: string | null;
  archivedAt: string | null;
  viewCount: number;
  favoriteCount: number;
  chatCount: number;
  daysOnMarket: number | null;
  photoCount: number;
  primaryPhotoUrl: string | null;
}

/** Result of a listing lifecycle action (markAsSold, archiveListing). */
export interface IListingLifecycleResult {
  success: boolean;
  listingId: string;
  newStatus: string;
  timestamp: string;
}

/** Seller listings response (active published listings). */
export interface ISellerPublishedListing {
  ID: string;
  make: string | null;
  model: string | null;
  year: number | null;
  price: number | null;
  status: string;
  visibilityScore: number;
  publishedAt: string | null;
  viewCount: number;
  favoriteCount: number;
  chatCount: number;
  daysOnMarket: number;
  photoCount: number;
  primaryPhotoUrl: string | null;
}
