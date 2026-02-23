import { z } from "zod";
import { PHOTO_ALLOWED_MIME_TYPES } from "../constants/listing.js";

/** Allowed photo MIME types schema. */
export const photoMimeTypeSchema = z.enum(
  PHOTO_ALLOWED_MIME_TYPES as unknown as [string, ...string[]],
);

/** Schema for reorder photos input. */
export const reorderPhotosInputSchema = z.object({
  listingId: z.string().uuid(),
  photoIds: z.array(z.string().uuid()).min(1),
});

export type ReorderPhotosInputValidated = z.infer<typeof reorderPhotosInputSchema>;
