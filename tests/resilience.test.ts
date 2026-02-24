import { describe, it, expect } from "vitest";
import type {
  AdapterTypedError,
  CircuitBreakerState,
  ICircuitBreakerConfig,
  ICircuitBreakerStatus,
  CacheDataStatus,
  ApiSourceStatus,
  IResyncAdapterAvailability,
  IResyncAvailability,
  IResyncResult,
  IApiProviderHealth,
  IApiCallLog,
} from "../src/index.js";
import {
  ADAPTER_ERROR_TYPES,
  CIRCUIT_BREAKER_STATES,
  CACHE_DATA_STATUSES,
  RESILIENCE_CONFIG_KEYS,
  RESILIENCE_DEFAULTS,
  ADAPTER_ERROR_LABELS,
  CACHE_STATUS_LABELS,
} from "../src/index.js";
import {
  cacheDataStatusSchema,
  adapterErrorTypeSchema,
  apiSourceStatusSchema,
  parseAutoFillResponse,
} from "../src/validators/autofill.validator";

describe("Resilience Types (Story 3-11)", () => {
  describe("AdapterTypedError", () => {
    it("should create a timeout error", () => {
      const err: AdapterTypedError = {
        code: "ADAPTER_TIMEOUT",
        message: "Request timed out after 10000ms",
        provider: "ademe",
        retryable: true,
        errorType: "timeout",
      };
      expect(err.errorType).toBe("timeout");
      expect(err.retryable).toBe(true);
    });

    it("should create a connection error", () => {
      const err: AdapterTypedError = {
        code: "ADAPTER_CONNECTION",
        message: "Network unreachable",
        provider: "nhtsa",
        retryable: true,
        errorType: "connection",
      };
      expect(err.errorType).toBe("connection");
    });

    it("should create a response error with httpStatus", () => {
      const err: AdapterTypedError = {
        code: "ADAPTER_RESPONSE",
        message: "Internal Server Error",
        provider: "rappelconso",
        retryable: false,
        errorType: "response",
        httpStatus: 500,
      };
      expect(err.httpStatus).toBe(500);
      expect(err.retryable).toBe(false);
    });

    it("should create a rate limit error with retryAfterMs", () => {
      const err: AdapterTypedError = {
        code: "ADAPTER_RATE_LIMIT",
        message: "Too Many Requests",
        provider: "ademe",
        retryable: true,
        errorType: "rate_limit",
        httpStatus: 429,
        retryAfterMs: 60000,
      };
      expect(err.retryAfterMs).toBe(60000);
      expect(err.httpStatus).toBe(429);
    });
  });

  describe("CircuitBreaker types", () => {
    it("should accept all valid circuit breaker states", () => {
      const states: CircuitBreakerState[] = ["closed", "open", "half-open"];
      expect(states).toHaveLength(3);
    });

    it("should create a valid ICircuitBreakerConfig", () => {
      const config: ICircuitBreakerConfig = {
        failureThreshold: 5,
        cooldownMs: 60000,
        halfOpenMaxAttempts: 1,
      };
      expect(config.failureThreshold).toBe(5);
      expect(config.cooldownMs).toBe(60000);
    });

    it("should create a valid ICircuitBreakerStatus for closed state", () => {
      const status: ICircuitBreakerStatus = {
        adapterName: "IEmissionAdapter",
        state: "closed",
        consecutiveFailures: 0,
        lastFailureAt: null,
        lastSuccessAt: "2026-02-24T10:00:00Z",
        circuitOpenedAt: null,
      };
      expect(status.state).toBe("closed");
      expect(status.consecutiveFailures).toBe(0);
    });

    it("should create a valid ICircuitBreakerStatus for open state", () => {
      const status: ICircuitBreakerStatus = {
        adapterName: "IEmissionAdapter",
        state: "open",
        consecutiveFailures: 5,
        lastFailureAt: "2026-02-24T10:05:00Z",
        lastSuccessAt: "2026-02-24T09:00:00Z",
        circuitOpenedAt: "2026-02-24T10:05:00Z",
      };
      expect(status.state).toBe("open");
      expect(status.consecutiveFailures).toBe(5);
    });
  });

  describe("CacheDataStatus", () => {
    it("should accept all valid cache data statuses", () => {
      const statuses: CacheDataStatus[] = ["fresh", "cached", "stale"];
      expect(statuses).toHaveLength(3);
    });
  });

  describe("ApiSourceStatus with resilience fields", () => {
    it("should create a source status with cache info", () => {
      const source: ApiSourceStatus = {
        adapterInterface: "IVehicleLookupAdapter",
        providerKey: "mock-siv",
        status: "cached",
        cacheStatus: "cached",
        cachedAt: "2026-02-23T10:00:00Z",
      };
      expect(source.cacheStatus).toBe("cached");
      expect(source.cachedAt).toBeDefined();
    });

    it("should create a source status with error type", () => {
      const source: ApiSourceStatus = {
        adapterInterface: "IEmissionAdapter",
        providerKey: "ademe",
        status: "failed",
        errorMessage: "Request timed out",
        errorType: "timeout",
      };
      expect(source.errorType).toBe("timeout");
    });

    it("should create a source status with stale cache", () => {
      const source: ApiSourceStatus = {
        adapterInterface: "IVehicleLookupAdapter",
        providerKey: "mock-siv",
        status: "cached",
        cacheStatus: "stale",
        cachedAt: "2026-02-20T10:00:00Z",
      };
      expect(source.cacheStatus).toBe("stale");
    });
  });

  describe("Resync types", () => {
    it("should create a valid IResyncAdapterAvailability", () => {
      const avail: IResyncAdapterAvailability = {
        adapterInterface: "IEmissionAdapter",
        providerKey: "ademe",
        isAvailable: true,
        certifiableFields: ["co2GKm", "energyClass", "euroNorm"],
      };
      expect(avail.isAvailable).toBe(true);
      expect(avail.certifiableFields).toHaveLength(3);
    });

    it("should create a valid IResyncAvailability with adapters available", () => {
      const result: IResyncAvailability = {
        listingId: "listing-1",
        hasResyncableFields: true,
        availableAdapters: [
          {
            adapterInterface: "IEmissionAdapter",
            providerKey: "ademe",
            isAvailable: true,
            certifiableFields: ["co2GKm"],
          },
        ],
      };
      expect(result.hasResyncableFields).toBe(true);
      expect(result.availableAdapters).toHaveLength(1);
    });

    it("should create a valid IResyncAvailability with no adapters", () => {
      const result: IResyncAvailability = {
        listingId: "listing-1",
        hasResyncableFields: false,
        availableAdapters: [],
      };
      expect(result.hasResyncableFields).toBe(false);
    });

    it("should create a valid IResyncResult on success", () => {
      const result: IResyncResult = {
        listingId: "listing-1",
        success: true,
        updatedFields: [
          {
            fieldName: "co2GKm",
            fieldValue: "128",
            source: "ADEME",
            sourceTimestamp: "2026-02-24T10:00:00Z",
            isCertified: true,
          },
        ],
        failedAdapters: [],
        newVisibilityScore: 85,
      };
      expect(result.success).toBe(true);
      expect(result.updatedFields).toHaveLength(1);
      expect(result.newVisibilityScore).toBe(85);
    });

    it("should create a valid IResyncResult with partial failure", () => {
      const result: IResyncResult = {
        listingId: "listing-1",
        success: true,
        updatedFields: [],
        failedAdapters: ["IRecallAdapter"],
        newVisibilityScore: null,
      };
      expect(result.failedAdapters).toHaveLength(1);
      expect(result.newVisibilityScore).toBeNull();
    });
  });

  describe("IApiProviderHealth", () => {
    it("should create a healthy provider record", () => {
      const health: IApiProviderHealth = {
        ID: "health-1",
        adapterName: "IEmissionAdapter",
        providerName: "ademe",
        consecutiveFailures: 0,
        lastSuccessAt: "2026-02-24T10:00:00Z",
        lastFailureAt: null,
        isCircuitOpen: false,
        circuitOpenedAt: null,
      };
      expect(health.consecutiveFailures).toBe(0);
      expect(health.isCircuitOpen).toBe(false);
    });

    it("should create an unhealthy provider record", () => {
      const health: IApiProviderHealth = {
        ID: "health-2",
        adapterName: "IRecallAdapter",
        providerName: "rappelconso",
        consecutiveFailures: 7,
        lastSuccessAt: "2026-02-23T08:00:00Z",
        lastFailureAt: "2026-02-24T10:05:00Z",
        isCircuitOpen: true,
        circuitOpenedAt: "2026-02-24T10:03:00Z",
      };
      expect(health.consecutiveFailures).toBe(7);
      expect(health.isCircuitOpen).toBe(true);
      expect(health.circuitOpenedAt).toBeDefined();
    });
  });

  describe("IApiCallLog with resilience fields", () => {
    it("should include isFailure and errorType", () => {
      const log: IApiCallLog = {
        ID: "log-1",
        adapterInterface: "IEmissionAdapter",
        providerKey: "ademe",
        endpoint: "https://data.ademe.fr/api/v1/emissions",
        httpMethod: "GET",
        httpStatus: 504,
        responseTimeMs: 10000,
        cost: 0,
        listingId: null,
        requestId: "req-1",
        errorMessage: "Gateway Timeout",
        timestamp: "2026-02-24T10:00:00Z",
        isFailure: true,
        errorType: "timeout",
      };
      expect(log.isFailure).toBe(true);
      expect(log.errorType).toBe("timeout");
    });

    it("should work without resilience fields for backward compat", () => {
      const log: IApiCallLog = {
        ID: "log-2",
        adapterInterface: "IVehicleLookupAdapter",
        providerKey: "mock",
        endpoint: "/mock/lookup",
        httpMethod: "POST",
        httpStatus: 200,
        responseTimeMs: 50,
        cost: 0,
        listingId: "listing-1",
        requestId: "req-2",
        errorMessage: null,
        timestamp: "2026-02-24T10:00:00Z",
      };
      expect(log.isFailure).toBeUndefined();
      expect(log.errorType).toBeUndefined();
    });
  });
});

