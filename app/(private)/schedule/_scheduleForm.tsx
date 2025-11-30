"use client";

import { CustomizedSelectMenuEnd } from "@/components/customizedSelectMenuEnd";
import { CustomizedSelectMenuStart } from "@/components/customizedSelectMenuStart";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field";
import { formSchema, FormSchema } from "@/schemas/timeFormat";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { Dispatch, SetStateAction, useRef } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { ScheduleData } from "./page";

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

  const currentIndexV2 = useRef(0);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: day as never
  });

  const watchedData = useWatch({
    control: form.control,
    name: day
  });

  async function onSubmit(data: FormSchema) {
    setScheduleData((prev) => [
      ...prev.filter((d) => d.id !== day),
      { id: day, [day]: data[day] }
    ]);
  }

  function handleAddingNewSlot() {
    const from = watchedData[currentIndexV2.current]?.from;
    const to = watchedData[currentIndexV2.current]?.to;

    if (fields.length === 0) {
      append({ from: "", to: "" });
    }

    if (from && to) {
      append({ from: "", to: "" });
      currentIndexV2.current = fields.length;
    } else if ((!from || !to) && fields.length > 0) {
      toast.error("Please fill the slot first");
    }
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
            onClick={handleAddingNewSlot}
          >
            <PlusCircle />
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
                      <CustomizedSelectMenuStart
                        disabledByRow={fields.length - 1 > index}
                        endTime={watchedData[index - 1]?.to}
                        plcaeHolder="Select Start Time"
                        fieldState={fieldState}
                        id={`form-rhf-demo-from-${index}`}
                        field={field}
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
                      <CustomizedSelectMenuEnd
                        disabledByRow={fields.length - 1 > index}
                        startTime={watchedData[index]?.from}
                        plcaeHolder="Select End Time"
                        fieldState={fieldState}
                        id={`form-rhf-demo-to-${index}`}
                        field={field}
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
                    onClick={() => {
                      remove(index);
                      currentIndexV2.current = index - 1;
                    }}
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
