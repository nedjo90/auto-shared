import { z } from "zod";
import type { CertifiedFieldResult, ApiSourceStatus } from "../types/autofill.js";

// ─── Regex patterns ─────────────────────────────────────────────────────────
/** French SIV plate format: AA-123-BB */
export const PLATE_REGEX = /^[A-Z]{2}-[0-9]{3}-[A-Z]{2}$/;

/** ISO 3779 VIN: 17 alphanumeric chars excluding I, O, Q */
export const VIN_REGEX = /^[A-HJ-NPR-Z0-9]{17}$/;

// ─── Schemas ────────────────────────────────────────────────────────────────
export const identifierTypeSchema = z.enum(["plate", "vin"]);

export const autoFillRequestSchema = z
  .object({
    identifier: z.string().min(1, "L'identifiant est requis").max(20),
    identifierType: identifierTypeSchema,
  })
  .refine(
    (data) => {
      const normalized = data.identifier.toUpperCase();
      if (data.identifierType === "plate") {
        return PLATE_REGEX.test(normalized);
      }
      return VIN_REGEX.test(normalized);
    },
    {
      message: "Format d'identifiant invalide pour le type choisi",
      path: ["identifier"],
    },
  );

export type AutoFillRequestValidated = z.infer<typeof autoFillRequestSchema>;

// ─── Wire-format parsing ────────────────────────────────────────────────────
export const certifiedFieldResultSchema = z.object({
  fieldName: z.string(),
  fieldValue: z.string(),
  source: z.string(),
  sourceTimestamp: z.string(),
  isCertified: z.boolean(),
});

export const cacheDataStatusSchema = z.enum(["fresh", "cached", "stale"]);

export const adapterErrorTypeSchema = z.enum(["timeout", "connection", "response", "rate_limit"]);

export const apiSourceStatusSchema = z.object({
  adapterInterface: z.string(),
  providerKey: z.string(),
  status: z.enum(["pending", "success", "failed", "cached"]),
  responseTimeMs: z.number().optional(),
  errorMessage: z.string().optional(),
  cacheStatus: cacheDataStatusSchema.optional(),
  cachedAt: z.string().optional(),
  errorType: adapterErrorTypeSchema.optional(),
});

/**
 * Parse the wire format (JSON strings) returned by the CDS autoFill action
 * into typed arrays.
 */
export function parseAutoFillResponse(wire: { fields?: string; sources?: string }): {
  fields: CertifiedFieldResult[];
  sources: ApiSourceStatus[];
} {
  let fields: CertifiedFieldResult[] = [];
  let sources: ApiSourceStatus[] = [];

  if (wire.fields) {
    const parsed = JSON.parse(wire.fields);
    fields = z.array(certifiedFieldResultSchema).parse(parsed);
  }

  if (wire.sources) {
    const parsed = JSON.parse(wire.sources);
    sources = z.array(apiSourceStatusSchema).parse(parsed);
  }

  return { fields, sources };
}
