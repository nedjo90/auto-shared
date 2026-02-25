// ─── Favorites & Notifications (Story 4-4) ──────────────────────────────────

import type { IPublicListingCard } from "./listing.js";
import type { NotificationType } from "../constants/notification.js";

/** @deprecated Use NotificationType from constants/notification.js instead. */
export type { NotificationType };

/** Change detection flags for a favorited listing. */
export interface IFavoriteChanges {
  priceChanged: boolean;
  oldPrice: number | null;
  newPrice: number | null;
  certificationChanged: boolean;
  oldCertificationLevel: string | null;
  newCertificationLevel: string | null;
  photosAdded: number;
}

/** A user's favorite record. */
export interface IFavorite {
  ID: string;
  userId: string;
  listingId: string;
  createdAt: string;
  snapshotPrice: number | null;
  snapshotCertificationLevel: string | null;
  snapshotPhotoCount: number;
}

/** Enriched favorite with current listing data and change flags. */
export interface IFavoriteEnriched {
  ID: string;
  userId: string;
  listingId: string;
  createdAt: string;
  snapshotPrice: number | null;
  snapshotCertificationLevel: string | null;
  snapshotPhotoCount: number;
  listing: IPublicListingCard;
  changes: IFavoriteChanges;
}

/** A user notification. */
export interface INotification {
  ID: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  message: string;
  actionUrl: string | null;
  listingId: string | null;
  isRead: boolean;
  createdAt: string;
}

/** Result of toggling a favorite. */
export interface IFavoriteToggleResult {
  favorited: boolean;
  favoriteId: string | null;
}

/** Batch favorite check result. */
export interface IFavoriteCheckResult {
  listingId: string;
  isFavorited: boolean;
  favoriteId: string | null;
}
