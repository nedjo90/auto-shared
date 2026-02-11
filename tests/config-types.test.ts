import { describe, it, expect } from "vitest";
import type {
  ConfigParameterType,
  ReportSeverity,
  ApiProviderStatus,
  SeoPageType,
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
  IConfigSeoTemplate,
  IConfigCache,
} from "../src/types/config";

const MANAGED_FIELDS = {
  createdAt: "2026-01-01T00:00:00Z",
  createdBy: "admin",
  modifiedAt: "2026-01-01T00:00:00Z",
  modifiedBy: "admin",
};

describe("Config Types", () => {
  it("should allow creating IConfigParameter with managed fields", () => {
    const param: IConfigParameter = {
      ID: "p1",
      key: "listing.price.default",
      value: "15",
      type: "decimal",
      category: "listing",
      description: "Default listing price",
      ...MANAGED_FIELDS,
    };
    expect(param.key).toBe("listing.price.default");
    expect(param.type).toBe("decimal");
    expect(param.createdAt).toBe("2026-01-01T00:00:00Z");
    expect(param.modifiedBy).toBe("admin");
  });

  it("should allow nullable fields on IConfigParameter", () => {
    const param: IConfigParameter = {
      ID: "p2",
      key: "test",
      value: "v",
      type: "string",
      category: null,
      description: null,
      ...MANAGED_FIELDS,
    };
    expect(param.category).toBeNull();
    expect(param.description).toBeNull();
  });

  it("should allow creating IConfigText with managed fields", () => {
    const text: IConfigText = {
      ID: "t1",
      key: "home.hero.title",
      language: "fr",
      value: "Trouvez votre vehicule",
      category: "homepage",
      ...MANAGED_FIELDS,
    };
    expect(text.key).toBe("home.hero.title");
    expect(text.language).toBe("fr");
    expect(text.createdBy).toBe("admin");
  });

  it("should allow nullable category on IConfigText", () => {
    const text: IConfigText = {
      ID: "t2",
      key: "test",
      language: "fr",
      value: "Test",
      category: null,
      ...MANAGED_FIELDS,
    };
    expect(text.category).toBeNull();
  });

  it("should allow creating IConfigBoostFactor", () => {
    const factor: IConfigBoostFactor = {
      ID: "b1",
      key: "photo.count.bonus",
      factor: 1.5,
      description: "Boost for listings with photos",
      ...MANAGED_FIELDS,
    };
    expect(factor.factor).toBe(1.5);
  });

  it("should allow creating IConfigVehicleType", () => {
    const vt: IConfigVehicleType = {
      ID: "v1",
      key: "car",
      label: "Voiture",
      active: true,
      ...MANAGED_FIELDS,
    };
    expect(vt.key).toBe("car");
    expect(vt.active).toBe(true);
  });

  it("should allow creating IConfigListingDuration", () => {
    const dur: IConfigListingDuration = {
      ID: "d1",
      key: "30d",
      days: 30,
      label: "30 jours",
      active: true,
      ...MANAGED_FIELDS,
    };
    expect(dur.days).toBe(30);
  });

  it("should allow creating IConfigReportReason with typed severity", () => {
    const reason: IConfigReportReason = {
      ID: "r1",
      key: "spam",
      label: "Spam",
      severity: "low",
      active: true,
      ...MANAGED_FIELDS,
    };
    expect(reason.severity).toBe("low");
  });

  it("should allow creating IConfigChatAction", () => {
    const action: IConfigChatAction = {
      ID: "ca1",
      key: "make.offer",
      label: "Faire une offre",
      active: true,
      ...MANAGED_FIELDS,
    };
    expect(action.key).toBe("make.offer");
  });

  it("should allow creating IConfigModerationRule", () => {
    const rule: IConfigModerationRule = {
      ID: "mr1",
      key: "auto.flag.reports",
      condition: "report_count >= 3",
      action: "flag_for_review",
      active: true,
      ...MANAGED_FIELDS,
    };
    expect(rule.condition).toBe("report_count >= 3");
  });

  it("should allow creating IConfigApiProvider with typed status", () => {
    const provider: IConfigApiProvider = {
      ID: "ap1",
      key: "siv",
      adapterInterface: "IVehicleDataAdapter",
      status: "active",
      costPerCall: 0.05,
      baseUrl: "https://api.siv.gouv.fr",
      active: true,
      ...MANAGED_FIELDS,
    };
    expect(provider.adapterInterface).toBe("IVehicleDataAdapter");
    expect(provider.costPerCall).toBe(0.05);
    expect(provider.status).toBe("active");
  });

  it("should allow creating IConfigRegistrationField with managed fields", () => {
    const field: IConfigRegistrationField = {
      ID: "rf1",
      fieldName: "email",
      fieldType: "email",
      isRequired: true,
      isVisible: true,
      displayOrder: 1,
      validationPattern: null,
      labelKey: "registration.email",
      placeholderKey: "registration.email.placeholder",
      ...MANAGED_FIELDS,
    };
    expect(field.isRequired).toBe(true);
    expect(field.validationPattern).toBeNull();
    expect(field.createdAt).toBe("2026-01-01T00:00:00Z");
  });

  it("should export IConfigCache interface type", () => {
    const mockCache: IConfigCache = {
      get: <T>() => undefined as T | undefined,
      getAll: <T>() => [] as T[],
      invalidate: () => {},
      refresh: async () => {},
      refreshTable: async () => {},
      isReady: () => true,
    };
    expect(mockCache.isReady()).toBe(true);
    expect(mockCache.getAll("test")).toEqual([]);
    // Verify invalidate works with no args (optional parameter)
    expect(() => mockCache.invalidate()).not.toThrow();
    expect(() => mockCache.invalidate("ConfigParameter")).not.toThrow();
  });

  it("should enforce ConfigParameterType union at compile time", () => {
    const types: ConfigParameterType[] = ["string", "integer", "decimal", "boolean"];
    expect(types).toHaveLength(4);
  });

  it("should enforce ReportSeverity union at compile time", () => {
    const severities: ReportSeverity[] = ["low", "medium", "high", "critical"];
    expect(severities).toHaveLength(4);
  });

  it("should enforce ApiProviderStatus union at compile time", () => {
    const statuses: ApiProviderStatus[] = ["active", "inactive", "deprecated"];
    expect(statuses).toHaveLength(3);
  });

  it("should enforce SeoPageType union at compile time", () => {
    const pageTypes: SeoPageType[] = [
      "listing_detail",
      "search_results",
      "brand_page",
      "model_page",
      "city_page",
      "landing_page",
    ];
    expect(pageTypes).toHaveLength(6);
  });

  it("should allow creating IConfigSeoTemplate with managed fields", () => {
    const template: IConfigSeoTemplate = {
      ID: "seo1",
      pageType: "listing_detail",
      metaTitleTemplate: "{{brand}} {{model}} - Auto",
      metaDescriptionTemplate: "Achetez {{brand}} {{model}}",
      ogTitleTemplate: "OG Title",
      ogDescriptionTemplate: "OG Description",
      canonicalUrlPattern: "/annonces/{{id}}",
      language: "fr",
      active: true,
      ...MANAGED_FIELDS,
    };
    expect(template.pageType).toBe("listing_detail");
    expect(template.language).toBe("fr");
    expect(template.active).toBe(true);
    expect(template.createdAt).toBe("2026-01-01T00:00:00Z");
  });

  it("should export all config types from barrel index", async () => {
    const types = await import("../src/types/index");
    expect(types).toBeDefined();
  });
});
