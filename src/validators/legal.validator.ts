import { z } from "zod";

export const legalDocumentKeySchema = z.enum(["cgu", "cgv", "privacy_policy", "legal_notices"]);

/** Schema for the publishLegalVersion action input. */
export const publishLegalVersionInputSchema = z.object({
  documentId: z.string().trim().min(1, "L'identifiant du document est requis"),
  content: z.string().trim().min(1, "Le contenu du document est requis"),
  summary: z
    .string()
    .trim()
    .max(500, "Le resume ne doit pas depasser 500 caracteres")
    .optional()
    .default(""),
  requiresReacceptance: z.boolean().optional().default(true),
});

export type PublishLegalVersionInput = z.infer<typeof publishLegalVersionInputSchema>;

/** Schema for accepting a legal document (user-facing). */
export const acceptLegalDocumentInputSchema = z.object({
  documentId: z.string().trim().min(1, "L'identifiant du document est requis"),
  version: z.number().int("La version doit etre un entier").min(1, "La version minimum est 1"),
});

export type AcceptLegalDocumentInput = z.infer<typeof acceptLegalDocumentInputSchema>;
