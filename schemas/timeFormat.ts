import z from "zod";

const timeRangeSchema = z
  .object({
    from: z.string().regex(/^(0[0-9]|1\d|2[0-3]):([0-5]\d)$/, {
      message: "Invalid time format (HH:MM)"
    }),
    to: z.string().regex(/^(0[0-9]|1\d|2[0-3]):([0-5]\d)$/, {
      message: "Invalid time format (HH:MM)"
    })
  })
  .refine(
    ({ from, to }) => {
      const fromMinutes =
        parseInt(from.split(":")[0]) * 60 + parseInt(from.split(":")[1]);
      const toMinutes =
        parseInt(to.split(":")[0]) * 60 + parseInt(to.split(":")[1]);

      return fromMinutes < toMinutes;
    },
    {
      message: "End time must be later than start time",
      path: ["to"]
    }
  );

export const formSchema = z.record(z.string(), z.array(timeRangeSchema));

export type FormSchema = z.infer<typeof formSchema>;
