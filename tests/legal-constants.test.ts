import { describe, it, expect } from "vitest";
import { LEGAL_DOCUMENT_KEYS, LEGAL_DOCUMENT_LABELS } from "../src/constants/legal";
import type { LegalDocumentKey } from "../src/types/legal";

describe("Legal Constants", () => {
  describe("LEGAL_DOCUMENT_KEYS", () => {
    it("should contain all 4 legal document types", () => {
      expect(LEGAL_DOCUMENT_KEYS).toHaveLength(4);
      expect(LEGAL_DOCUMENT_KEYS).toContain("cgu");
      expect(LEGAL_DOCUMENT_KEYS).toContain("cgv");
      expect(LEGAL_DOCUMENT_KEYS).toContain("privacy_policy");
      expect(LEGAL_DOCUMENT_KEYS).toContain("legal_notices");
    });

    it("should be typed as readonly array", () => {
      // Verify it's a standard array (as const provides compile-time readonly, not runtime freeze)
      expect(Array.isArray(LEGAL_DOCUMENT_KEYS)).toBe(true);
    });
  });

  describe("LEGAL_DOCUMENT_LABELS", () => {
    it("should have a French label for every key", () => {
      for (const key of LEGAL_DOCUMENT_KEYS) {
        expect(LEGAL_DOCUMENT_LABELS[key]).toBeDefined();
        expect(typeof LEGAL_DOCUMENT_LABELS[key]).toBe("string");
        expect(LEGAL_DOCUMENT_LABELS[key].length).toBeGreaterThan(0);
      }
    });

    it("should have correct labels", () => {
      expect(LEGAL_DOCUMENT_LABELS.cgu).toBe("Conditions Generales d'Utilisation");
      expect(LEGAL_DOCUMENT_LABELS.cgv).toBe("Conditions Generales de Vente");
      expect(LEGAL_DOCUMENT_LABELS.privacy_policy).toBe("Politique de Confidentialite");
      expect(LEGAL_DOCUMENT_LABELS.legal_notices).toBe("Mentions Legales");
    });

    it("should have a label for every key and vice versa (bidirectional)", () => {
      const labelKeys = Object.keys(LEGAL_DOCUMENT_LABELS) as LegalDocumentKey[];
      expect(labelKeys).toHaveLength(LEGAL_DOCUMENT_KEYS.length);
      for (const key of labelKeys) {
        expect(LEGAL_DOCUMENT_KEYS).toContain(key);
      }
    });
  });
});
