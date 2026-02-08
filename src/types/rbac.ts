export type RoleCode = "visitor" | "buyer" | "seller" | "moderator" | "administrator";

export type PermissionCode =
  | "listing.view"
  | "listing.create"
  | "listing.edit"
  | "listing.moderate"
  | "user.manage"
  | "admin.access";

export interface IRole {
  ID: string;
  code: RoleCode;
  name: string;
  description: string;
  level: number;
}

export interface IUserRole {
  ID: string;
  user_ID: string;
  role_ID: string;
  assignedAt: string;
  assignedBy_ID: string | null;
}

export interface IPermission {
  ID: string;
  code: PermissionCode;
  description: string;
}

export interface IRolePermission {
  ID: string;
  role_ID: string;
  permission_ID: string;
}

export interface IConfigFeature {
  ID: string;
  code: string;
  name: string;
  requiresAuth: boolean;
  requiredRole_code: RoleCode | null;
  isActive: boolean;
}
