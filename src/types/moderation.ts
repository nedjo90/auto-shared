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
