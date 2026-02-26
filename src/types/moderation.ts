/** Report target types. */
export type ReportTargetType = "listing" | "user" | "chat";

/** Report status values. */
export type ReportStatus = "pending" | "in_progress" | "treated" | "dismissed";

/** Report submission input from the frontend. */
export interface IReportSubmission {
  targetType: ReportTargetType;
  targetId: string;
  reasonId: string;
  description: string;
}

/** Report submission result returned after successful creation. */
export interface IReportSubmissionResult {
  reportId: string;
  status: ReportStatus;
  createdAt: string;
}

/** Full report record (for moderation queue). */
export interface IReport {
  ID: string;
  reporterId: string;
  reporterName: string | null;
  targetType: ReportTargetType;
  targetId: string;
  targetLabel: string | null;
  reasonId: string;
  reasonLabel: string;
  severity: import("./config.js").ReportSeverity;
  description: string;
  status: ReportStatus;
  assignedTo: string | null;
  createdAt: string;
  updatedAt: string | null;
}

/** Moderation queue metrics summary. */
export interface IReportMetrics {
  pendingCount: number;
  inProgressCount: number;
  treatedThisWeek: number;
  dismissedThisWeek: number;
  weeklyTrend: number;
}

/** Report detail with full context. */
export interface IReportDetail extends IReport {
  reporterEmail: string | null;
  targetData: string | null;
  relatedReportsCount: number;
}

/** Sort options for the report queue. */
export type ReportSortOption = "severity" | "date" | "status";

/** Moderation action types. */
export type ModerationActionType =
  | "deactivate_listing"
  | "deactivate_account"
  | "warning"
  | "reactivate_listing"
  | "reactivate_account"
  | "dismiss";

/** Moderation action record. */
export interface IModerationAction {
  ID: string;
  reportId: string | null;
  moderatorId: string;
  actionType: ModerationActionType;
  reason: string | null;
  targetType: ReportTargetType;
  targetId: string;
  createdAt: string;
}

/** Result returned after a moderation action. */
export interface IModerationActionResult {
  success: boolean;
  actionId: string;
  message: string;
}

/** Violation pattern severity levels. */
export type PatternSeverity = "info" | "warning" | "critical";

/** Violation pattern types detected in seller history. */
export type PatternType =
  | "frequentReports"
  | "repeatedWarnings"
  | "repeatOffender"
  | "sameReasonPattern";

/** A detected violation pattern for a seller. */
export interface IViolationPattern {
  type: PatternType;
  description: string;
  count: number;
  period: string | null;
  severity: PatternSeverity;
}

/** A moderation timeline event for the seller history view. */
export interface ISellerTimelineEvent {
  id: string;
  date: string;
  eventType: ModerationActionType | "report";
  description: string;
  outcome: string | null;
  moderatorId: string | null;
  reportId: string | null;
  reason: string | null;
}

/** Seller statistics for the history view. */
export interface ISellerStatistics {
  totalListings: number;
  activeListings: number;
  reportsReceived: number;
  warningsReceived: number;
  suspensions: number;
  certificationRate: number;
}

/** Full seller history response from the backend. */
export interface ISellerHistory {
  sellerId: string;
  displayName: string;
  memberSince: string;
  accountStatus: string;
  statistics: ISellerStatistics;
  patterns: IViolationPattern[];
  timeline: ISellerTimelineEvent[];
}
