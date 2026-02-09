/**
 * Fields that are anonymized when a user requests account anonymization.
 * The values are the field names on the User entity.
 */
export const ANONYMIZATION_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "address",
  "addressStreet",
  "addressCity",
  "addressPostalCode",
  "addressCountry",
  "siret",
  "companyName",
  "avatarUrl",
  "bio",
  "displayName",
] as const;

export type AnonymizationField = (typeof ANONYMIZATION_FIELDS)[number];

/**
 * Sections included in the personal data export JSON.
 */
export const EXPORT_SECTIONS = [
  "profile",
  "consents",
  "listings",
  "messages",
  "declarations",
  "auditTrail",
] as const;

export type ExportSection = (typeof EXPORT_SECTIONS)[number];

/**
 * Confirmation word the user must type to confirm anonymization.
 */
export const ANONYMIZATION_CONFIRMATION_WORD = "ANONYMISER";
