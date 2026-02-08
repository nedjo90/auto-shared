import { describe, it, expect } from "vitest";
import { registrationSchema, profileUpdateSchema } from "../src/validators/index.js";

describe("registrationSchema", () => {
  const validInput = {
    email: "test@example.com",
    firstName: "John",
    lastName: "Doe",
    password: "securePass1",
    termsAccepted: true as const,
    privacyAccepted: true as const,
    marketingOptIn: false,
  };

  it("should accept valid registration input", () => {
    const result = registrationSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("should reject invalid email", () => {
    const result = registrationSchema.safeParse({ ...validInput, email: "not-email" });
    expect(result.success).toBe(false);
  });

  it("should reject empty firstName", () => {
    const result = registrationSchema.safeParse({ ...validInput, firstName: "" });
    expect(result.success).toBe(false);
  });

  it("should reject short password", () => {
    const result = registrationSchema.safeParse({ ...validInput, password: "short" });
    expect(result.success).toBe(false);
  });

  it("should reject termsAccepted=false", () => {
    const result = registrationSchema.safeParse({ ...validInput, termsAccepted: false });
    expect(result.success).toBe(false);
  });

  it("should reject privacyAccepted=false", () => {
    const result = registrationSchema.safeParse({ ...validInput, privacyAccepted: false });
    expect(result.success).toBe(false);
  });

  it("should default marketingOptIn to false", () => {
    const { marketingOptIn, ...withoutMarketing } = validInput;
    const result = registrationSchema.safeParse(withoutMarketing);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.marketingOptIn).toBe(false);
    }
  });
});

describe("profileUpdateSchema", () => {
  it("should accept partial updates", () => {
    const result = profileUpdateSchema.safeParse({ firstName: "Jane" });
    expect(result.success).toBe(true);
  });

  it("should accept empty object", () => {
    const result = profileUpdateSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  it("should reject empty firstName string", () => {
    const result = profileUpdateSchema.safeParse({ firstName: "" });
    expect(result.success).toBe(false);
  });
});