describe("Resilience Constants (Story 3-11)", () => {
  describe("ADAPTER_ERROR_TYPES", () => {
    it("should contain all 4 error types", () => {
      expect(ADAPTER_ERROR_TYPES).toHaveLength(4);
      expect(ADAPTER_ERROR_TYPES).toContain("timeout");
      expect(ADAPTER_ERROR_TYPES).toContain("connection");
      expect(ADAPTER_ERROR_TYPES).toContain("response");
      expect(ADAPTER_ERROR_TYPES).toContain("rate_limit");
    });
  });

  describe("CIRCUIT_BREAKER_STATES", () => {
    it("should contain all 3 states", () => {
      expect(CIRCUIT_BREAKER_STATES).toHaveLength(3);
      expect(CIRCUIT_BREAKER_STATES).toContain("closed");
      expect(CIRCUIT_BREAKER_STATES).toContain("open");
      expect(CIRCUIT_BREAKER_STATES).toContain("half-open");
    });
  });

  describe("CACHE_DATA_STATUSES", () => {
    it("should contain all 3 statuses", () => {
      expect(CACHE_DATA_STATUSES).toHaveLength(3);
      expect(CACHE_DATA_STATUSES).toContain("fresh");
      expect(CACHE_DATA_STATUSES).toContain("cached");
      expect(CACHE_DATA_STATUSES).toContain("stale");
    });
  });

  describe("RESILIENCE_CONFIG_KEYS", () => {
    it("should define all config keys", () => {
      expect(RESILIENCE_CONFIG_KEYS.ADAPTER_RETRY_COUNT).toBe("ADAPTER_RETRY_COUNT");
      expect(RESILIENCE_CONFIG_KEYS.ADAPTER_TIMEOUT_MS).toBe("ADAPTER_TIMEOUT_MS");
      expect(RESILIENCE_CONFIG_KEYS.CIRCUIT_BREAKER_THRESHOLD).toBe("CIRCUIT_BREAKER_THRESHOLD");
      expect(RESILIENCE_CONFIG_KEYS.CIRCUIT_BREAKER_COOLDOWN_MS).toBe(
        "CIRCUIT_BREAKER_COOLDOWN_MS",
      );
      expect(RESILIENCE_CONFIG_KEYS.CIRCUIT_BREAKER_HALF_OPEN_MAX).toBe(
        "CIRCUIT_BREAKER_HALF_OPEN_MAX",
      );
      expect(RESILIENCE_CONFIG_KEYS.API_CACHE_TTL_HOURS).toBe("API_CACHE_TTL_HOURS");
      expect(RESILIENCE_CONFIG_KEYS.API_FAILURE_ALERT_THRESHOLD).toBe(
        "API_FAILURE_ALERT_THRESHOLD",
      );
    });
  });

  describe("RESILIENCE_DEFAULTS", () => {
    it("should define sensible defaults", () => {
      expect(RESILIENCE_DEFAULTS.ADAPTER_RETRY_COUNT).toBe(2);
      expect(RESILIENCE_DEFAULTS.ADAPTER_TIMEOUT_MS).toBe(10000);
      expect(RESILIENCE_DEFAULTS.CIRCUIT_BREAKER_THRESHOLD).toBe(5);
      expect(RESILIENCE_DEFAULTS.CIRCUIT_BREAKER_COOLDOWN_MS).toBe(60000);
      expect(RESILIENCE_DEFAULTS.CIRCUIT_BREAKER_HALF_OPEN_MAX).toBe(1);
      expect(RESILIENCE_DEFAULTS.API_CACHE_TTL_HOURS).toBe(48);
      expect(RESILIENCE_DEFAULTS.API_FAILURE_ALERT_THRESHOLD).toBe(5);
    });
  });

  describe("ADAPTER_ERROR_LABELS", () => {
    it("should have French labels for all error types", () => {
      expect(Object.keys(ADAPTER_ERROR_LABELS)).toHaveLength(4);
      expect(ADAPTER_ERROR_LABELS.timeout).toContain("Delai");
      expect(ADAPTER_ERROR_LABELS.connection).toContain("connexion");
      expect(ADAPTER_ERROR_LABELS.response).toContain("reponse");
      expect(ADAPTER_ERROR_LABELS.rate_limit).toContain("requetes");
    });
  });

  describe("CACHE_STATUS_LABELS", () => {
    it("should have French labels for all cache statuses", () => {
      expect(Object.keys(CACHE_STATUS_LABELS)).toHaveLength(3);
      expect(CACHE_STATUS_LABELS.fresh).toContain("temps reel");
      expect(CACHE_STATUS_LABELS.cached).toContain("cache");
      expect(CACHE_STATUS_LABELS.stale).toContain("obsoletes");
    });
  });
});

