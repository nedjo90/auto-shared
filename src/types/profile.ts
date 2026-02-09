export type ProfileCompletionBadge = "complete" | "advanced" | "intermediate" | "new_seller";

export interface IConfigProfileField {
  ID: string;
  fieldName: string;
  isVisibleToPublic: boolean;
  contributesToCompletion: boolean;
  weight: number;
  tipKey: string | null;
  displayOrder: number;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
}

export interface IProfileUpdateInput {
  displayName?: string;
  phone?: string;
  addressStreet?: string;
  addressCity?: string;
  addressPostalCode?: string;
  addressCountry?: string;
  siret?: string;
  companyName?: string;
  avatarUrl?: string;
  bio?: string;
}

export interface IIncompleteField {
  fieldName: string;
  tipKey: string | null;
}

export interface IProfileCompletionResult {
  percentage: number;
  badge: ProfileCompletionBadge;
  incompleteFields: IIncompleteField[];
}

export interface IPublicSellerProfile {
  userId: string;
  displayName: string;
  avatarUrl: string | null;
  bio: string | null;
  rating: number;
  profileCompletionBadge: ProfileCompletionBadge;
  totalListings: number;
  memberSince: string;
  isAnonymized: boolean;
}

export interface ISellerRating {
  user_ID: string;
  profileCompletionRate: number;
  overallRating: number;
  totalListings: number;
  lastCalculatedAt: string;
}
