import { describe, it, expect } from "vitest";
import type {
  IRole,
  IUserRole,
  IPermission,
  IRolePermission,
  IConfigFeature,
  RoleCode,
  PermissionCode,
} from "../src/types/index.js";
import { ROLE_CODES, ROLE_HIERARCHY, PERMISSION_CODES, ROLES } from "../src/constants/index.js";

describe("RBAC Types", () => {
  describe("RoleCode type", () => {
    it("should accept all valid role codes", () => {
      const roles: RoleCode[] = ["visitor", "buyer", "seller", "moderator", "administrator"];
      expect(roles).toHaveLength(5);
    });
  });

  describe("IRole interface", () => {
    it("should have required fields", () => {
      const role: IRole = {
        ID: "test-id",
        code: "buyer",
        name: "Acheteur",
        description: "Role acheteur",
        level: 1,
      };
      expect(role.ID).toBe("test-id");
      expect(role.code).toBe("buyer");
      expect(role.level).toBe(1);
    });
  });

  describe("IUserRole interface", () => {
    it("should have required fields", () => {
      const userRole: IUserRole = {
        ID: "test-id",
        user_ID: "user-id",
        role_ID: "role-id",
        assignedAt: "2026-01-01T00:00:00Z",
        assignedBy_ID: null,
      };
      expect(userRole.user_ID).toBe("user-id");
      expect(userRole.role_ID).toBe("role-id");
    });
  });

  describe("IPermission interface", () => {
    it("should have required fields", () => {
      const permission: IPermission = {
        ID: "test-id",
        code: "listing.view",
        description: "View listings",
      };
      expect(permission.code).toBe("listing.view");
    });
  });

  describe("IRolePermission interface", () => {
    it("should have required fields", () => {
      const rp: IRolePermission = {
        ID: "test-id",
        role_ID: "role-id",
        permission_ID: "perm-id",
      };
      expect(rp.role_ID).toBe("role-id");
      expect(rp.permission_ID).toBe("perm-id");
    });
  });

  describe("IConfigFeature interface", () => {
    it("should have required fields", () => {
      const feature: IConfigFeature = {
        ID: "test-id",
        code: "favorites",
        name: "Favoris",
        requiresAuth: true,
        requiredRole_code: null,
        isActive: true,
      };
      expect(feature.requiresAuth).toBe(true);
      expect(feature.requiredRole_code).toBeNull();
    });
  });

  describe("PermissionCode type", () => {
    it("should accept valid permission codes", () => {
      const codes: PermissionCode[] = [
        "listing.view",
        "listing.create",
        "listing.edit",
        "listing.moderate",
        "user.manage",
        "admin.access",
      ];
      expect(codes).toHaveLength(6);
    });
  });
});

describe("RBAC Constants", () => {
  describe("ROLE_CODES", () => {
    it("should contain all 5 role codes", () => {
      expect(ROLE_CODES).toHaveLength(5);
      expect(ROLE_CODES).toContain("visitor");
      expect(ROLE_CODES).toContain("buyer");
      expect(ROLE_CODES).toContain("seller");
      expect(ROLE_CODES).toContain("moderator");
      expect(ROLE_CODES).toContain("administrator");
    });
  });

  describe("ROLE_HIERARCHY", () => {
    it("should define hierarchy levels for all roles", () => {
      expect(ROLE_HIERARCHY.visitor).toBe(0);
      expect(ROLE_HIERARCHY.buyer).toBe(1);
      expect(ROLE_HIERARCHY.seller).toBe(2);
      expect(ROLE_HIERARCHY.moderator).toBe(3);
      expect(ROLE_HIERARCHY.administrator).toBe(4);
    });
  });

  describe("PERMISSION_CODES", () => {
    it("should contain all permission codes", () => {
      expect(PERMISSION_CODES).toContain("listing.view");
      expect(PERMISSION_CODES).toContain("listing.create");
      expect(PERMISSION_CODES).toContain("listing.edit");
      expect(PERMISSION_CODES).toContain("listing.moderate");
      expect(PERMISSION_CODES).toContain("user.manage");
      expect(PERMISSION_CODES).toContain("admin.access");
    });
  });

  describe("ROLES (updated)", () => {
    it("should contain all 5 new role codes", () => {
      expect(ROLES).toHaveLength(5);
      expect(ROLES).toContain("visitor");
      expect(ROLES).toContain("buyer");
      expect(ROLES).toContain("seller");
      expect(ROLES).toContain("moderator");
      expect(ROLES).toContain("administrator");
    });
  });
});
