// ─── Notification Constants (Story 5-2) ─────────────────────────────────────

/** All notification types across the platform. */
export const NOTIFICATION_TYPES = [
  "price_change",
  "sold",
  "certification_update",
  "photos_added",
  "new_message",
  "new_view",
  "new_contact",
  "report_handled",
  "system",
] as const;
export type NotificationType = (typeof NOTIFICATION_TYPES)[number];

/** Notification types that can be triggered by user preferences. */
export const PREFERENCE_NOTIFICATION_TYPES = [
  "price_change",
  "sold",
  "certification_update",
  "photos_added",
  "new_message",
  "new_view",
  "new_contact",
  "report_handled",
] as const;

/** Human-readable labels for notification types (French). */
export const NOTIFICATION_TYPE_LABELS: Record<NotificationType, string> = {
  price_change: "Changement de prix",
  sold: "Véhicule vendu",
  certification_update: "Mise à jour de certification",
  photos_added: "Photos ajoutées",
  new_message: "Nouveau message",
  new_view: "Nouvelle vue",
  new_contact: "Nouveau contact",
  report_handled: "Signalement traité",
  system: "Système",
};

/** SignalR hub name for notifications. */
export const NOTIFICATION_HUB_NAME = "notifications";

/** SignalR event names for notifications domain. */
export const NOTIFICATION_EVENTS = {
  newNotification: "notification:new",
  unreadCountUpdate: "notification:unread-count",
} as const;
export type NotificationEvent = (typeof NOTIFICATION_EVENTS)[keyof typeof NOTIFICATION_EVENTS];

/** Default page size for notifications list. */
export const NOTIFICATIONS_PAGE_SIZE = 20;

/** VAPID public key env var name. */
export const VAPID_PUBLIC_KEY_ENV = "NEXT_PUBLIC_VAPID_PUBLIC_KEY";
