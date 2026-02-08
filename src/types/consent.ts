export type ConsentDecision = "granted" | "revoked";

export interface IConfigConsentType {
  ID: string;
  code: string;
  labelKey: string;
  descriptionKey: string;
  isMandatory: boolean;
  isActive: boolean;
  displayOrder: number;
  version: number;
  createdAt: string;
  modifiedAt: string;
  createdBy: string;
  modifiedBy: string;
}

export interface IUserConsent {
  ID: string;
  user_ID: string;
  consentType_ID: string;
  consentTypeVersion: number;
  decision: ConsentDecision;
  timestamp: string;
  ipAddress: string | null;
  userAgent: string | null;
}

export interface IConsentInput {
  consentTypeId: string;
  decision: ConsentDecision;
}
