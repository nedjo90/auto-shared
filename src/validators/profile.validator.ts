import { z } from "zod";

const SIRET_REGEX = /^\d{14}$/;

/**
 * Validates the SIREN component (first 9 digits) of a SIRET using Luhn algorithm.
 */
export function validateSirenLuhn(siren: string): boolean {
  if (!/^\d{9}$/.test(siren)) return false;

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
  displayName: z.string().trim().min(1).max(200).optional().or(z.literal("")),
  phone: z
    .string()
    .max(20)
    .regex(/^\+?\d[\d\s()-]*$/, "Format de téléphone invalide")
    .optional()
    .or(z.literal("")),
  addressStreet: z.string().trim().max(500).optional().or(z.literal("")),
  addressCity: z.string().trim().max(100).optional().or(z.literal("")),
  addressPostalCode: z
    .string()
    .max(10)
    .regex(/^[\d\s-]*$/, "Format de code postal invalide")
    .optional()
    .or(z.literal("")),
  addressCountry: z
    .string()
    .regex(/^[A-Z]{2}$/, "Code pays invalide (2 lettres majuscules)")
    .optional()
    .or(z.literal("")),
  siret: siretSchema.optional().or(z.literal("")),
  companyName: z.string().trim().max(200).optional().or(z.literal("")),
  avatarUrl: z
    .string()
    .url("URL d'avatar invalide")
    .refine((url) => url.startsWith("https://"), "L'URL doit commencer par https://")
    .optional()
    .or(z.literal("")),
  bio: z.string().trim().max(500).optional().or(z.literal("")),
});

export type ProfileUpdateInput = z.infer<typeof profileUpdateInputSchema>;
