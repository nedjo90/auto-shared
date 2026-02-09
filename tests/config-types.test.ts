import { describe, it, expect } from "vitest";
import type {
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
  IConfigCache,
} from "../src/types/config";

describe("Config Types", () => {
  it("should allow creating IConfigParameter", () => {
    const param: IConfigParameter = {
      ID: "p1",
      key: "listing.price.default",
      value: "15",
      type: "decimal",
      category: "listing",
      description: "Default listing price",
    };
    expect(param.key).toBe("listing.price.default");
    expect(param.type).toBe("decimal");
  });

  it("should allow creating IConfigText", () => {
    const text: IConfigText = {
      ID: "t1",
      key: "home.hero.title",
      language: "fr",
      value: "Trouvez votre vehicule",
      category: "homepage",
    };
    expect(text.key).toBe("home.hero.title");
    expect(text.language).toBe("fr");
  });

  it("should allow creating IConfigBoostFactor", () => {
    const factor: IConfigBoostFactor = {
      ID: "b1",
      key: "photo.count.bonus",
      factor: 1.5,
      description: "Boost for listings with photos",
    };
    expect(factor.factor).toBe(1.5);
  });

  it("should allow creating IConfigVehicleType", () => {
    const vt: IConfigVehicleType = {
      ID: "v1",
      key: "car",
      label: "Voiture",
      active: true,
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
    };
    expect(dur.days).toBe(30);
  });

  it("should allow creating IConfigReportReason", () => {
    const reason: IConfigReportReason = {
      ID: "r1",
      key: "spam",
      label: "Spam",
      severity: "low",
      active: true,
    };
    expect(reason.severity).toBe("low");
  });

  it("should allow creating IConfigChatAction", () => {
    const action: IConfigChatAction = {
      ID: "ca1",
      key: "make.offer",
      label: "Faire une offre",
      active: true,
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
    };
    expect(rule.condition).toBe("report_count >= 3");
  });

  it("should allow creating IConfigApiProvider", () => {
    const provider: IConfigApiProvider = {
      ID: "ap1",
      key: "siv",
      adapterInterface: "IVehicleDataAdapter",
      status: "active",
      costPerCall: 0.05,
      baseUrl: "https://api.siv.gouv.fr",
      active: true,
    };
    expect(provider.adapterInterface).toBe("IVehicleDataAdapter");
    expect(provider.costPerCall).toBe(0.05);
  });

  it("should allow creating IConfigRegistrationField", () => {
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
    };
    expect(field.isRequired).toBe(true);
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
  });
});
