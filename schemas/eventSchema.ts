import z from "zod";

export const eventFormSchema = z.object({
  eventName: z
    .string()
    .min(5, "Event name must be at least 5 characters.")
    .max(32, "Event name must be at most 32 characters."),

  duration: z
    .number()
    .min(5, "Duration must be at least 5.")
    .max(60, "Duration must be at most 60."),

  description: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length >= 20,
      "Description must be at least 20 characters."
    )
    .refine(
      (val) => !val || val.length <= 100,
      "Description must be at most 100 characters."
    ),

  isActive: z.boolean()
});

export type eventSchemaType = z.infer<typeof eventFormSchema>;
