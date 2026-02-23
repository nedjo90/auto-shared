import { z } from "zod";
import { LISTING_CONDITIONS, LISTING_VALIDATION } from "../constants/listing.js";

/**
 * Zod schema for declared field validation.
 */
export const listingPriceSchema = z
  .number()
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

export const listingMakeSchema = z
  .string()
  .min(1, "La marque est requise")
  .max(100, "La marque ne peut pas dépasser 100 caractères");

export const listingModelSchema = z
  .string()
  .min(1, "Le modèle est requis")
  .max(100, "Le modèle ne peut pas dépasser 100 caractères");

export const listingYearSchema = z
  .number()
  .int("L'année doit être un nombre entier")
  .min(1900, "L'année minimum est 1900")
  .max(new Date().getFullYear() + 1, `L'année maximum est ${new Date().getFullYear() + 1}`);

export const listingFuelTypeSchema = z
  .string()
  .min(1, "Le type de carburant est requis")
  .max(50, "Le type de carburant ne peut pas dépasser 50 caractères");

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
 *
 * Note: For fields like "description" where Zod applies .trim(), the caller
 * should also trim the value before storing it in the database.
 */
export function validateListingField(fieldName: string, value: string): string | null {
  try {
    switch (fieldName) {
      case "price": {
        if (value.trim() === "") return null; // Clearing field
        const num = Number(value);
        if (isNaN(num)) return "Le prix doit être un nombre";
        listingPriceSchema.parse(num);
        return null;
      }
      case "mileage": {
        if (value.trim() === "") return null; // Clearing field
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
      case "make":
        listingMakeSchema.parse(value);
        return null;
      case "model":
        listingModelSchema.parse(value);
        return null;
      case "year": {
        if (value.trim() === "") return null; // Clearing field
        const num = Number(value);
        if (isNaN(num)) return "L'année doit être un nombre";
        listingYearSchema.parse(num);
        return null;
      }
      case "fuelType":
        listingFuelTypeSchema.parse(value);
        return null;
      case "options": {
        if (value.trim() === "") return null;
        try {
          const parsed = JSON.parse(value);
          if (!Array.isArray(parsed)) return "Les options doivent être un tableau";
          if (!parsed.every((item: unknown) => typeof item === "string")) {
            return "Chaque option doit être une chaîne de caractères";
          }
          return null;
        } catch {
          return "Format JSON invalide pour les options";
        }
      }
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
