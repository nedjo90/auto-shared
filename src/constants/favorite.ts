// ─── Favorites & Notifications (Story 4-4) ──────────────────────────────────

/** All notification types. */
export const NOTIFICATION_TYPES = [
  "price_change",
  "sold",
  "certification_update",
  "photos_added",
] as const;

/** Maximum number of favorites per user. */
export const MAX_FAVORITES_PER_USER = 100;

/** Default page size for favorites list. */
export const FAVORITES_PAGE_SIZE = 20;

/** Default page size for notifications list. */
export const NOTIFICATIONS_PAGE_SIZE = 20;
