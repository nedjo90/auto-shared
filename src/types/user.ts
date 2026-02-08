export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  consentStatus: ConsentStatus;
  createdAt: string;
  updatedAt: string;
}

export type Role = "buyer" | "private_seller" | "professional_seller" | "moderator" | "admin";

export interface ConsentStatus {
  termsAccepted: boolean;
  termsAcceptedAt: string | null;
  privacyAccepted: boolean;
  privacyAcceptedAt: string | null;
  marketingOptIn: boolean;
  marketingOptInAt: string | null;
}
