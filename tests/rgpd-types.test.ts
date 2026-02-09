import { describe, it, expect } from "vitest";
import {
  ANONYMIZATION_FIELDS,
  EXPORT_SECTIONS,
  EXPORT_STATUSES,
  ANONYMIZATION_STATUSES,
  ANONYMIZATION_CONFIRMATION_WORD,
} from "../src/constants/rgpd";
import type {
  ExportStatus,
  AnonymizationStatus,
  IDataExportRequest,
  IAnonymizationRequest,
  IDataExportRequestResult,
  IExportDownloadResult,
  IAnonymizationRequestResult,
  IAnonymizationResult,
  IDataExportSection,
  IDataExportContent,
} from "../src/types/rgpd";

describe("RGPD Constants", () => {
  it("should export ANONYMIZATION_FIELDS with all expected fields", () => {
    expect(ANONYMIZATION_FIELDS).toContain("firstName");
    expect(ANONYMIZATION_FIELDS).toContain("lastName");
    expect(ANONYMIZATION_FIELDS).toContain("email");
    expect(ANONYMIZATION_FIELDS).toContain("phone");
    expect(ANONYMIZATION_FIELDS).toContain("siret");
    expect(ANONYMIZATION_FIELDS).toContain("avatarUrl");
    expect(ANONYMIZATION_FIELDS).toContain("bio");
    expect(ANONYMIZATION_FIELDS).toContain("displayName");
    expect(ANONYMIZATION_FIELDS.length).toBeGreaterThanOrEqual(14);
  });

  it("should export EXPORT_SECTIONS with all expected sections", () => {
    expect(EXPORT_SECTIONS).toContain("profile");
    expect(EXPORT_SECTIONS).toContain("consents");
    expect(EXPORT_SECTIONS).toContain("listings");
    expect(EXPORT_SECTIONS).toContain("messages");
    expect(EXPORT_SECTIONS).toContain("declarations");
    expect(EXPORT_SECTIONS).toContain("auditTrail");
  });

  it("should export EXPORT_STATUSES as runtime array", () => {
    expect(EXPORT_STATUSES).toContain("pending");
    expect(EXPORT_STATUSES).toContain("processing");
    expect(EXPORT_STATUSES).toContain("ready");
    expect(EXPORT_STATUSES).toContain("downloaded");
    expect(EXPORT_STATUSES).toContain("expired");
    expect(EXPORT_STATUSES).toHaveLength(5);
  });

  it("should export ANONYMIZATION_STATUSES as runtime array", () => {
    expect(ANONYMIZATION_STATUSES).toContain("requested");
    expect(ANONYMIZATION_STATUSES).toContain("confirmed");
    expect(ANONYMIZATION_STATUSES).toContain("processing");
    expect(ANONYMIZATION_STATUSES).toContain("completed");
    expect(ANONYMIZATION_STATUSES).toContain("failed");
    expect(ANONYMIZATION_STATUSES).toHaveLength(5);
  });

  it("should export ANONYMIZATION_CONFIRMATION_WORD", () => {
    expect(ANONYMIZATION_CONFIRMATION_WORD).toBe("ANONYMISER");
  });
});

describe("RGPD Types", () => {
  it("should export all RGPD types from shared types index", async () => {
    const types = await import("../src/types/index");
    expect(types).toBeDefined();
  });

  it("should export RGPD constants from shared constants index", async () => {
    const constants = await import("../src/constants/index");
    expect(constants.ANONYMIZATION_FIELDS).toBeDefined();
    expect(constants.EXPORT_SECTIONS).toBeDefined();
    expect(constants.EXPORT_STATUSES).toBeDefined();
    expect(constants.ANONYMIZATION_STATUSES).toBeDefined();
    expect(constants.ANONYMIZATION_CONFIRMATION_WORD).toBeDefined();
  });

  it("should allow creating IDataExportRequest with correct fields", () => {
    const req: IDataExportRequest = {
      ID: "test-id",
      user_ID: "user-1",
      status: "pending",
      requestedAt: "2026-01-01T00:00:00Z",
      completedAt: null,
      downloadUrl: null,
      expiresAt: null,
      fileSizeBytes: null,
    };
    expect(req.ID).toBe("test-id");
    expect(req.status).toBe("pending");
  });

  it("should allow creating IAnonymizationRequest with correct fields", () => {
    const req: IAnonymizationRequest = {
      ID: "anon-id",
      user_ID: "user-1",
      status: "requested",
      requestedAt: "2026-01-01T00:00:00Z",
      confirmedAt: null,
      completedAt: null,
      anonymizedFields: null,
    };
    expect(req.ID).toBe("anon-id");
    expect(req.status).toBe("requested");
  });

  it("should allow creating IDataExportRequestResult", () => {
    const result: IDataExportRequestResult = {
      requestId: "req-1",
      status: "pending",
      estimatedCompletionMinutes: 5,
    };
    expect(result.requestId).toBe("req-1");
    expect(result.estimatedCompletionMinutes).toBe(5);
  });

  it("should allow creating IAnonymizationRequestResult with confirmationCode", () => {
    const result: IAnonymizationRequestResult = {
      requestId: "anon-req-1",
      status: "requested",
      message: "Please confirm",
      confirmationCode: "123456",
    };
    expect(result.requestId).toBe("anon-req-1");
    expect(result.confirmationCode).toBe("123456");
  });

  it("should allow creating IAnonymizationResult with requestId", () => {
    const result: IAnonymizationResult = {
      success: true,
      requestId: "anon-1",
      message: "Anonymization completed",
    };
    expect(result.success).toBe(true);
    expect(result.requestId).toBe("anon-1");
  });

  it("should allow creating IExportDownloadResult", () => {
    const result: IExportDownloadResult = {
      downloadUrl: "https://storage.example.com/export.json",
      expiresAt: "2026-01-02T00:00:00Z",
      fileSizeBytes: 2048,
    };
    expect(result.downloadUrl).toBe("https://storage.example.com/export.json");
    expect(result.fileSizeBytes).toBe(2048);
  });

  it("should allow creating IDataExportSection with typed section name", () => {
    const section: IDataExportSection = {
      section: "profile",
      data: { name: "Test" },
    };
    expect(section.section).toBe("profile");
  });

  it("should allow creating IDataExportContent with typed sections", () => {
    const content: IDataExportContent = {
      exportedAt: "2026-01-01T00:00:00Z",
      userId: "user-1",
      sections: [
        { section: "profile", data: { name: "Test" } },
        { section: "consents", data: [] },
      ],
    };
    expect(content.sections).toHaveLength(2);
    expect(content.sections[0].section).toBe("profile");
  });

  it("should enforce ExportStatus type at compile time", () => {
    const status: ExportStatus = "ready";
    expect(EXPORT_STATUSES).toContain(status);
  });

  it("should enforce AnonymizationStatus type at compile time", () => {
    const status: AnonymizationStatus = "completed";
    expect(ANONYMIZATION_STATUSES).toContain(status);
  });
});
