// ─── Chat Constants (Story 5-1) ──────────────────────────────────────────

/** Delivery status values for chat messages. */
export const MESSAGE_DELIVERY_STATUSES = ["sent", "delivered", "read"] as const;
export type MessageDeliveryStatus = (typeof MESSAGE_DELIVERY_STATUSES)[number];

/** Valid delivery status transitions. */
export const MESSAGE_STATUS_TRANSITIONS: Record<
  MessageDeliveryStatus,
  readonly MessageDeliveryStatus[]
> = {
  sent: ["delivered", "read"],
  delivered: ["read"],
  read: [],
};

/** Check if a delivery status transition is valid. */
export function isValidMessageStatusTransition(
  from: MessageDeliveryStatus,
  to: MessageDeliveryStatus,
): boolean {
  return MESSAGE_STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}

/** Maximum message content length. */
export const CHAT_MAX_MESSAGE_LENGTH = 2000;

/** Default page size for message pagination. */
export const CHAT_MESSAGES_PAGE_SIZE = 50;

/** Default page size for conversation list. */
export const CHAT_CONVERSATIONS_PAGE_SIZE = 20;

/** SignalR hub name for chat. */
export const CHAT_HUB_NAME = "chat";

/** SignalR event names for chat domain. */
export const CHAT_EVENTS = {
  messageSent: "chat:message-sent",
  messageDelivered: "chat:message-delivered",
  messageRead: "chat:message-read",
} as const;
export type ChatEvent = (typeof CHAT_EVENTS)[keyof typeof CHAT_EVENTS];
