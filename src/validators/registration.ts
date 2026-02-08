import { z } from "zod";

export const registrationSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  password: z.string().min(8).max(128),
  termsAccepted: z.literal(true, {
    message: "Terms must be accepted",
  }),
  privacyAccepted: z.literal(true, {
    message: "Privacy policy must be accepted",
  }),
  marketingOptIn: z.boolean().optional().default(false),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

export const profileUpdateSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  marketingOptIn: z.boolean().optional(),
});

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
