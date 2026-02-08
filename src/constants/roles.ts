import type { Role } from "../types/index.js";

export const ROLES: readonly Role[] = [
  "buyer",
  "private_seller",
  "professional_seller",
  "moderator",
  "admin",
] as const;

export const CONSENT_TYPES = [
  "terms",
  "privacy",
  "marketing",
] as const;

export type ConsentType = (typeof CONSENT_TYPES)[number];

export const LISTING_STATUS = [
  "draft",
  "pending_review",
  "published",
  "rejected",
  "expired",
  "sold",
  "archived",
] as const;

export type ListingStatus = (typeof LISTING_STATUS)[number];
