export type Role = "visitor" | "buyer" | "seller" | "moderator" | "administrator";

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
  phone: string | null;
  address: string | null;
  siret: string | null;
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
