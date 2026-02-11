import type {
  AlertComparisonOperator,
  AlertNotificationMethod,
  AlertSeverityLevel,
  AlertMetric,
} from "../types/config.js";

/** Available alert metrics. */
export const ALERT_METRICS: readonly AlertMetric[] = [
  "margin_per_listing",
  "api_availability",
  "daily_registrations",
  "daily_listings",
  "daily_revenue",
] as const;

/** Alert comparison operators. */
export const ALERT_COMPARISON_OPERATORS: readonly AlertComparisonOperator[] = [
  "above",
  "below",
  "equals",
] as const;

/** Alert notification methods. */
export const ALERT_NOTIFICATION_METHODS: readonly AlertNotificationMethod[] = [
  "in_app",
  "email",
  "both",
] as const;

/** Alert severity levels. */
export const ALERT_SEVERITY_LEVELS: readonly AlertSeverityLevel[] = [
  "info",
  "warning",
  "critical",
] as const;
