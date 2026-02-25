/**
 * Listing field metadata - defines which fields are certifiable (via adapters)
 * vs declaredOnly (seller input only), plus validation constraints.
 */

export type FieldCategory =
  | "vehicle_identity"
  | "technical_details"
  | "condition_description"
  | "pricing"
  | "options_equipment";

export type FieldType = "certifiable" | "declaredOnly";

export interface ListingFieldMeta {
  fieldName: string;
  fieldType: FieldType;
  category: FieldCategory;
  labelFr: string;
  required: boolean;
}

/**
 * All listing fields with their metadata.
 * Certifiable fields can be populated by adapters (Story 3-2 auto-fill)
 * and retain source/certification info. DeclaredOnly fields are always
 * seller-input.
 */
export const LISTING_FIELDS: readonly ListingFieldMeta[] = [
  // ─── Vehicle Identity (mostly certifiable) ──────────────────────────────
  {
    fieldName: "plate",
    fieldType: "certifiable",
    category: "vehicle_identity",
    labelFr: "Plaque d'immatriculation",
    required: false,
  },
  {
    fieldName: "vin",
    fieldType: "certifiable",
    category: "vehicle_identity",
    labelFr: "Numéro VIN",
    required: false,
  },
  {
    fieldName: "make",
    fieldType: "certifiable",
    category: "vehicle_identity",
    labelFr: "Marque",
    required: true,
  },
  {
    fieldName: "model",
    fieldType: "certifiable",
    category: "vehicle_identity",
    labelFr: "Modèle",
    required: true,
  },
  {
    fieldName: "variant",
    fieldType: "certifiable",
    category: "vehicle_identity",
    labelFr: "Variante",
    required: false,
  },
  {
    fieldName: "year",
    fieldType: "certifiable",
    category: "vehicle_identity",
    labelFr: "Année",
    required: true,
  },
  {
    fieldName: "registrationDate",
    fieldType: "certifiable",
    category: "vehicle_identity",
    labelFr: "Date de mise en circulation",
    required: false,
  },

  // ─── Technical Details (mix of certifiable and declared) ────────────────
  {
    fieldName: "fuelType",
    fieldType: "certifiable",
    category: "technical_details",
    labelFr: "Carburant",
    required: true,
  },
  {
    fieldName: "engineCapacityCc",
    fieldType: "certifiable",
    category: "technical_details",
    labelFr: "Cylindrée (cc)",
    required: false,
  },
  {
    fieldName: "powerKw",
    fieldType: "certifiable",
    category: "technical_details",
    labelFr: "Puissance (kW)",
    required: false,
  },
  {
    fieldName: "powerHp",
    fieldType: "certifiable",
    category: "technical_details",
    labelFr: "Puissance (ch)",
    required: false,
  },
  {
    fieldName: "gearbox",
    fieldType: "certifiable",
    category: "technical_details",
    labelFr: "Boîte de vitesses",
    required: false,
  },
  {
    fieldName: "bodyType",
    fieldType: "certifiable",
    category: "technical_details",
    labelFr: "Type de carrosserie",
    required: false,
  },
  {
    fieldName: "doors",
    fieldType: "certifiable",
    category: "technical_details",
    labelFr: "Nombre de portes",
    required: false,
  },
  {
    fieldName: "seats",
    fieldType: "certifiable",
    category: "technical_details",
    labelFr: "Nombre de places",
    required: false,
  },
  {
    fieldName: "color",
    fieldType: "certifiable",
    category: "technical_details",
    labelFr: "Couleur",
    required: false,
  },
  {
    fieldName: "co2GKm",
    fieldType: "certifiable",
    category: "technical_details",
    labelFr: "CO₂ (g/km)",
    required: false,
  },
  {
    fieldName: "euroNorm",
    fieldType: "certifiable",
    category: "technical_details",
    labelFr: "Norme Euro",
    required: false,
  },
  {
    fieldName: "energyClass",
    fieldType: "certifiable",
    category: "technical_details",
    labelFr: "Classe énergie",
    required: false,
  },
  {
    fieldName: "critAirLevel",
    fieldType: "certifiable",
    category: "technical_details",
    labelFr: "Vignette Crit'Air",
    required: false,
  },
  {
    fieldName: "critAirLabel",
    fieldType: "certifiable",
    category: "technical_details",
    labelFr: "Label Crit'Air",
    required: false,
  },
  {
    fieldName: "critAirColor",
    fieldType: "certifiable",
    category: "technical_details",
    labelFr: "Couleur Crit'Air",
    required: false,
  },
  // VIN-technical certifiable fields
  {
    fieldName: "bodyClass",
    fieldType: "certifiable",
    category: "technical_details",
    labelFr: "Type de carrosserie (VIN)",
    required: false,
  },
  {
    fieldName: "engineCylinders",
    fieldType: "certifiable",
    category: "technical_details",
    labelFr: "Nombre de cylindres",
    required: false,
  },
  {
    fieldName: "manufacturer",
    fieldType: "certifiable",
    category: "technical_details",
    labelFr: "Constructeur",
    required: false,
  },
  {
    fieldName: "vehicleType",
    fieldType: "certifiable",
    category: "technical_details",
    labelFr: "Type de véhicule",
    required: false,
  },
  {
    fieldName: "plantCountry",
    fieldType: "certifiable",
    category: "technical_details",
    labelFr: "Pays de fabrication",
    required: false,
  },
  {
    fieldName: "recallCount",
    fieldType: "certifiable",
    category: "technical_details",
    labelFr: "Nombre de rappels",
    required: false,
  },
  {
    fieldName: "mileage",
    fieldType: "declaredOnly",
    category: "technical_details",
    labelFr: "Kilométrage",
    required: true,
  },
  {
    fieldName: "transmission",
    fieldType: "declaredOnly",
    category: "technical_details",
    labelFr: "Transmission",
    required: false,
  },
  {
    fieldName: "driveType",
    fieldType: "declaredOnly",
    category: "technical_details",
    labelFr: "Type de traction",
    required: false,
  },
  {
    fieldName: "numberOfDoors",
    fieldType: "declaredOnly",
    category: "technical_details",
    labelFr: "Nombre de portes (déclaré)",
    required: false,
  },
  {
    fieldName: "interiorColor",
    fieldType: "declaredOnly",
    category: "technical_details",
    labelFr: "Couleur intérieur",
    required: false,
  },
  {
    fieldName: "exteriorColor",
    fieldType: "declaredOnly",
    category: "technical_details",
    labelFr: "Couleur extérieur",
    required: false,
  },

  // ─── Condition & Description ────────────────────────────────────────────
  {
    fieldName: "condition",
    fieldType: "declaredOnly",
    category: "condition_description",
    labelFr: "État général",
    required: true,
  },
  {
    fieldName: "description",
    fieldType: "declaredOnly",
    category: "condition_description",
    labelFr: "Description",
    required: true,
  },

  // ─── Pricing ────────────────────────────────────────────────────────────
  {
    fieldName: "price",
    fieldType: "declaredOnly",
    category: "pricing",
    labelFr: "Prix (€)",
    required: true,
  },

  // ─── Options & Equipment ────────────────────────────────────────────────
  {
    fieldName: "options",
    fieldType: "declaredOnly",
    category: "options_equipment",
    labelFr: "Options et équipements",
    required: false,
  },
] as const;

