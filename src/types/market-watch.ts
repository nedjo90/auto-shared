// ─── Market Watch Types (Story 6-3) ──────────────────────────────────────────

import type { IPublicListingCard } from "./listing.js";

/** A seller's market watch record for tracking a competitor listing. */
export interface IMarketWatch {
  ID: string;
  sellerId: string;
  listingId: string;
  addedAt: string;
  notes: string | null;
}

/** A price history entry for a listing. */
export interface IListingPriceHistory {
  ID: string;
  listingId: string;
  price: number;
  previousPrice: number | null;
  changedAt: string;
}

/** Enriched market watch entry with listing data and price history. */
export interface IMarketWatchEnriched {
  ID: string;
  sellerId: string;
  listingId: string;
  addedAt: string;
  notes: string | null;
  listing: IPublicListingCard;
  priceHistory: IListingPriceHistory[];
  hasChangedSinceLastVisit: boolean;
}

/** Result of adding/removing a market watch. */
export interface IMarketWatchToggleResult {
  watching: boolean;
  watchId: string | null;
}

/** Result of checking if listings are being watched. */
export interface IMarketWatchCheckResult {
  listingId: string;
  isWatching: boolean;
  watchId: string | null;
}
