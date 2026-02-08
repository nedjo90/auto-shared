import { z } from "zod";
import type { IConfigRegistrationField } from "../types/config.js";

/**
 * Dynamically builds a Zod validation schema from ConfigRegistrationField config.
 * Used by both frontend (react-hook-form) and backend (server-side validation).
 */
export function buildRegistrationSchema(fields: IConfigRegistrationField[]) {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const field of fields) {
    let validator: z.ZodTypeAny;

    if (field.fieldType === "email") {
      validator = z.string().email("Format email invalide");
    } else if (field.fieldType === "tel") {
      validator = z.string();
    } else {
      validator = z.string();
    }

    if (field.validationPattern) {
      validator = (validator as z.ZodString).regex(
        new RegExp(field.validationPattern),
        "Format invalide",
      );
    }

    if (field.isRequired) {
      validator = (validator as z.ZodString).min(1, "Ce champ est requis");
    } else {
      validator = validator.optional().or(z.literal(""));
    }

    shape[field.fieldName] = validator;
  }

  // Fixed fields (not config-driven)
  shape.password = z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères");

  return z.object(shape);
}
