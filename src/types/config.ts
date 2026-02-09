/** Common audit fields from the CDS `managed` aspect. */
interface IManagedFields {
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
}

/** Config parameter type values. */
export type ConfigParameterType = "string" | "integer" | "decimal" | "boolean";

/** Report severity levels. */
export type ReportSeverity = "low" | "medium" | "high" | "critical";

/** API provider status values. */
export type ApiProviderStatus = "active" | "inactive" | "deprecated";

export interface IConfigRegistrationField extends IManagedFields {
  ID: string;
  fieldName: string;
  fieldType: string;
  isRequired: boolean;
  isVisible: boolean;
  displayOrder: number;
  validationPattern: string | null;
  labelKey: string;
  placeholderKey: string;
}

export interface IConfigParameter extends IManagedFields {
  ID: string;
  key: string;
  value: string;
  type: ConfigParameterType;
  category: string | null;
  description: string | null;
}

export interface IConfigText extends IManagedFields {
  ID: string;
  key: string;
  language: string;
  value: string;
  category: string | null;
}

export interface IConfigBoostFactor extends IManagedFields {
  ID: string;
  key: string;
  factor: number;
  description: string | null;
}

export interface IConfigVehicleType extends IManagedFields {
  ID: string;
  key: string;
  label: string;
  active: boolean;
}

export interface IConfigListingDuration extends IManagedFields {
  ID: string;
  key: string;
  days: number;
  label: string;
  active: boolean;
}

export interface IConfigReportReason extends IManagedFields {
  ID: string;
  key: string;
  label: string;
  severity: ReportSeverity;
  active: boolean;
}

export interface IConfigChatAction extends IManagedFields {
  ID: string;
  key: string;
  label: string;
  active: boolean;
}

export interface IConfigModerationRule extends IManagedFields {
  ID: string;
  key: string;
  condition: string;
  action: string;
  active: boolean;
}

export interface IConfigApiProvider extends IManagedFields {
  ID: string;
  key: string;
  adapterInterface: string;
  status: ApiProviderStatus;
  costPerCall: number;
  baseUrl: string;
  active: boolean;
}

export interface IApiCallLog {
  ID: string;
  adapterInterface: string;
  providerKey: string;
  endpoint: string;
  httpMethod: string;
  httpStatus: number;
  responseTimeMs: number;
  cost: number;
  listingId: string | null;
  requestId: string | null;
  errorMessage: string | null;
  timestamp: string;
}

/**
 * Interface for config cache implementations.
 * Consumers can use this type without depending on the backend implementation.
 */
export interface IConfigCache {
  get<T>(table: string, key: string): T | undefined;
  getAll<T>(table: string): T[];
  invalidate(table?: string): void;
  refresh(): Promise<void>;
  refreshTable(table: string): Promise<void>;
  isReady(): boolean;
}
