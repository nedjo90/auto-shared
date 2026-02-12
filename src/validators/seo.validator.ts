import { z } from "zod";
import { SEO_PLACEHOLDERS } from "../constants/seo.js";
import type { SeoPageType } from "../types/config.js";

export const seoPageTypeSchema = z.enum([
  "listing_detail",
  "search_results",
  "brand_page",
  "model_page",
  "city_page",
  "landing_page",
]);

/**
 * Extract all {{placeholder}} names from a template string.
 */
function extractPlaceholders(template: string): string[] {
  const matches = template.match(/\{\{(\w+)\}\}/g);
  if (!matches) return [];
  return matches.map((m) => m.slice(2, -2));
}

/**
 * Validate that all placeholders used in template fields are valid for the given page type.
 */
function validateTemplatePlaceholders(
  data: { pageType: string; [key: string]: unknown },
  ctx: z.RefinementCtx,
): void {
  const pageType = data.pageType as SeoPageType;
  const allowedPlaceholders = SEO_PLACEHOLDERS[pageType];
  if (!allowedPlaceholders) return;

  const templateFields = [
    "metaTitleTemplate",
    "metaDescriptionTemplate",
    "ogTitleTemplate",
    "ogDescriptionTemplate",
    "canonicalUrlPattern",
  ] as const;

  for (const field of templateFields) {
    const value = data[field];
    if (typeof value !== "string" || !value) continue;
    const used = extractPlaceholders(value);
    const invalid = used.filter((p) => !allowedPlaceholders.includes(p));
    if (invalid.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [field],
        message: `Placeholders invalides pour ${pageType}: {{${invalid.join("}}, {{")}}}. Autorises: ${allowedPlaceholders.map((p) => `{{${p}}}`).join(", ")}`,
      });
    }
  }
}

export const configSeoTemplateInputSchema = z
  .object({
    pageType: seoPageTypeSchema,
    metaTitleTemplate: z
      .string()
      .trim()
      .min(1, "Le template de titre meta est requis")
      .max(500, "Le titre meta ne doit pas depasser 500 caracteres"),
    metaDescriptionTemplate: z
      .string()
      .trim()
      .min(1, "Le template de description meta est requis")
      .max(1000, "La description meta ne doit pas depasser 1000 caracteres"),
    ogTitleTemplate: z
      .string()
      .trim()
      .max(500, "Le titre OG ne doit pas depasser 500 caracteres")
      .optional()
      .default(""),
    ogDescriptionTemplate: z
      .string()
      .trim()
      .max(1000, "La description OG ne doit pas depasser 1000 caracteres")
      .optional()
      .default(""),
    canonicalUrlPattern: z
      .string()
      .trim()
      .max(500, "L'URL canonique ne doit pas depasser 500 caracteres")
      .refine(
        (v) => v === "" || /^(\/|https:\/\/)/.test(v),
        "L'URL canonique doit commencer par / ou https://",
      )
      .optional()
      .default(""),
    language: z
      .string()
      .trim()
      .min(2, "La langue est requise")
      .max(5, "La langue ne doit pas depasser 5 caracteres")
      .optional()
      .default("fr"),
    active: z.boolean().optional().default(true),
  })
  .superRefine(validateTemplatePlaceholders);

export type ConfigSeoTemplateInput = z.infer<typeof configSeoTemplateInputSchema>;
