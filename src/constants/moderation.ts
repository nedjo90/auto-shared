import type { ReportTargetType, ReportStatus } from "../types/moderation.js";

/** Valid report target types. */
export const REPORT_TARGET_TYPES: readonly ReportTargetType[] = [
  "listing",
  "user",
  "chat",
] as const;

/** Valid report statuses. */
export const REPORT_STATUSES: readonly ReportStatus[] = [
  "pending",
  "in_progress",
  "treated",
  "dismissed",
] as const;

/** Maximum reports a user can submit per day. */
export const MAX_REPORTS_PER_USER_PER_DAY = 10;

/** Minimum description length for a report. */
export const REPORT_DESCRIPTION_MIN_LENGTH = 20;

/** Maximum description length for a report. */
export const REPORT_DESCRIPTION_MAX_LENGTH = 2000;

/** Page size for report listings in the moderation queue. */
export const REPORTS_PAGE_SIZE = 20;
