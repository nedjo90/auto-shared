import type { RoleCode } from "./rbac.js";

/** @deprecated Use RoleCode instead */
export type Role = RoleCode;

export type UserStatus = "active" | "suspended" | "anonymized";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  ID: string;
  azureAdB2cId: string | null;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string | null;
  phone: string | null;
  address: string | null;
  addressStreet: string | null;
  addressCity: string | null;
  addressPostalCode: string | null;
  addressCountry: string | null;
  siret: string | null;
  companyName: string | null;
  avatarUrl: string | null;
  bio: string | null;
  accountCreatedAt: string | null;
  isAnonymized: boolean;
  status: UserStatus;
  createdAt: string;
  modifiedAt: string;
  createdBy: string;
  modifiedBy: string;
}

export interface IRegistrationInput {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone?: string;
  siret?: string;
}

export interface IRegistrationResult {
  success: boolean;
  userId: string;
  email: string;
  redirectUrl: string;
}
