// ─── Auto-Fill & Certification DTOs (Story 3-2) ─────────────────────────────

/** Result of a single certified field from auto-fill. */
export interface CertifiedFieldResult {
  fieldName: string;
  fieldValue: string;
  source: string;
  sourceTimestamp: string;
  isCertified: boolean;
}

/** Status of a single API source during auto-fill. */
export type ApiSourceStatusState = "pending" | "success" | "failed" | "cached";

/** Cache freshness status for cached data. */
export type CacheDataStatus = "fresh" | "cached" | "stale";

export interface ApiSourceStatus {
  adapterInterface: string;
  providerKey: string;
  status: ApiSourceStatusState;
  responseTimeMs?: number;
  errorMessage?: string;
  /** Cache status when data is served from cache. */
  cacheStatus?: CacheDataStatus;
  /** ISO timestamp when cached data was originally fetched. */
  cachedAt?: string;
  /** Adapter error type when status is "failed". */
  errorType?: import("./adapters.js").AdapterErrorType;
}

/** Input for the autoFillByPlate action. */
export type IdentifierType = "plate" | "vin";

export interface AutoFillRequest {
  identifier: string;
  identifierType: IdentifierType;
}

/**
 * Output of the autoFill action (supports both plate and VIN).
 * NOTE: The CDS action returns fields/sources as LargeString (JSON).
 * This interface represents the **wire format**. Consumers must
 * JSON.parse() fields and sources to get the typed arrays.
 */
export interface AutoFillResponse {
  fields: string;
  sources: string;
}

/** Parsed/deserialized auto-fill result with typed arrays. */
export interface AutoFillResult {
  fields: CertifiedFieldResult[];
  sources: ApiSourceStatus[];
}

/** Stored certified field record shape. */
export interface ICertifiedField {
  ID: string;
  listingId: string;
  fieldName: string;
  fieldValue: string;
  source: string;
  sourceTimestamp: string;
  isCertified: boolean;
  createdAt: string;
}

/** Stored API cached data record shape. */
export interface IApiCachedData {
  ID: string;
  vehicleIdentifier: string;
  identifierType: IdentifierType;
  adapterName: string;
  responseData: string;
  fetchedAt: string;
  expiresAt: string;
  isValid: boolean;
}

// ─── Re-Sync Types (Story 3-11) ─────────────────────────────────────────────

/** Adapter availability for re-sync. */
export interface IResyncAdapterAvailability {
  adapterInterface: string;
  providerKey: string;
  isAvailable: boolean;
  certifiableFields: string[];
}

/** Result of checkResyncAvailability action. */
export interface IResyncAvailability {
  listingId: string;
  hasResyncableFields: boolean;
  availableAdapters: IResyncAdapterAvailability[];
}

/** Result of resyncListing action. */
export interface IResyncResult {
  listingId: string;
  success: boolean;
  updatedFields: CertifiedFieldResult[];
  failedAdapters: string[];
  newVisibilityScore: number | null;
}