/**
 * Valid condition enum values.
 */
export const LISTING_CONDITIONS = ["Excellent", "Bon", "Correct", "A_restaurer"] as const;
export type ListingCondition = (typeof LISTING_CONDITIONS)[number];

/**
 * Field category labels (French).
 */
export const FIELD_CATEGORY_LABELS: Record<FieldCategory, string> = {
  vehicle_identity: "Identité du véhicule",
  technical_details: "Détails techniques",
  condition_description: "État et description",
  pricing: "Tarification",
  options_equipment: "Options et équipements",
};

/**
 * Field category display order.
 */
export const FIELD_CATEGORY_ORDER: readonly FieldCategory[] = [
  "vehicle_identity",
  "technical_details",
  "condition_description",
  "pricing",
  "options_equipment",
];

/**
 * Certifiable field names (can come from adapters).
 */
export const CERTIFIABLE_FIELDS = LISTING_FIELDS.filter((f) => f.fieldType === "certifiable").map(
  (f) => f.fieldName,
);

/**
 * Declared-only field names (always seller input).
 */
export const DECLARED_ONLY_FIELDS = LISTING_FIELDS.filter(
  (f) => f.fieldType === "declaredOnly",
).map((f) => f.fieldName);

/**
 * Validation constraints for declared fields.
 */
export const LISTING_VALIDATION = {
  price: { min: 0.01, max: 9999999.99 },
  mileage: { min: 0, max: 9999999 },
  description: { minLength: 20, maxLength: 5000 },
  condition: { values: LISTING_CONDITIONS },
  transmission: { values: ["manuelle", "automatique"] as const },
  driveType: { values: ["traction", "propulsion", "integrale"] as const },
} as const;

// ─── Card Display Config (Story 4-1) ──────────────────────────────────────

import type { CardFieldType } from "../types/listing.js";

/** Default fields displayed on listing cards (order matters). */
export interface DefaultCardField {
  fieldName: string;
  displayOrder: number;
  labelFr: string;
  labelEn: string;
  fieldType: CardFieldType;
}

