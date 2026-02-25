import { z } from "zod/v4";
import { MESSAGE_DELIVERY_STATUSES, CHAT_MAX_MESSAGE_LENGTH } from "../constants/chat.js";

// ─── Chat Validators (Story 5-1) ─────────────────────────────────────────

/** Delivery status enum schema. */
export const messageDeliveryStatusSchema = z.enum(MESSAGE_DELIVERY_STATUSES);

/** Schema for startOrResumeConversation action input. */
export const startConversationInputSchema = z.object({
  listingId: z.string().trim().min(1, "L'identifiant de l'annonce est requis"),
  buyerId: z.string().trim().min(1, "L'identifiant de l'acheteur est requis"),
});
export type StartConversationInput = z.infer<typeof startConversationInputSchema>;

/** Schema for sendMessage action input. */
export const sendMessageInputSchema = z.object({
  conversationId: z.string().trim().min(1, "L'identifiant de la conversation est requis"),
  content: z
    .string()
    .trim()
    .min(1, "Le message ne peut pas être vide")
    .max(
      CHAT_MAX_MESSAGE_LENGTH,
      `Le message ne peut pas dépasser ${CHAT_MAX_MESSAGE_LENGTH} caractères`,
    ),
});
export type SendMessageInput = z.infer<typeof sendMessageInputSchema>;

/** Schema for getMessages pagination input. */
export const getMessagesInputSchema = z.object({
  conversationId: z.string().trim().min(1, "L'identifiant de la conversation est requis"),
  cursor: z.string().optional(),
  limit: z.number().int().min(1).max(100).optional(),
});
export type GetMessagesInput = z.infer<typeof getMessagesInputSchema>;

/** Schema for markAsDelivered / markAsRead input. */
export const updateMessageStatusInputSchema = z.object({
  conversationId: z.string().trim().min(1, "L'identifiant de la conversation est requis"),
  messageIds: z.string().trim().min(1, "Les identifiants des messages sont requis"),
});
export type UpdateMessageStatusInput = z.infer<typeof updateMessageStatusInputSchema>;
