import { z } from "zod/v4";
import { NOTIFICATION_TYPES, PREFERENCE_NOTIFICATION_TYPES } from "../constants/notification.js";

// ─── Notification Validators (Story 5-2) ────────────────────────────────────

/** Notification type enum schema. */
export const notificationTypeSchema = z.enum(NOTIFICATION_TYPES);

/** Schema for updating a notification preference. */
export const updateNotificationPreferenceSchema = z.object({
  type: z.enum(PREFERENCE_NOTIFICATION_TYPES, {
    error: "Type de notification invalide",
  }),
  enabled: z.boolean({ error: "Le champ activé est requis" }),
});
export type UpdateNotificationPreferenceInput = z.infer<typeof updateNotificationPreferenceSchema>;

/** Schema for registering a push subscription. */
export const registerPushSubscriptionSchema = z.object({
  endpoint: z.string().trim().url("L'URL du endpoint est invalide"),
  p256dhKey: z.string().trim().min(1, "La clé p256dh est requise"),
  authKey: z.string().trim().min(1, "La clé auth est requise"),
  deviceLabel: z.string().trim().max(100).optional(),
});
export type RegisterPushSubscriptionInput = z.infer<typeof registerPushSubscriptionSchema>;
