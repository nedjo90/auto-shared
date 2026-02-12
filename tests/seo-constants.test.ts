import { describe, it, expect } from "vitest";
import {
  SEO_PAGE_TYPES,
  SEO_PLACEHOLDERS,
  SEO_SAMPLE_DATA,
  SEO_CHAR_LIMITS,
} from "../src/constants/seo";
import { renderSeoTemplate } from "../src/utils/seo";
import { seoPageTypeSchema } from "../src/validators/seo.validator";

describe("SEO Constants", () => {
  describe("SEO_PAGE_TYPES", () => {
    it("should contain all 6 page types", () => {
      expect(SEO_PAGE_TYPES).toHaveLength(6);
      expect(SEO_PAGE_TYPES).toContain("listing_detail");
      expect(SEO_PAGE_TYPES).toContain("search_results");
      expect(SEO_PAGE_TYPES).toContain("brand_page");
      expect(SEO_PAGE_TYPES).toContain("model_page");
      expect(SEO_PAGE_TYPES).toContain("city_page");
      expect(SEO_PAGE_TYPES).toContain("landing_page");
    });
  });

  describe("SEO_PLACEHOLDERS", () => {
    it("should have placeholders for all page types", () => {
      for (const pageType of SEO_PAGE_TYPES) {
        expect(SEO_PLACEHOLDERS[pageType]).toBeDefined();
        expect(SEO_PLACEHOLDERS[pageType].length).toBeGreaterThan(0);
      }
    });

    it("should have listing_detail placeholders including brand, model, year, price, city", () => {
      const placeholders = SEO_PLACEHOLDERS.listing_detail;
      expect(placeholders).toContain("brand");
      expect(placeholders).toContain("model");
      expect(placeholders).toContain("year");
      expect(placeholders).toContain("price");
      expect(placeholders).toContain("city");
    });

    it("should have search_results placeholders including query, count", () => {
      const placeholders = SEO_PLACEHOLDERS.search_results;
      expect(placeholders).toContain("query");
      expect(placeholders).toContain("count");
    });

    it("should have landing_page placeholder for title", () => {
      expect(SEO_PLACEHOLDERS.landing_page).toContain("title");
    });
  });

  describe("SEO_SAMPLE_DATA", () => {
    it("should have sample data for all page types", () => {
      for (const pageType of SEO_PAGE_TYPES) {
        expect(SEO_SAMPLE_DATA[pageType]).toBeDefined();
        expect(Object.keys(SEO_SAMPLE_DATA[pageType]).length).toBeGreaterThan(0);
      }
    });

    it("should have sample data keys matching placeholders for each page type", () => {
      for (const pageType of SEO_PAGE_TYPES) {
        const placeholders = SEO_PLACEHOLDERS[pageType];
        const sampleKeys = Object.keys(SEO_SAMPLE_DATA[pageType]);
        for (const placeholder of placeholders) {
          expect(sampleKeys).toContain(placeholder);
        }
      }
    });

    it("should not have extra sample data keys beyond placeholders", () => {
      for (const pageType of SEO_PAGE_TYPES) {
        const placeholders = SEO_PLACEHOLDERS[pageType];
        const sampleKeys = Object.keys(SEO_SAMPLE_DATA[pageType]);
        for (const key of sampleKeys) {
          expect(placeholders).toContain(key);
        }
      }
    });
  });

  describe("SEO_CHAR_LIMITS", () => {
    it("should have meta title limit of 60", () => {
      expect(SEO_CHAR_LIMITS.metaTitle).toBe(60);
    });

    it("should have meta description limit of 160", () => {
      expect(SEO_CHAR_LIMITS.metaDescription).toBe(160);
    });
  });

  describe("Source of truth sync", () => {
    it("should have SEO_PAGE_TYPES matching seoPageTypeSchema options", () => {
      const schemaValues = seoPageTypeSchema.options;
      expect([...SEO_PAGE_TYPES].sort()).toEqual([...schemaValues].sort());
    });
  });

  describe("renderSeoTemplate", () => {
    it("should replace placeholders with data values", () => {
      expect(renderSeoTemplate("{{brand}} {{model}}", { brand: "Renault", model: "Clio" })).toBe(
        "Renault Clio",
      );
    });

    it("should remove unreplaced placeholders", () => {
      expect(renderSeoTemplate("{{brand}} {{missing}}", { brand: "Renault" })).toBe("Renault ");
    });

    it("should return empty string for empty template", () => {
      expect(renderSeoTemplate("", { brand: "Renault" })).toBe("");
    });

    it("should handle template with no placeholders", () => {
      expect(renderSeoTemplate("Static text", {})).toBe("Static text");
    });
  });
});
