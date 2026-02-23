import { z } from "zod";
import { LISTING_CONDITIONS, LISTING_VALIDATION } from "../constants/listing.js";

/**
 * Zod schema for declared field validation.
 */
export const listingPriceSchema = z
  .number()
  .positive("Le prix doit être positif")
  .min(LISTING_VALIDATION.price.min, "Le prix minimum est 0,01 €")
  .max(LISTING_VALIDATION.price.max, "Le prix maximum est 9 999 999,99 €");

export const listingMileageSchema = z
  .number()
  .int("Le kilométrage doit être un nombre entier")
  .min(LISTING_VALIDATION.mileage.min, "Le kilométrage ne peut pas être négatif")
  .max(LISTING_VALIDATION.mileage.max, "Le kilométrage maximum est 9 999 999 km");

export const listingDescriptionSchema = z
  .string()
  .trim()
  .min(
    LISTING_VALIDATION.description.minLength,
    "La description doit contenir au moins 20 caractères",
  )
  .max(
    LISTING_VALIDATION.description.maxLength,
    "La description ne peut pas dépasser 5000 caractères",
  );

export const listingConditionSchema = z.enum(LISTING_CONDITIONS, {
  message: "État invalide. Valeurs acceptées : Excellent, Bon, Correct, A_restaurer",
});

export const listingTransmissionSchema = z.enum(LISTING_VALIDATION.transmission.values, {
  message: "Transmission invalide. Valeurs acceptées : manuelle, automatique",
});

export const listingDriveTypeSchema = z.enum(LISTING_VALIDATION.driveType.values, {
  message: "Type de traction invalide. Valeurs acceptées : traction, propulsion, integrale",
});

/**
 * Schema for updating a single listing field.
 */
export const updateListingFieldSchema = z.object({
  listingId: z.string().uuid("ID d'annonce invalide"),
  fieldName: z.string().min(1, "Le nom du champ est requis"),
  value: z.string().min(0),
});

export type UpdateListingFieldInput = z.infer<typeof updateListingFieldSchema>;

/**
 * Validate a single field value based on its name.
 * Returns null if valid, error message string if invalid.
 */
export function validateListingField(fieldName: string, value: string): string | null {
  try {
    switch (fieldName) {
      case "price": {
        const num = Number(value);
        if (isNaN(num)) return "Le prix doit être un nombre";
        listingPriceSchema.parse(num);
        return null;
      }
      case "mileage": {
        const num = Number(value);
        if (isNaN(num)) return "Le kilométrage doit être un nombre";
        listingMileageSchema.parse(num);
        return null;
      }
      case "description":
        listingDescriptionSchema.parse(value);
        return null;
      case "condition":
        listingConditionSchema.parse(value);
        return null;
      case "transmission":
        listingTransmissionSchema.parse(value);
        return null;
      case "driveType":
        listingDriveTypeSchema.parse(value);
        return null;
      default:
        // No specific validation for other fields
        return null;
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      return err.issues[0]?.message || "Valeur invalide";
    }
    return "Erreur de validation";
  }
}
