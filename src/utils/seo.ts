/**
 * Replace {{placeholder}} tokens with values from a data object.
 * Unreplaced tokens are removed (replaced with empty string).
 */
export function renderSeoTemplate(template: string, data: Record<string, string>): string {
  if (!template) return "";
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => data[key] ?? "");
}