export const DEFAULT_CARD_FIELDS: readonly DefaultCardField[] = [
  { fieldName: "price", displayOrder: 1, labelFr: "Prix", labelEn: "Price", fieldType: "price" },
  { fieldName: "make", displayOrder: 2, labelFr: "Marque", labelEn: "Make", fieldType: "text" },
  { fieldName: "model", displayOrder: 3, labelFr: "Modèle", labelEn: "Model", fieldType: "text" },
  { fieldName: "year", displayOrder: 4, labelFr: "Année", labelEn: "Year", fieldType: "text" },
  {
    fieldName: "mileage",
    displayOrder: 5,
    labelFr: "Kilométrage",
    labelEn: "Mileage",
    fieldType: "text",
  },
  {
    fieldName: "fuelType",
    displayOrder: 6,
    labelFr: "Carburant",
    labelEn: "Fuel Type",
    fieldType: "badge",
  },
  {
    fieldName: "visibilityLabel",
    displayOrder: 7,
    labelFr: "Certification",
    labelEn: "Certification",
    fieldType: "badge",
  },
] as const;

// ─── Market Price Thresholds (Story 4-3) ──────────────────────────────────

/** Thresholds for market price position classification.
 * below: diff <= -5%, aligned: -5% < diff < 5%, above: diff >= 5% */
export const MARKET_PRICE_THRESHOLDS = {
  belowMaxPercent: -5,
  aboveMinPercent: 5,
} as const;

/** Certification levels based on certified field ratio. */
export const CERTIFICATION_LEVELS = [
  "tres_documente",
  "bien_documente",
  "partiellement_documente",
] as const;

/** Certification level thresholds (percentage of certified fields). */
export const CERTIFICATION_LEVEL_THRESHOLDS = {
  tres_documente: 80,
  bien_documente: 50,
} as const;

/** Pagination defaults for listing search. */
export const LISTING_PAGE_SIZE = 20;

// ─── Search Sort Options (Story 4-2) ────────────────────────────────────

/** Available sort options for marketplace search results. */
export const SEARCH_SORT_OPTIONS = [
  { value: "relevance", labelFr: "Pertinence", labelEn: "Relevance" },
  { value: "price_asc", labelFr: "Prix croissant", labelEn: "Price: Low to High" },
  { value: "price_desc", labelFr: "Prix décroissant", labelEn: "Price: High to Low" },
  { value: "date_desc", labelFr: "Plus récentes", labelEn: "Most Recent" },
  { value: "mileage_asc", labelFr: "Kilométrage", labelEn: "Mileage: Low to High" },
] as const;

/** Default search sort option. */
export const DEFAULT_SEARCH_SORT = "relevance" as const;

/** Debounce delay (ms) for filter changes before triggering API call. */
export const SEARCH_DEBOUNCE_MS = 300;

// ─── Photo Constants (Story 3-4) ──────────────────────────────────────────

/** Allowed MIME types for photo upload. */
export const PHOTO_ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
] as const;

/** Default max photos per listing (overridable via ConfigParameter MAX_PHOTOS). */
export const PHOTO_DEFAULT_MAX = 20;

/** Default max file size in bytes (overridable via ConfigParameter MAX_PHOTO_SIZE_BYTES). */
export const PHOTO_DEFAULT_MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10MB raw upload limit

/** Photo weight in visibility score calculation. */
export const PHOTO_VISIBILITY_WEIGHT = 10;

// ─── Seller Dashboard KPIs (Story 6-1) ──────────────────────────────────

/** Available seller KPI metrics. */
export const SELLER_KPI_METRICS = [
  "activeListings",
  "totalViews",
  "totalContacts",
  "avgDaysOnline",
] as const;

/** French labels for seller KPI metrics. */
export const SELLER_KPI_LABELS: Record<(typeof SELLER_KPI_METRICS)[number], string> = {
  activeListings: "Annonces actives",
  totalViews: "Vues totales",
  totalContacts: "Contacts reçus",
  avgDaysOnline: "Jours en ligne (moy.)",
};

/** KPI trend comparison period in days. */
export const SELLER_KPI_PERIOD_DAYS = 30;

/** Seller listings performance table page size. */
export const SELLER_LISTINGS_PAGE_SIZE = 20;

/** Available drilldown periods (days). */
export const SELLER_DRILLDOWN_PERIODS = [7, 30, 90] as const;

/** Sort columns for seller listing performance table. */
export const SELLER_LISTING_SORT_COLUMNS = [
  "title",
  "price",
  "viewCount",
  "chatCount",
  "daysOnMarket",
  "visibilityScore",
] as const;

export type SellerListingSortColumn = (typeof SELLER_LISTING_SORT_COLUMNS)[number];
