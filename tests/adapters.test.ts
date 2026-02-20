import { describe, it, expect } from "vitest";
import type {
  AdapterProviderMeta,
  AdapterError,
  VehicleLookupRequest,
  VehicleLookupResponse,
  EmissionRequest,
  EmissionResponse,
  RecallRequest,
  RecallResponse,
  CritAirLevel,
  CritAirRequest,
  CritAirResponse,
  VINTechnicalRequest,
  VINTechnicalResponse,
  HistoryRequest,
  HistoryResponse,
  ValuationRequest,
  ValuationResponse,
  PaymentRequest,
  PaymentResponse,
  WebhookEvent,
  WebhookEventType,
  PaymentStatus,
} from "../src/index.js";

describe("Adapter DTOs", () => {
  const meta: AdapterProviderMeta = {
    providerName: "test",
    providerVersion: "1.0.0",
  };

  describe("VehicleLookup types", () => {
    it("should create a valid VehicleLookupRequest with plate", () => {
      const req: VehicleLookupRequest = { plate: "AB-123-CD" };
      expect(req.plate).toBe("AB-123-CD");
      expect(req.vin).toBeUndefined();
    });

    it("should create a valid VehicleLookupRequest with VIN", () => {
      const req: VehicleLookupRequest = { vin: "VF1RFB00X56789012" };
      expect(req.vin).toBe("VF1RFB00X56789012");
    });

    it("should create a valid VehicleLookupResponse", () => {
      const res: VehicleLookupResponse = {
        plate: "AB-123-CD",
        vin: "VF1RFB00X56789012",
        make: "Renault",
        model: "Clio",
        variant: "RS Line",
        year: 2022,
        registrationDate: "2022-03-15",
        fuelType: "essence",
        engineCapacityCc: 1333,
        powerKw: 96,
        powerHp: 131,
        gearbox: "EDC",
        bodyType: "berline",
        doors: 5,
        seats: 5,
        color: "Rouge Flamme",
        co2GKm: 128,
        euroNorm: "Euro 6d",
        provider: meta,
      };
      expect(res.make).toBe("Renault");
      expect(res.provider.providerName).toBe("test");
    });
  });

  describe("Emission types", () => {
    it("should create a valid EmissionRequest", () => {
      const req: EmissionRequest = {
        make: "Peugeot",
        model: "308",
        year: 2023,
        fuelType: "diesel",
      };
      expect(req.make).toBe("Peugeot");
    });

    it("should create a valid EmissionResponse", () => {
      const res: EmissionResponse = {
        co2GKm: 102,
        energyClass: "A",
        euroNorm: "Euro 6d-FULL",
        fuelType: "diesel",
        pollutants: { NOx: 0.06, PM: 0.004 },
        provider: meta,
      };
      expect(res.co2GKm).toBe(102);
      expect(res.pollutants?.NOx).toBe(0.06);
    });
  });

  describe("Recall types", () => {
    it("should create a valid RecallRequest", () => {
      const req: RecallRequest = { make: "Citroën", model: "C3", yearFrom: 2019 };
      expect(req.make).toBe("Citroën");
    });

    it("should create a valid RecallResponse", () => {
      const res: RecallResponse = {
        recalls: [
          {
            id: "RECALL-001",
            title: "Airbag défectueux",
            description: "Rappel sur les airbags Takata",
            publishedDate: "2024-01-15",
            riskLevel: "high",
            manufacturer: "Citroën",
            affectedModels: ["C3 2019", "C3 2020"],
          },
        ],
        totalCount: 1,
        provider: meta,
      };
      expect(res.recalls).toHaveLength(1);
      expect(res.totalCount).toBe(1);
    });
  });

  describe("CritAir types", () => {
    it("should accept valid CritAirLevel values", () => {
      const levels: CritAirLevel[] = ["0", "1", "2", "3", "4", "5", "non-classe"];
      expect(levels).toHaveLength(7);
    });

    it("should create a valid CritAirRequest", () => {
      const req: CritAirRequest = {
        fuelType: "essence",
        euroNorm: "Euro 6",
        registrationDate: "2020-01-01",
      };
      expect(req.fuelType).toBe("essence");
    });

    it("should create a valid CritAirResponse", () => {
      const res: CritAirResponse = {
        level: "1",
        label: "Crit'Air 1",
        color: "violet",
        provider: meta,
      };
      expect(res.level).toBe("1");
    });
  });

  describe("VINTechnical types", () => {
    it("should create a valid VINTechnicalRequest", () => {
      const req: VINTechnicalRequest = { vin: "WVWZZZ3CZWE123456" };
      expect(req.vin).toBe("WVWZZZ3CZWE123456");
    });

    it("should create a valid VINTechnicalResponse", () => {
      const res: VINTechnicalResponse = {
        vin: "WVWZZZ3CZWE123456",
        make: "Volkswagen",
        model: "Golf",
        year: 2023,
        bodyClass: "Hatchback",
        driveType: "FWD",
        engineCylinders: 4,
        engineCapacityCc: 1984,
        fuelType: "essence",
        gvwr: null,
        plantCountry: "Germany",
        manufacturer: "Volkswagen AG",
        vehicleType: "Passenger Car",
        provider: meta,
      };
      expect(res.manufacturer).toBe("Volkswagen AG");
    });
  });

  describe("History types", () => {
    it("should create a valid HistoryRequest", () => {
      const req: HistoryRequest = { vin: "VF1RFB00X56789012", plate: "AB-123-CD" };
      expect(req.vin).toBe("VF1RFB00X56789012");
    });

    it("should create a valid HistoryResponse", () => {
      const res: HistoryResponse = {
        vin: "VF1RFB00X56789012",
        ownerCount: 2,
        firstRegistrationDate: "2018-06-01",
        lastRegistrationDate: "2022-03-15",
        mileageRecords: [
          { date: "2020-01-10", mileageKm: 35000, source: "controle_technique" },
          { date: "2022-01-10", mileageKm: 72000, source: "controle_technique" },
        ],
        accidents: [{ date: "2021-05-20", severity: "minor", description: "Accrochage parking" }],
        stolen: false,
        totalDamageCount: 1,
        provider: meta,
      };
      expect(res.ownerCount).toBe(2);
      expect(res.mileageRecords).toHaveLength(2);
    });
  });

  describe("Valuation types", () => {
    it("should create a valid ValuationRequest", () => {
      const req: ValuationRequest = {
        make: "BMW",
        model: "Série 3",
        year: 2020,
        mileageKm: 60000,
        fuelType: "diesel",
        gearbox: "automatique",
      };
      expect(req.make).toBe("BMW");
    });

    it("should create a valid ValuationResponse", () => {
      const res: ValuationResponse = {
        estimatedValueEur: 28500,
        minValueEur: 26000,
        maxValueEur: 31000,
        confidence: 0.85,
        valuationDate: "2025-01-15",
        provider: meta,
      };
      expect(res.estimatedValueEur).toBe(28500);
      expect(res.confidence).toBeGreaterThan(0);
      expect(res.confidence).toBeLessThanOrEqual(1);
    });
  });

  describe("Payment types", () => {
    it("should accept valid PaymentStatus values", () => {
      const statuses: PaymentStatus[] = ["pending", "succeeded", "failed", "canceled"];
      expect(statuses).toHaveLength(4);
    });

    it("should create a valid PaymentRequest", () => {
      const req: PaymentRequest = {
        amountCents: 2990,
        currency: "eur",
        description: "Publication annonce premium",
        customerId: "user-123",
        successUrl: "https://auto.fr/payment/success",
        cancelUrl: "https://auto.fr/payment/cancel",
        metadata: { listingId: "listing-456" },
      };
      expect(req.amountCents).toBe(2990);
    });

    it("should create a valid PaymentResponse", () => {
      const res: PaymentResponse = {
        sessionId: "cs_test_abc123",
        sessionUrl: "https://checkout.stripe.com/pay/cs_test_abc123",
        status: "pending",
        provider: meta,
      };
      expect(res.status).toBe("pending");
    });

    it("should accept valid WebhookEventType values", () => {
      const types: WebhookEventType[] = [
        "checkout.session.completed",
        "checkout.session.expired",
        "payment_intent.succeeded",
        "payment_intent.payment_failed",
      ];
      expect(types).toHaveLength(4);
    });

    it("should create a valid WebhookEvent", () => {
      const evt: WebhookEvent = {
        id: "evt_123",
        type: "checkout.session.completed",
        sessionId: "cs_test_abc123",
        amountCents: 2990,
        currency: "eur",
        customerId: "user-123",
        metadata: { listingId: "listing-456" },
        createdAt: "2025-01-15T10:00:00Z",
      };
      expect(evt.type).toBe("checkout.session.completed");
    });
  });

  describe("AdapterError", () => {
    it("should create a valid AdapterError", () => {
      const err: AdapterError = {
        code: "PROVIDER_UNAVAILABLE",
        message: "API ADEME indisponible",
        provider: "ademe",
        retryable: true,
      };
      expect(err.retryable).toBe(true);
    });
  });
});
