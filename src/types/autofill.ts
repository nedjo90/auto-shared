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

export interface ApiSourceStatus {
  adapterInterface: string;
  providerKey: string;
  status: ApiSourceStatusState;
  responseTimeMs?: number;
  errorMessage?: string;
}

/** Input for the autoFillByPlate action. */
export type IdentifierType = "plate" | "vin";

export interface AutoFillRequest {
  identifier: string;
  identifierType: IdentifierType;
}

/** Output of the autoFillByPlate action. */
export interface AutoFillResponse {
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
