import { describe, it, expect } from "vitest";
import type { IConfigRegistrationField } from "../src/types/config.js";
import { buildRegistrationSchema } from "../src/validators/registration.validator.js";

const baseFields: IConfigRegistrationField[] = [
  {
    ID: "1",
    fieldName: "email",
    fieldType: "email",
    isRequired: true,
    isVisible: true,
    displayOrder: 10,
    validationPattern: null,
    labelKey: "Email",
    placeholderKey: "votre@email.com",
  },
  {
    ID: "2",
    fieldName: "firstName",
    fieldType: "text",
    isRequired: true,
    isVisible: true,
    displayOrder: 20,
    validationPattern: null,
    labelKey: "Prénom",
    placeholderKey: "Jean",
  },
  {
    ID: "3",
    fieldName: "lastName",
    fieldType: "text",
    isRequired: true,
    isVisible: true,
    displayOrder: 30,
    validationPattern: null,
    labelKey: "Nom",
    placeholderKey: "Dupont",
  },
  {
    ID: "4",
    fieldName: "phone",
    fieldType: "tel",
    isRequired: false,
    isVisible: true,
    displayOrder: 40,
    validationPattern: null,
    labelKey: "Téléphone",
    placeholderKey: "+33 6 12 34 56 78",
  },
];

const validInput = {
  email: "test@example.com",
  firstName: "Jean",
  lastName: "Dupont",
  phone: "",
  password: "securePass1",
};

describe("buildRegistrationSchema", () => {
  it("should accept valid input with all required fields", () => {
    const schema = buildRegistrationSchema(baseFields);
    const result = schema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("should reject invalid email", () => {
    const schema = buildRegistrationSchema(baseFields);
    const result = schema.safeParse({ ...validInput, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("should reject empty required field (firstName)", () => {
    const schema = buildRegistrationSchema(baseFields);
    const result = schema.safeParse({ ...validInput, firstName: "" });
    expect(result.success).toBe(false);
  });

  it("should reject missing required field (lastName)", () => {
    const schema = buildRegistrationSchema(baseFields);
    const { lastName, ...withoutLastName } = validInput;
    const result = schema.safeParse(withoutLastName);
    expect(result.success).toBe(false);
  });

  it("should allow empty string for optional field (phone)", () => {
    const schema = buildRegistrationSchema(baseFields);
    const result = schema.safeParse({ ...validInput, phone: "" });
    expect(result.success).toBe(true);
  });

  it("should allow undefined for optional field (phone)", () => {
    const schema = buildRegistrationSchema(baseFields);
    const { phone, ...withoutPhone } = validInput;
    const result = schema.safeParse(withoutPhone);
    expect(result.success).toBe(true);
  });

  it("should reject short password (< 8 chars)", () => {
    const schema = buildRegistrationSchema(baseFields);
    const result = schema.safeParse({ ...validInput, password: "short" });
    expect(result.success).toBe(false);
  });

  it("should enforce validationPattern regex", () => {
    const fieldsWithPattern: IConfigRegistrationField[] = [
      {
        ID: "5",
        fieldName: "siret",
        fieldType: "text",
        isRequired: true,
        isVisible: true,
        displayOrder: 50,
        validationPattern: "^\\d{14}$",
        labelKey: "SIRET",
        placeholderKey: "12345678901234",
      },
    ];
    const schema = buildRegistrationSchema(fieldsWithPattern);
    const valid = schema.safeParse({
      ...validInput,
      siret: "12345678901234",
    });
    expect(valid.success).toBe(true);

    const invalid = schema.safeParse({
      ...validInput,
      siret: "123",
    });
    expect(invalid.success).toBe(false);
  });

  it("should work with empty field config (only fixed fields)", () => {
    const schema = buildRegistrationSchema([]);
    const result = schema.safeParse({
      password: "securePass1",
    });
    expect(result.success).toBe(true);
  });

  it("should always include password field even when not in config", () => {
    const schema = buildRegistrationSchema([]);
    const result = schema.safeParse({});
    expect(result.success).toBe(false);
  });
});
