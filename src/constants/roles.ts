import type { RoleCode, PermissionCode } from "../types/index.js";

export const ROLES: readonly RoleCode[] = [
  "visitor",
  "buyer",
  "seller",
  "moderator",
  "administrator",
] as const;

/** @deprecated Use ROLES instead */
export const ROLE_CODES = ROLES;

export const ROLE_HIERARCHY: Readonly<Record<RoleCode, number>> = {
  visitor: 0,
  buyer: 1,
  seller: 2,
  moderator: 3,
  administrator: 4,
};

export const PERMISSION_CODES: readonly PermissionCode[] = [
  "listing.view",
  "listing.create",
  "listing.edit",
  "listing.moderate",
  "user.manage",
  "admin.access",
] as const;

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
