import { z } from "zod";

export const seoPageTypeSchema = z.enum([
  "listing_detail",
  "search_results",
  "brand_page",
  "model_page",
  "city_page",
  "landing_page",
]);

export const configSeoTemplateInputSchema = z.object({
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
});

export type ConfigSeoTemplateInput = z.infer<typeof configSeoTemplateInputSchema>;
