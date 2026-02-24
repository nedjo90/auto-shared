// ─── Listing DTOs (Story 3-3) ─────────────────────────────────────────────

import type { ListingCondition } from "../constants/listing.js";
import type { ListingStatus } from "../constants/roles.js";

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

  // Lifecycle timestamps
  publishedAt: string | null;
  soldAt: string | null;
  archivedAt: string | null;
  declarationId: string | null;

  // Status
  status: ListingStatus;
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
  status: ListingStatus;
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
  newStatus: ListingStatus;
  timestamp: string;
}

// ─── Listing Card Config (Story 4-1) ──────────────────────────────────────

/** Field type for card display. */
export type CardFieldType = "text" | "badge" | "price" | "location";

/** Configuration for which fields appear on listing cards. */
export interface IConfigListingCard {
  ID: string;
  fieldName: string;
  displayOrder: number;
  isVisible: boolean;
  labelFr: string;
  labelEn: string;
  fieldType: CardFieldType;
  createdAt?: string;
  modifiedAt?: string;
}

/** Public listing card data for marketplace browsing. */
export interface IPublicListingCard {
  ID: string;
  make: string | null;
  model: string | null;
  variant: string | null;
  year: number | null;
  price: number | null;
  mileage: number | null;
  fuelType: string | null;
  gearbox: string | null;
  bodyType: string | null;
  color: string | null;
  condition: string | null;
  visibilityScore: number;
  visibilityLabel: string;
  publishedAt: string | null;
  primaryPhotoUrl: string | null;
  photoCount: number;
  certifiedFieldCount: number;
  totalFieldCount: number;
  sellerId: string;
}

/** Paginated listing response for infinite scroll. */
export interface IListingPage {
  items: IPublicListingCard[];
  total: number;
  skip: number;
  top: number;
  hasMore: boolean;
}

/** Public listing detail with full information. */
export interface IPublicListingDetail {
  ID: string;
  make: string | null;
  model: string | null;
  variant: string | null;
  year: number | null;
  price: number | null;
  mileage: number | null;
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
  condition: string | null;
  description: string | null;
  options: string | null;
  interiorColor: string | null;
  exteriorColor: string | null;
  transmission: string | null;
  driveType: string | null;
  registrationDate: string | null;
  status: string;
  visibilityScore: number;
  visibilityLabel: string;
  publishedAt: string | null;
  soldAt: string | null;
  sellerId: string;
  photos: IListingPhoto[];
  certifiedFields: {
    fieldName: string;
    source: string;
    isCertified: boolean;
  }[];
  hasHistoryReport: boolean;
  analytics: {
    viewCount: number;
    favoriteCount: number;
  };
}

/** Seller listings response (active published listings). */
export interface ISellerPublishedListing {
  ID: string;
  make: string | null;
  model: string | null;
  year: number | null;
  price: number | null;
  status: ListingStatus;
  visibilityScore: number;
  publishedAt: string | null;
  viewCount: number;
  favoriteCount: number;
  chatCount: number;
  daysOnMarket: number | null;
  photoCount: number;
  primaryPhotoUrl: string | null;
}
