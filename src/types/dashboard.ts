/** KPI metric identifier. */
export type KpiMetric =
  | "visitors"
  | "registrations"
  | "listings"
  | "contacts"
  | "sales"
  | "revenue";

/** Single KPI value with trend comparison. */
export interface IKpiValue {
  current: number;
  previous: number;
  trend: number;
}

/** Traffic source breakdown entry. */
export interface ITrafficSource {
  source: string;
  visits: number;
  percentage: number;
}

/** Complete dashboard KPI response. */
export interface IDashboardKpis {
  visitors: IKpiValue;
  registrations: IKpiValue;
  listings: IKpiValue;
  contacts: IKpiValue;
  sales: IKpiValue;
  revenue: IKpiValue;
  trafficSources: ITrafficSource[];
}

/** Single data point for trend charts. */
export interface ITrendDataPoint {
  date: string;
  value: number;
}

/** KPI metric display configuration. */
export interface IKpiCardConfig {
  metric: KpiMetric;
  label: string;
  unit?: string;
  format?: "number" | "currency";
}
