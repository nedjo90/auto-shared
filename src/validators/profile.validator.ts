import { z } from "zod";

const SIRET_REGEX = /^\d{14}$/;

/**
 * Validates the SIREN component (first 9 digits) of a SIRET using Luhn algorithm.
 */
export function validateSirenLuhn(siren: string): boolean {
  if (siren.length !== 9) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    let digit = parseInt(siren[i], 10);
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
}

/**
 * Zod schema for SIRET validation (14 digits, Luhn check on SIREN component).
 */
export const siretSchema = z
  .string()
  .regex(SIRET_REGEX, "Le SIRET doit contenir 14 chiffres")
  .refine((val) => validateSirenLuhn(val.substring(0, 9)), {
    message: "Le numéro SIREN (9 premiers chiffres) est invalide",
  });

/**
 * Zod schema for profile update input.
 */
export const profileUpdateInputSchema = z.object({
  displayName: z.string().max(200).optional(),
  phone: z
    .string()
    .max(20)
    .regex(/^[+]?[\d\s()-]*$/, "Format de téléphone invalide")
    .optional()
    .or(z.literal("")),
  addressStreet: z.string().max(500).optional().or(z.literal("")),
  addressCity: z.string().max(100).optional().or(z.literal("")),
  addressPostalCode: z
    .string()
    .max(10)
    .regex(/^[\d\s-]*$/, "Format de code postal invalide")
    .optional()
    .or(z.literal("")),
  addressCountry: z.string().max(2).optional().or(z.literal("")),
  siret: siretSchema.optional().or(z.literal("")),
  companyName: z.string().max(200).optional().or(z.literal("")),
  avatarUrl: z.string().url("URL d'avatar invalide").optional().or(z.literal("")),
  bio: z.string().max(500).optional().or(z.literal("")),
});

export type ProfileUpdateInput = z.infer<typeof profileUpdateInputSchema>;
