export type ExportStatus = "pending" | "processing" | "ready" | "downloaded" | "expired";

export type AnonymizationStatus = "requested" | "confirmed" | "processing" | "completed" | "failed";

export interface IDataExportRequest {
  ID: string;
  user_ID: string;
  status: ExportStatus;
  requestedAt: string;
  completedAt: string | null;
  downloadUrl: string | null;
  expiresAt: string | null;
  fileSizeBytes: number | null;
}

export interface IAnonymizationRequest {
  ID: string;
  user_ID: string;
  status: AnonymizationStatus;
  requestedAt: string;
  confirmedAt: string | null;
  completedAt: string | null;
  anonymizedFields: string | null;
}

export interface IDataExportRequestResult {
  requestId: string;
  status: ExportStatus;
  estimatedCompletionMinutes: number;
}

export interface IExportDownloadResult {
  downloadUrl: string;
  expiresAt: string;
  fileSizeBytes: number;
}

export interface IAnonymizationRequestResult {
  requestId: string;
  status: AnonymizationStatus;
  message: string;
}

export interface IAnonymizationResult {
  success: boolean;
  message: string;
}

export interface IDataExportSection {
  section: string;
  data: unknown;
}

export interface IDataExportContent {
  exportedAt: string;
  userId: string;
  sections: IDataExportSection[];
}
