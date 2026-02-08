import type { Role, RoleCode } from "../types/index.js";

export const ROLES: readonly Role[] = [
  "visitor",
  "buyer",
  "seller",
  "moderator",
  "administrator",
] as const;

export const ROLE_CODES: readonly RoleCode[] = [
  "visitor",
  "buyer",
  "seller",
  "moderator",
  "administrator",
] as const;

export const ROLE_HIERARCHY: Record<RoleCode, number> = {
  visitor: 0,
  buyer: 1,
  seller: 2,
  moderator: 3,
  administrator: 4,
} as const;

export const PERMISSION_CODES = [
  "listing.view",
  "listing.create",
  "listing.edit",
  "listing.moderate",
  "user.manage",
  "admin.access",
] as const;

export type PermissionCode = (typeof PERMISSION_CODES)[number];

export const CONSENT_TYPES = ["terms", "privacy", "marketing"] as const;

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
