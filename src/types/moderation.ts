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
  targetType: ReportTargetType;
  targetId: string;
  reasonId: string;
  reasonLabel: string;
  severity: import("./config.js").ReportSeverity;
  description: string;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string | null;
}
