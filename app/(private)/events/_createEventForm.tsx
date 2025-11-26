"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea
} from "@/components/ui/input-group";
import { Switch } from "@/components/ui/switch";
import { eventFormSchema, eventSchemaType } from "@/schemas/eventSchema";
import { useTransition } from "react";
import { createNewEvent } from "./_action";
import { Spinner } from "@/components/ui/spinner";

export function CreateEventForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<eventSchemaType>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      eventName: "",
      duration: 0,
      description: "",
      isActive: true
    }
  });

  async function onSubmit(data: eventSchemaType) {
    startTransition(async () => {
      try {
        const { message, status } = await createNewEvent(data);
        if (status === "Success") {
          toast.success(message);
          form.reset();
        } else {
          toast.error(message);
        }
      } catch {
        toast.error("Failed to create event. Please try again.");
      }
    });
  }

  return (
    <Card>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="eventName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Event Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-name"
                    aria-invalid={fieldState.invalid}
                    placeholder=" Team Meeting"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="duration"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Duration
                  </FieldLabel>
                  <Input
                    {...field}
                    min={0}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    type="number"
                    id="form-rhf-demo-duration"
                    aria-invalid={fieldState.invalid}
                    placeholder=" Meeting Duration"
                  />
                  <FieldDescription className="text-sm text-gray-500">
                    In Minutes
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Description
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-demo-description"
                      rows={6}
                      className="min-h-18 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/100 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>
                    Optional description about the event.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="isActive"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-isActive">
                    Is Active
                  </FieldLabel>
                  <div>
                    <Switch
                      id="form-rhf-demo-isActive"
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
                      onBlur={field.onBlur}
                      name={field.name}
                    />
                  </div>
                  <FieldDescription className="text-sm text-gray-500">
                    Inactive events will not be visible for users to book
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            className="cursor-pointer"
            type="button"
            disabled={isPending}
            variant="outline"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button
            className="cursor-pointer"
            type="submit"
            form="form-rhf-demo"
            disabled={isPending}
          >
            {isPending ? (
              <>
                Creating...
                <Spinner />
              </>
            ) : (
              "Create Event"
            )}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
