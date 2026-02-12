export type { IManagedFields } from "./common.js";
export type {
  User,
  Role,
  UserStatus,
  IUser,
  IRegistrationInput,
  IRegistrationResult,
} from "./user.js";
export type {
  ConfigParameterType,
  ReportSeverity,
  ApiProviderStatus,
  AlertComparisonOperator,
  AlertNotificationMethod,
  AlertSeverityLevel,
  AlertMetric,
  IConfigRegistrationField,
  IConfigParameter,
  IConfigText,
  IConfigBoostFactor,
  IConfigVehicleType,
  IConfigListingDuration,
  IConfigReportReason,
  IConfigChatAction,
  IConfigModerationRule,
  IConfigApiProvider,
  IConfigAlert,
  IAlertEvent,
  IApiCallLog,
  IConfigCache,
  SeoPageType,
  IConfigSeoTemplate,
  AuditSeverity,
  IAuditTrailEntry,
} from "./config.js";
export type {
  ConsentDecision,
  IConfigConsentType,
  IUserConsent,
  IConsentInput,
} from "./consent.js";
export type { IDecodedToken, IUserContext, IAuthState, IAuthUser, ISessionConfig } from "./auth.js";
export type {
  RoleCode,
  PermissionCode,
  IRole,
  IUserRole,
  IPermission,
  IRolePermission,
  IConfigFeature,
} from "./rbac.js";
export type {
  ProfileCompletionBadge,
  IConfigProfileField,
  IProfileUpdateInput,
  IIncompleteField,
  IProfileCompletionResult,
  IPublicSellerProfile,
  ISellerRating,
} from "./profile.js";
export type {
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
} from "./rgpd.js";
export type {
  KpiMetric,
  IKpiValue,
  ITrafficSource,
  IDashboardKpis,
  ITrendDataPoint,
  IKpiCardConfig,
} from "./dashboard.js";
export type {
  LegalDocumentKey,
  ILegalDocument,
  ILegalDocumentVersion,
  ILegalAcceptance,
} from "./legal.js";
