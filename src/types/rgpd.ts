import type { ExportStatus, AnonymizationStatus, ExportSection } from "../constants/rgpd.js";

export type { ExportStatus, AnonymizationStatus };

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
  estimatedCompletionMinutes: number | null;
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
  confirmationCode: string;
}

export interface IAnonymizationResult {
  success: boolean;
  requestId: string;
  message: string;
}

export interface IDataExportSection {
  section: ExportSection;
  data: unknown;
}

export interface IDataExportContent {
  exportedAt: string;
  userId: string;
  sections: IDataExportSection[];
}
