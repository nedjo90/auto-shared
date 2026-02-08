import { describe, it, expect } from "vitest";
import type {
  IDecodedToken,
  IUserContext,
  IAuthState,
  IAuthUser,
  ISessionConfig,
  RoleCode,
} from "../src/index.js";
import { ROLES } from "../src/index.js";

describe("Auth types", () => {
  it("IDecodedToken should have required sub field", () => {
    const token: IDecodedToken = {
      sub: "user-id-123",
      email: "test@example.com",
      name: "Test User",
    };
    expect(token.sub).toBe("user-id-123");
  });

  it("IDecodedToken optional fields should be omittable", () => {
    const minimal: IDecodedToken = { sub: "user-id" };
    expect(minimal.email).toBeUndefined();
    expect(minimal.iss).toBeUndefined();
  });

  it("IUserContext should have azureAdB2cId and roles", () => {
    const ctx: IUserContext = {
      id: "db-id",
      azureAdB2cId: "azure-id",
      email: "test@example.com",
      roles: ["buyer"],
    };
    expect(ctx.azureAdB2cId).toBe("azure-id");
    expect(ctx.roles).toEqual(["buyer"]);
  });

  it("IUserContext roles should only accept valid RoleCode values", () => {
    // Validate that all ROLES constant values are assignable to RoleCode
    const roles: RoleCode[] = [...ROLES];
    expect(roles).toContain("buyer");
    expect(roles).toContain("seller");
    expect(roles).toContain("administrator");
    expect(roles).not.toContain("admin");
    expect(roles).not.toContain("private_seller");
  });

  it("IAuthState should have authentication fields", () => {
    const state: IAuthState = {
      user: { id: "1", email: "a@b.com", name: "A" },
      isAuthenticated: true,
      roles: ["buyer"],
      isLoading: false,
      lastActivity: Date.now(),
    };
    expect(state.isAuthenticated).toBe(true);
  });

  it("IAuthUser should have id, email, name", () => {
    const user: IAuthUser = {
      id: "1",
      email: "test@example.com",
      name: "Test",
    };
    expect(user.id).toBe("1");
  });

  it("ISessionConfig should have timeout and warning fields", () => {
    const config: ISessionConfig = {
      timeoutMinutes: 30,
      warningMinutes: 5,
    };
    expect(config.timeoutMinutes).toBe(30);
    expect(config.warningMinutes).toBe(5);
  });

  it("runtime role code validation should reject unknown values", () => {
    const rawCodes = ["buyer", "seller", "superadmin", "hacker"];
    const validRoles = rawCodes.filter((code): code is RoleCode =>
      (ROLES as readonly string[]).includes(code),
    );
    expect(validRoles).toEqual(["buyer", "seller"]);
    expect(validRoles).not.toContain("superadmin");
    expect(validRoles).not.toContain("hacker");
  });
});
