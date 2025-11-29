"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import { ScheduleData } from "./page";
import { Dispatch, SetStateAction } from "react";

const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

const timeRangeSchema = z
  .object({
    from: z.string().regex(timePattern, "Invalid time"),
    to: z.string().regex(timePattern, "Invalid time")
  })
  .refine((v) => v.from < v.to, {
    path: ["from"],
    message: "Start time must be greater than end time"
  });

const formSchema = z.record(z.string(), z.array(timeRangeSchema));

type FormSchema = z.infer<typeof formSchema>;

export function CreateScheduleForm({
  day,
  setScheduleData
}: {
  day: string;
  setScheduleData: Dispatch<SetStateAction<ScheduleData[]>>;
}) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      [day]: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: day as never
  });

  async function onSubmit(data: FormSchema) {
    setScheduleData((prev) => [
      ...prev.filter((d) => d.id !== day),
      { id: day, [day]: data[day] }
    ]);
  }

  return (
    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <h2 className="font-bold">{day}</h2>
        <div>
          <Button
            type="button"
            className="cursor-pointer"
            form="form-rhf-demo"
            onClick={() => append({ from: "", to: "" })}
          >
            Add
          </Button>
        </div>
        <div
          className={`flex flex-col gap-4 ${
            fields.length >= 4 ? "overflow-y-scroll h-[250px] " : ""
          }  `}
        >
          {fields.map((item, index) => (
            <div key={item.id} className="flex flex-col gap-6 ">
              <div className="flex items-center gap-14">
                <Controller
                  name={`${day}.${index}.from` as const}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`form-rhf-demo-from-${index}`}>
                        From
                      </FieldLabel>
                      <Input
                        {...field}
                        type="time"
                        id={`form-rhf-demo-from-${index}`}
                        aria-invalid={fieldState.invalid}
                        placeholder="From"
                        autoComplete="off"
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name={`${day}.${index}.to` as const}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`form-rhf-demo-to-${index}`}>
                        To
                      </FieldLabel>
                      <Input
                        {...field}
                        id={`form-rhf-demo-to-${index}`}
                        type="time"
                        aria-invalid={fieldState.invalid}
                        placeholder="To"
                        autoComplete="off"
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <div>
                <Field orientation="horizontal">
                  <Button
                    className="cursor-pointer"
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                  >
                    Delete
                  </Button>
                </Field>
              </div>
            </div>
          ))}
        </div>
        {fields.length > 0 && (
          <Field orientation="horizontal">
            <Button
              className="cursor-pointer w-full"
              type="submit"
              variant="default"
            >
              Save
            </Button>
          </Field>
        )}
      </FieldGroup>
    </form>
  );
}
