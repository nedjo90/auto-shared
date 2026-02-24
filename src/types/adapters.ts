// ─── Adapter DTOs (Story 3-1) ────────────────────────────────────────────────
// Input/output types for all 8 adapter interfaces.
// These types are shared between backend (implementations) and frontend (API responses).

/** Common adapter metadata returned by all adapters. */
export interface AdapterProviderMeta {
  providerName: string;
  providerVersion: string;
}

/** Standard error shape for adapter failures. */
export interface AdapterError {
  code: string;
  message: string;
  provider: string;
  retryable: boolean;
}

// ─── 1. Vehicle Lookup ──────────────────────────────────────────────────────

export interface VehicleLookupRequest {
  plate?: string;
  vin?: string;
}

export interface VehicleLookupResponse {
  plate: string;
  vin: string;
  make: string;
  model: string;
  variant: string | null;
  year: number;
  registrationDate: string;
  fuelType: string;
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
  provider: AdapterProviderMeta;
}

// ─── 2. Emission ────────────────────────────────────────────────────────────

export interface EmissionRequest {
  vin?: string;
  make?: string;
  model?: string;
  year?: number;
  fuelType?: string;
  engineCapacityCc?: number;
}

export interface EmissionResponse {
  co2GKm: number;
  energyClass: string;
  euroNorm: string;
  fuelType: string;
  pollutants: Record<string, number> | null;
  provider: AdapterProviderMeta;
}

// ─── 3. Recall ──────────────────────────────────────────────────────────────

export interface RecallRequest {
  make: string;
  model: string;
  vin?: string;
  yearFrom?: number;
  yearTo?: number;
}

export interface RecallCampaign {
  id: string;
  title: string;
  description: string;
  publishedDate: string;
  riskLevel: string;
  manufacturer: string;
  affectedModels: string[];
}

export interface RecallResponse {
  recalls: RecallCampaign[];
  totalCount: number;
  provider: AdapterProviderMeta;
}

// ─── 4. Crit'Air ────────────────────────────────────────────────────────────

export type CritAirLevel = "0" | "1" | "2" | "3" | "4" | "5" | "non-classe";

export interface CritAirRequest {
  fuelType: string;
  euroNorm: string;
  registrationDate: string;
}

export interface CritAirResponse {
  level: CritAirLevel;
  label: string;
  color: string;
  provider: AdapterProviderMeta;
}

// ─── 5. VIN Technical ───────────────────────────────────────────────────────

export interface VINTechnicalRequest {
  vin: string;
}

export interface VINTechnicalResponse {
  vin: string;
  make: string;
  model: string;
  year: number;
  bodyClass: string | null;
  driveType: string | null;
  engineCylinders: number | null;
  engineCapacityCc: number | null;
  fuelType: string | null;
  gvwr: string | null;
  plantCountry: string | null;
  manufacturer: string;
  vehicleType: string | null;
  provider: AdapterProviderMeta;
}

// ─── 6. History ─────────────────────────────────────────────────────────────

export interface HistoryRequest {
  vin: string;
  plate?: string;
}

export interface HistoryMileageRecord {
  date: string;
  mileageKm: number;
  source: string;
}

export interface HistoryAccident {
  date: string;
  severity: string;
  description: string;
}

export interface HistoryRegistration {
  date: string;
  department: string;
  region: string;
}

export interface HistoryResponse {
  vin: string;
  ownerCount: number;
  firstRegistrationDate: string;
  lastRegistrationDate: string;
  mileageRecords: HistoryMileageRecord[];
  accidents: HistoryAccident[];
  registrationHistory: HistoryRegistration[];
  outstandingFinance: boolean;
  stolen: boolean;
  totalDamageCount: number;
  provider: AdapterProviderMeta;
}

// ─── 7. Valuation ───────────────────────────────────────────────────────────

export interface ValuationRequest {
  make: string;
  model: string;
  year: number;
  mileageKm: number;
  fuelType: string;
  gearbox?: string;
  variant?: string;
  condition?: string;
}

export interface ValuationResponse {
  estimatedValueEur: number;
  minValueEur: number;
  maxValueEur: number;
  confidence: number;
  valuationDate: string;
  provider: AdapterProviderMeta;
}

// ─── 8. Payment ─────────────────────────────────────────────────────────────

export type PaymentStatus = "pending" | "succeeded" | "failed" | "canceled";

export interface PaymentRequest {
  amountCents: number;
  currency: string;
  description: string;
  customerId: string;
  metadata?: Record<string, string>;
  successUrl: string;
  cancelUrl: string;
}

export interface PaymentResponse {
  sessionId: string;
  sessionUrl: string;
  status: PaymentStatus;
  provider: AdapterProviderMeta;
}

export type WebhookEventType =
  | "checkout.session.completed"
  | "checkout.session.expired"
  | "payment_intent.succeeded"
  | "payment_intent.payment_failed";

export interface WebhookEvent {
  id: string;
  type: WebhookEventType;
  sessionId: string;
  amountCents: number;
  currency: string;
  customerId: string;
  metadata: Record<string, string>;
  createdAt: string;
}
