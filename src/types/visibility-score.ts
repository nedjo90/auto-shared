// ─── Visibility Score (Story 3-5) ─────────────────────────────────────────

/** Suggestion for improving visibility score. */
export interface ScoreSuggestion {
  field: string;
  message: string;
  boost: number;
}

/** Full result of a visibility score calculation. */
export interface VisibilityScoreResult {
  score: number; // 0-100
  label: string;
  suggestions: ScoreSuggestion[];
  normalizedScore?: number;
  normalizationMessage?: string;
}

/** Input data for visibility score calculation. */
export interface VisibilityScoreInput {
  listing: Record<string, unknown>;
  photoCount: number;
  hasHistoryReport: boolean;
}

/** Configurable weights for visibility score calculation. */
export interface VisibilityScoreWeights {
  certifiedFieldWeight: number;
  declaredFieldWeight: number;
  photoWeight: number;
  photoMax: number;
  historyReportWeight: number;
  descriptionBonusWeight: number;
  descriptionMinLength: number;
  ageThreshold: number;
  ageNormalizationFactor: number;
  labelThresholdLow: number;
  labelThresholdHigh: number;
}
