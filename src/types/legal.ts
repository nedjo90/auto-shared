/** Common audit fields from the CDS `managed` aspect. */
interface IManagedFields {
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
}

/** Legal document key types (enum-like). */
export type LegalDocumentKey = "cgu" | "cgv" | "privacy_policy" | "legal_notices";

/** Master legal document record. */
export interface ILegalDocument extends IManagedFields {
  ID: string;
  key: LegalDocumentKey;
  title: string;
  currentVersion: number;
  requiresReacceptance: boolean;
  active: boolean;
}

/** Versioned content for a legal document. */
export interface ILegalDocumentVersion extends IManagedFields {
  ID: string;
  document_ID: string;
  version: number;
  content: string;
  summary: string;
  publishedAt: string | null;
  publishedBy: string | null;
  archived: boolean;
}

/** User acceptance record for a legal document version. */
export interface ILegalAcceptance extends IManagedFields {
  ID: string;
  user_ID: string;
  document_ID: string;
  documentKey: string;
  version: number;
  acceptedAt: string;
  ipAddress: string | null;
  userAgent: string | null;
}
