import type { IManagedFields } from "./common.js";
import type { MessageDeliveryStatus } from "../constants/chat.js";

// ─── Chat Types (Story 5-1) ──────────────────────────────────────────────

/** A conversation between a buyer and seller about a specific listing. */
export interface IConversation extends IManagedFields {
  ID: string;
  buyerId: string;
  sellerId: string;
  listingId: string;
  lastMessageAt: string | null;
}

/** A single chat message within a conversation. */
export interface IChatMessage {
  ID: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: string;
  deliveryStatus: MessageDeliveryStatus;
}

/** Result of startOrResumeConversation action. */
export interface IStartConversationResult {
  conversationId: string;
  isNew: boolean;
}

/** Result of sendMessage action. */
export interface ISendMessageResult {
  messageId: string;
  timestamp: string;
  deliveryStatus: MessageDeliveryStatus;
}

/** A conversation with aggregated data for the conversation list. */
export interface IConversationListItem {
  conversationId: string;
  listingId: string;
  listingTitle: string;
  listingPhoto: string | null;
  listingPrice: number | null;
  otherPartyId: string;
  otherPartyName: string;
  lastMessage: string | null;
  lastMessageAt: string | null;
  unreadCount: number;
}

/** Paginated message thread result. */
export interface IChatMessagePage {
  messages: IChatMessage[];
  hasMore: boolean;
  cursor: string | null;
}

/** Payload for chat:message-sent SignalR event. */
export interface IChatMessageEvent {
  conversationId: string;
  messageId: string;
  senderId: string;
  content: string;
  timestamp: string;
  listingId: string;
}

/** Payload for chat:message-delivered / chat:message-read SignalR event. */
export interface IChatStatusEvent {
  conversationId: string;
  messageId: string;
  status: MessageDeliveryStatus;
}
