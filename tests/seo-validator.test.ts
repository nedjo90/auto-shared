import { describe, it, expect } from "vitest";
import { seoPageTypeSchema, configSeoTemplateInputSchema } from "../src/validators/seo.validator";

describe("SEO Validators", () => {
  describe("seoPageTypeSchema", () => {
    it("should accept all valid page types", () => {
      const validTypes = [
        "listing_detail",
        "search_results",
        "brand_page",
        "model_page",
        "city_page",
        "landing_page",
      ];
      for (const type of validTypes) {
        expect(seoPageTypeSchema.safeParse(type).success).toBe(true);
      }
    });

    it("should reject invalid page types", () => {
      expect(seoPageTypeSchema.safeParse("invalid_page").success).toBe(false);
      expect(seoPageTypeSchema.safeParse("").success).toBe(false);
      expect(seoPageTypeSchema.safeParse("home").success).toBe(false);
    });
  });

  describe("configSeoTemplateInputSchema", () => {
    const validInput = {
      pageType: "listing_detail" as const,
      metaTitleTemplate: "{{brand}} {{model}} - Auto",
      metaDescriptionTemplate: "Achetez {{brand}} {{model}} a {{price}} EUR",
    };

    it("should accept valid SEO template input", () => {
      const result = configSeoTemplateInputSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it("should default optional fields", () => {
      const result = configSeoTemplateInputSchema.safeParse(validInput);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.ogTitleTemplate).toBe("");
        expect(result.data.ogDescriptionTemplate).toBe("");
        expect(result.data.canonicalUrlPattern).toBe("");
        expect(result.data.language).toBe("fr");
        expect(result.data.active).toBe(true);
      }
    });

    it("should accept full input with all fields", () => {
      const fullInput = {
        ...validInput,
        ogTitleTemplate: "OG Title",
        ogDescriptionTemplate: "OG Description",
        canonicalUrlPattern: "/annonces/{{id}}",
        language: "en",
        active: false,
      };
      const result = configSeoTemplateInputSchema.safeParse(fullInput);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.language).toBe("en");
        expect(result.data.active).toBe(false);
      }
    });

    it("should reject invalid page type", () => {
      const result = configSeoTemplateInputSchema.safeParse({
        ...validInput,
        pageType: "invalid",
      });
      expect(result.success).toBe(false);
    });

    it("should reject empty metaTitleTemplate", () => {
      const result = configSeoTemplateInputSchema.safeParse({
        ...validInput,
        metaTitleTemplate: "",
      });
      expect(result.success).toBe(false);
    });

    it("should reject whitespace-only metaTitleTemplate", () => {
      const result = configSeoTemplateInputSchema.safeParse({
        ...validInput,
        metaTitleTemplate: "   ",
      });
      expect(result.success).toBe(false);
    });

    it("should reject empty metaDescriptionTemplate", () => {
      const result = configSeoTemplateInputSchema.safeParse({
        ...validInput,
        metaDescriptionTemplate: "",
      });
      expect(result.success).toBe(false);
    });

    it("should reject metaTitleTemplate longer than 500 characters", () => {
      const result = configSeoTemplateInputSchema.safeParse({
        ...validInput,
        metaTitleTemplate: "a".repeat(501),
      });
      expect(result.success).toBe(false);
    });

    it("should reject metaDescriptionTemplate longer than 1000 characters", () => {
      const result = configSeoTemplateInputSchema.safeParse({
        ...validInput,
        metaDescriptionTemplate: "a".repeat(1001),
      });
      expect(result.success).toBe(false);
    });

    it("should trim whitespace from string fields", () => {
      const result = configSeoTemplateInputSchema.safeParse({
        ...validInput,
        metaTitleTemplate: "  Title  ",
        metaDescriptionTemplate: "  Description  ",
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.metaTitleTemplate).toBe("Title");
        expect(result.data.metaDescriptionTemplate).toBe("Description");
      }
    });

    it("should reject language shorter than 2 characters", () => {
      const result = configSeoTemplateInputSchema.safeParse({
        ...validInput,
        language: "f",
      });
      expect(result.success).toBe(false);
    });

    it("should reject language longer than 5 characters", () => {
      const result = configSeoTemplateInputSchema.safeParse({
        ...validInput,
        language: "french",
      });
      expect(result.success).toBe(false);
    });

    it("should accept canonicalUrlPattern starting with /", () => {
      const result = configSeoTemplateInputSchema.safeParse({
        ...validInput,
        canonicalUrlPattern: "/annonces/{{id}}",
      });
      expect(result.success).toBe(true);
    });

    it("should accept canonicalUrlPattern starting with https://", () => {
      const result = configSeoTemplateInputSchema.safeParse({
        ...validInput,
        canonicalUrlPattern: "https://auto.fr/annonces/{{id}}",
      });
      expect(result.success).toBe(true);
    });

    it("should reject canonicalUrlPattern with invalid protocol", () => {
      const result = configSeoTemplateInputSchema.safeParse({
        ...validInput,
        canonicalUrlPattern: "javascript:alert(1)",
      });
      expect(result.success).toBe(false);
    });

    it("should reject canonicalUrlPattern with http://", () => {
      const result = configSeoTemplateInputSchema.safeParse({
        ...validInput,
        canonicalUrlPattern: "http://auto.fr/test",
      });
      expect(result.success).toBe(false);
    });

    it("should accept empty canonicalUrlPattern", () => {
      const result = configSeoTemplateInputSchema.safeParse({
        ...validInput,
        canonicalUrlPattern: "",
      });
      expect(result.success).toBe(true);
    });
  });
});
