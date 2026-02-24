import { z } from "zod";

// ─── Payment Validators (Story 3-9) ──────────────────────────────────────

export const batchPublishRequestSchema = z.object({
  listingIds: z
    .array(z.string().uuid("ID d'annonce invalide"))
    .min(1, "Au moins une annonce doit etre selectionnee")
    .max(50, "Maximum 50 annonces par lot"),
});

export type BatchPublishRequest = z.infer<typeof batchPublishRequestSchema>;

export const checkoutSessionRequestSchema = z.object({
  listingIds: z
    .array(z.string().uuid("ID d'annonce invalide"))
    .min(1, "Au moins une annonce doit etre selectionnee")
    .max(50, "Maximum 50 annonces par lot"),
  successUrl: z.string().url("URL de succes invalide"),
  cancelUrl: z.string().url("URL d'annulation invalide"),
});

export type CheckoutSessionRequest = z.infer<typeof checkoutSessionRequestSchema>;
