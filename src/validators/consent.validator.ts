import { z } from "zod";
import type { IConfigConsentType } from "../types/consent.js";

/**
 * Builds a Zod schema for consent input validation.
 * Mandatory consents must be granted (true), optional are boolean.
 */
export function buildConsentSchema(consentTypes: IConfigConsentType[]) {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const ct of consentTypes) {
    if (ct.isMandatory) {
      shape[ct.ID] = z.literal(true, {
        message: "Ce consentement est requis",
      });
    } else {
      shape[ct.ID] = z.boolean().optional().default(false);
    }
  }

  return z.object(shape);
}

/**
 * Validates a single consent input.
 */
export const consentInputSchema = z.object({
  consentTypeId: z.string().uuid("ID de type de consentement invalide"),
  decision: z.enum(["granted", "revoked"], {
    message: "La décision doit être 'granted' ou 'revoked'",
  }),
});

/**
 * Validates a batch consent input.
 */
export const consentBatchInputSchema = z.object({
  consents: z
    .array(consentInputSchema)
    .min(1, "Au moins un consentement requis"),
});
