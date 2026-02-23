// ─── Visibility Score Constants (Story 3-5) ─────────────────────────────────

import type { VisibilityScoreWeights } from "../types/visibility-score.js";

/** ConfigBoostFactor key prefix for visibility score weights. */
export const VISIBILITY_CONFIG_PREFIX = "visibility.";

/** ConfigBoostFactor keys for visibility score configuration. */
export const VISIBILITY_CONFIG_KEYS = {
  certifiedFieldWeight: "visibility.certifiedField",
  declaredFieldWeight: "visibility.declaredField",
  photoWeight: "visibility.photo",
  photoMax: "visibility.photoMax",
  historyReportWeight: "visibility.historyReport",
  descriptionBonusWeight: "visibility.descriptionBonus",
  descriptionMinLength: "visibility.descriptionMinLength",
  ageThreshold: "visibility.ageThreshold",
  ageNormalizationFactor: "visibility.ageNormFactor",
  labelThresholdLow: "visibility.labelThresholdLow",
  labelThresholdHigh: "visibility.labelThresholdHigh",
} as const;

/** Default weights used when ConfigBoostFactor entries are not available. */
export const DEFAULT_VISIBILITY_WEIGHTS: VisibilityScoreWeights = {
  certifiedFieldWeight: 5,
  declaredFieldWeight: 2,
  photoWeight: 3,
  photoMax: 10,
  historyReportWeight: 10,
  descriptionBonusWeight: 5,
  descriptionMinLength: 100,
  ageThreshold: 15,
  ageNormalizationFactor: 0.8,
  labelThresholdLow: 34,
  labelThresholdHigh: 67,
};

/** Visibility score labels (French). */
export const VISIBILITY_LABELS = {
  low: "Partiellement documenté",
  medium: "Bien documenté",
  high: "Très documenté",
} as const;

export type VisibilityLabel = (typeof VISIBILITY_LABELS)[keyof typeof VISIBILITY_LABELS];

/** Suggestion messages for missing fields (French, positive tone). */
export const VISIBILITY_SUGGESTIONS: Record<string, string> = {
  // High-impact fields
  price: "Indiquez le prix pour attirer plus d'acheteurs",
  description: "Ajoutez une description détaillée pour mieux présenter votre véhicule",
  mileage: "Renseignez le kilométrage pour rassurer les acheteurs",
  condition: "Précisez l'état du véhicule pour gagner en visibilité",
  make: "Indiquez la marque du véhicule",
  model: "Renseignez le modèle pour faciliter la recherche",
  year: "Ajoutez l'année pour mieux positionner votre annonce",
  fuelType: "Précisez le type de carburant",

  // Photos
  photo: "Ajoutez des photos pour augmenter l'attractivité de votre annonce",

  // History report
  historyReport: "Ajoutez un rapport d'historique pour gagner en confiance",

  // Description bonus
  descriptionBonus: "Enrichissez votre description pour gagner en visibilité",

  // Technical fields
  plate: "Renseignez la plaque pour certifier les données du véhicule",
  vin: "Ajoutez le VIN pour des données techniques certifiées",
  gearbox: "Précisez la boîte de vitesses",
  bodyType: "Indiquez le type de carrosserie",
  color: "Ajoutez la couleur du véhicule",
  options: "Listez les options et équipements pour valoriser votre véhicule",
  transmission: "Précisez le type de transmission",
  engineCapacityCc: "Renseignez la cylindrée",
  powerKw: "Indiquez la puissance en kW",
  powerHp: "Ajoutez la puissance en chevaux",
  registrationDate: "Renseignez la date de mise en circulation",
  co2GKm: "Ajoutez les émissions CO₂",
  euroNorm: "Précisez la norme Euro",
  interiorColor: "Indiquez la couleur intérieure",
  exteriorColor: "Précisez la couleur extérieure",
  doors: "Renseignez le nombre de portes",
  seats: "Indiquez le nombre de places",
};
