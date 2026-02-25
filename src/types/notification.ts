// ─── Notification Types (Story 5-2) ──────────────────────────────────────────
// NOTE: INotification is defined in favorite.ts (with backward-compat `message` field)
// and exported from types/index.ts. Do NOT re-define it here.

import type { NotificationType } from "../constants/notification.js";

/** A user's notification preference for a specific type. */
export interface INotificationPreference {
  ID: string;
  userId: string;
  type: NotificationType;
  enabled: boolean;
}

/** A push subscription stored for a user device. */
export interface IPushSubscription {
  ID: string;
  userId: string;
  endpoint: string;
  p256dhKey: string;
  authKey: string;
  deviceLabel: string | null;
  createdAt: string;
}

/** Payload for notification:new SignalR event. */
export interface INotificationEvent {
  notificationId: string;
  type: NotificationType;
  title: string;
  body: string;
  actionUrl: string | null;
  listingId: string | null;
}

/** Payload for notification:unread-count SignalR event. */
export interface IUnreadCountEvent {
  count: number;
}

/** Input for creating a notification. */
export interface ICreateNotificationInput {
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  actionUrl?: string | null;
  listingId?: string | null;
}
