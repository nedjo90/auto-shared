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
