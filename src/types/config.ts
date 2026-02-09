export interface IConfigRegistrationField {
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

export interface IConfigParameter {
  ID: string;
  key: string;
  value: string;
  type: string;
  category: string | null;
  description: string | null;
}

export interface IConfigText {
  ID: string;
  key: string;
  language: string;
  value: string;
  category: string | null;
}

export interface IConfigBoostFactor {
  ID: string;
  key: string;
  factor: number;
  description: string | null;
}

export interface IConfigVehicleType {
  ID: string;
  key: string;
  label: string;
  active: boolean;
}

export interface IConfigListingDuration {
  ID: string;
  key: string;
  days: number;
  label: string;
  active: boolean;
}

export interface IConfigReportReason {
  ID: string;
  key: string;
  label: string;
  severity: string;
  active: boolean;
}

export interface IConfigChatAction {
  ID: string;
  key: string;
  label: string;
  active: boolean;
}

export interface IConfigModerationRule {
  ID: string;
  key: string;
  condition: string;
  action: string;
  active: boolean;
}

export interface IConfigApiProvider {
  ID: string;
  key: string;
  adapterInterface: string;
  status: string;
  costPerCall: number;
  baseUrl: string;
  active: boolean;
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
