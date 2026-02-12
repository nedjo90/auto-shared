import type { LegalDocumentKey } from "../types/legal.js";

/** Available legal document key identifiers. */
export const LEGAL_DOCUMENT_KEYS: readonly LegalDocumentKey[] = [
  "cgu",
  "cgv",
  "privacy_policy",
  "legal_notices",
] as const;

/** French labels for legal document types. */
export const LEGAL_DOCUMENT_LABELS: Record<LegalDocumentKey, string> = {
  cgu: "Conditions Generales d'Utilisation",
  cgv: "Conditions Generales de Vente",
  privacy_policy: "Politique de Confidentialite",
  legal_notices: "Mentions Legales",
};
