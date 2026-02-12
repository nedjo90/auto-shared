import type { AuditSeverity } from "../types/config.js";

/** All auditable action types in the platform. */
export const AUDITABLE_ACTIONS = [
  // Listing operations
  "listing.created",
  "listing.published",
  "listing.updated",
  "listing.deleted",
  "listing.moderated",
  // User operations
  "user.registered",
  "user.updated",
  "user.role_changed",
  "user.deactivated",
  // Config operations
  "config.created",
  "config.updated",
  "config.deleted",
  // Payment operations
  "payment.initiated",
  "payment.processed",
  "payment.refunded",
  // Moderation operations
  "moderation.action_taken",
  "moderation.appeal_reviewed",
  // Legal operations
  "legal.version_published",
  "legal.acceptance_recorded",
  // API provider operations
  "api_provider.status_changed",
  // Auth/permission operations
  "permission.denied",
  "alert.acknowledged",
  // Data management
  "data.exported",
  "data.anonymized",
  "audit.cleanup",
] as const;

export type AuditableAction = (typeof AUDITABLE_ACTIONS)[number];

/** Audit trail severity levels. */
export const AUDIT_SEVERITY_LEVELS: readonly AuditSeverity[] = [
  "info",
  "warning",
  "critical",
] as const;

/** French labels for auditable action categories. */
export const AUDIT_ACTION_CATEGORIES: Record<string, string> = {
  listing: "Annonces",
  user: "Utilisateurs",
  config: "Configuration",
  payment: "Paiements",
  moderation: "Moderation",
  legal: "Documents legaux",
  api_provider: "Fournisseurs API",
  permission: "Permissions",
  alert: "Alertes",
  data: "Donnees",
  audit: "Audit",
};
