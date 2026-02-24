// ─── API Resilience Constants (Story 3-11) ──────────────────────────────────

import type { AdapterErrorType, CircuitBreakerState, CacheDataStatus } from "../types/index.js";

/** Adapter error type codes. */
export const ADAPTER_ERROR_TYPES: readonly AdapterErrorType[] = [
  "timeout",
  "connection",
  "response",
  "rate_limit",
] as const;

/** Circuit breaker states. */
export const CIRCUIT_BREAKER_STATES: readonly CircuitBreakerState[] = [
  "closed",
  "open",
  "half-open",
] as const;

/** Cache data status values. */
export const CACHE_DATA_STATUSES: readonly CacheDataStatus[] = [
  "fresh",
  "cached",
  "stale",
] as const;

/** ConfigParameter keys for resilience settings. */
export const RESILIENCE_CONFIG_KEYS = {
  /** Default retry count per adapter (default: 2). */
  ADAPTER_RETRY_COUNT: "ADAPTER_RETRY_COUNT",
  /** Default adapter timeout in ms (default: 10000). */
  ADAPTER_TIMEOUT_MS: "ADAPTER_TIMEOUT_MS",
  /** Circuit breaker failure threshold (default: 5). */
  CIRCUIT_BREAKER_THRESHOLD: "CIRCUIT_BREAKER_THRESHOLD",
  /** Circuit breaker cooldown in ms (default: 60000). */
  CIRCUIT_BREAKER_COOLDOWN_MS: "CIRCUIT_BREAKER_COOLDOWN_MS",
  /** Circuit breaker half-open max attempts (default: 1). */
  CIRCUIT_BREAKER_HALF_OPEN_MAX: "CIRCUIT_BREAKER_HALF_OPEN_MAX",
  /** Cache TTL in hours (default: 48). */
  API_CACHE_TTL_HOURS: "API_CACHE_TTL_HOURS",
  /** Admin alert failure threshold (default: 5). */
  API_FAILURE_ALERT_THRESHOLD: "API_FAILURE_ALERT_THRESHOLD",
} as const;

/** Default values for resilience config parameters. */
export const RESILIENCE_DEFAULTS = {
  ADAPTER_RETRY_COUNT: 2,
  ADAPTER_TIMEOUT_MS: 10000,
  CIRCUIT_BREAKER_THRESHOLD: 5,
  CIRCUIT_BREAKER_COOLDOWN_MS: 60000,
  CIRCUIT_BREAKER_HALF_OPEN_MAX: 1,
  API_CACHE_TTL_HOURS: 48,
  API_FAILURE_ALERT_THRESHOLD: 5,
} as const;

/** French labels for adapter error types. */
export const ADAPTER_ERROR_LABELS: Record<AdapterErrorType, string> = {
  timeout: "Delai d'attente depasse",
  connection: "Erreur de connexion",
  response: "Erreur de reponse",
  rate_limit: "Limite de requetes atteinte",
};

/** French labels for cache data statuses. */
export const CACHE_STATUS_LABELS: Record<CacheDataStatus, string> = {
  fresh: "Donnees en temps reel",
  cached: "Donnees en cache",
  stale: "Donnees obsoletes",
};
