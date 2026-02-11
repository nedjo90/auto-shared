import { z } from "zod";

export const alertComparisonOperatorSchema = z.enum(["above", "below", "equals"]);
export const alertNotificationMethodSchema = z.enum(["in_app", "email", "both"]);
export const alertSeverityLevelSchema = z.enum(["info", "warning", "critical"]);
export const alertMetricSchema = z.enum([
  "margin_per_listing",
  "api_availability",
  "daily_registrations",
  "daily_listings",
  "daily_revenue",
]);

export const configAlertInputSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Le nom de l'alerte est requis")
    .max(200, "Le nom ne doit pas depasser 200 caracteres"),
  metric: alertMetricSchema,
  thresholdValue: z.number({ message: "La valeur seuil doit etre un nombre" }),
  comparisonOperator: alertComparisonOperatorSchema,
  notificationMethod: alertNotificationMethodSchema,
  severityLevel: alertSeverityLevelSchema,
  cooldownMinutes: z
    .number()
    .int("Le cooldown doit etre un entier")
    .min(1, "Le cooldown minimum est de 1 minute")
    .max(10080, "Le cooldown maximum est de 7 jours (10080 minutes)"),
  enabled: z.boolean().optional().default(true),
});

export type ConfigAlertInput = z.infer<typeof configAlertInputSchema>;