describe("Resilience Validators (Story 3-11)", () => {
  describe("cacheDataStatusSchema", () => {
    it("should accept valid cache statuses", () => {
      expect(cacheDataStatusSchema.safeParse("fresh").success).toBe(true);
      expect(cacheDataStatusSchema.safeParse("cached").success).toBe(true);
      expect(cacheDataStatusSchema.safeParse("stale").success).toBe(true);
    });

    it("should reject invalid cache statuses", () => {
      expect(cacheDataStatusSchema.safeParse("expired").success).toBe(false);
      expect(cacheDataStatusSchema.safeParse("").success).toBe(false);
    });
  });

  describe("adapterErrorTypeSchema", () => {
    it("should accept valid error types", () => {
      expect(adapterErrorTypeSchema.safeParse("timeout").success).toBe(true);
      expect(adapterErrorTypeSchema.safeParse("connection").success).toBe(true);
      expect(adapterErrorTypeSchema.safeParse("response").success).toBe(true);
      expect(adapterErrorTypeSchema.safeParse("rate_limit").success).toBe(true);
    });

    it("should reject invalid error types", () => {
      expect(adapterErrorTypeSchema.safeParse("unknown").success).toBe(false);
      expect(adapterErrorTypeSchema.safeParse("").success).toBe(false);
    });
  });

  describe("apiSourceStatusSchema with resilience fields", () => {
    it("should accept source with cache fields", () => {
      const result = apiSourceStatusSchema.safeParse({
        adapterInterface: "IVehicleLookupAdapter",
        providerKey: "mock",
        status: "cached",
        cacheStatus: "cached",
        cachedAt: "2026-02-23T10:00:00Z",
      });
      expect(result.success).toBe(true);
    });

    it("should accept source with error type", () => {
      const result = apiSourceStatusSchema.safeParse({
        adapterInterface: "IEmissionAdapter",
        providerKey: "ademe",
        status: "failed",
        errorMessage: "Timeout",
        errorType: "timeout",
      });
      expect(result.success).toBe(true);
    });

    it("should accept source without resilience fields (backward compat)", () => {
      const result = apiSourceStatusSchema.safeParse({
        adapterInterface: "IVehicleLookupAdapter",
        providerKey: "mock",
        status: "success",
        responseTimeMs: 100,
      });
      expect(result.success).toBe(true);
    });

    it("should reject invalid cacheStatus value", () => {
      const result = apiSourceStatusSchema.safeParse({
        adapterInterface: "IVehicleLookupAdapter",
        providerKey: "mock",
        status: "cached",
        cacheStatus: "expired",
      });
      expect(result.success).toBe(false);
    });

    it("should reject invalid errorType value", () => {
      const result = apiSourceStatusSchema.safeParse({
        adapterInterface: "IEmissionAdapter",
        providerKey: "ademe",
        status: "failed",
        errorType: "unknown_error",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("parseAutoFillResponse with resilience fields", () => {
    it("should parse sources with cache info", () => {
      const wire = {
        fields: "[]",
        sources: JSON.stringify([
          {
            adapterInterface: "IVehicleLookupAdapter",
            providerKey: "mock",
            status: "cached",
            cacheStatus: "cached",
            cachedAt: "2026-02-23T10:00:00Z",
          },
        ]),
      };
      const result = parseAutoFillResponse(wire);
      expect(result.sources[0].cacheStatus).toBe("cached");
      expect(result.sources[0].cachedAt).toBe("2026-02-23T10:00:00Z");
    });

    it("should parse sources with error type", () => {
      const wire = {
        fields: "[]",
        sources: JSON.stringify([
          {
            adapterInterface: "IEmissionAdapter",
            providerKey: "ademe",
            status: "failed",
            errorMessage: "Timeout",
            errorType: "timeout",
          },
        ]),
      };
      const result = parseAutoFillResponse(wire);
      expect(result.sources[0].errorType).toBe("timeout");
    });
  });
});
