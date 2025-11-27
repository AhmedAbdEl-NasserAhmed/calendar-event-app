"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
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
import { cn } from "@/lib/utils";
import { eventFormSchema, eventSchemaType } from "@/schemas/eventSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { deleteEvent, editEvent } from "./_action";

export function EditEventForm({
  event
}: {
  event: {
    _id: string;
    eventName: string;
    duration: number;
    description: string;
    isActive: boolean;
  };
}) {
  const [isPendingEditing, startTransitionEditing] = useTransition();

  const [isPendingDeleting, startTransitionDeleting] = useTransition();

  const form = useForm<eventSchemaType>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      eventName: event.eventName,
      duration: event.duration,
      description: event.description,
      isActive: event.isActive
    }
  });

  async function onSubmit(data: eventSchemaType) {
    startTransitionEditing(async () => {
      const { status, message } = await editEvent(data, event._id);
      if (status === "Success") {
        toast.success(message);
        redirect("/events");
      } else {
        toast.error(message);
      }
    });
  }

  async function onDeleteEvent() {
    startTransitionDeleting(async () => {
      const { status, message } = await deleteEvent(event._id);
      if (status === "Success") {
        toast.success(message);
        redirect("/events");
      } else {
        toast.error(message);
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
                        {field.value ? field.value.length : 0}/100 characters
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
            disabled={isPendingEditing}
            className="cursor-pointer"
            type="button"
            variant="outline"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Dialog>
            <DialogTrigger
              disabled={isPendingEditing}
              className={cn(buttonVariants({ variant: "destructive" }))}
            >
              Delete
            </DialogTrigger>
            <DialogContent className="max-h-[700px] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">
                  Are you sure that you want to delete this Event
                </DialogTitle>
              </DialogHeader>
              <div className="flex items-center justify-center gap-4">
                <Button
                  disabled={isPendingDeleting}
                  variant="destructive"
                  type="button"
                  onClick={onDeleteEvent}
                >
                  Delete
                </Button>
                <Button
                  variant="default"
                  type="button"
                  disabled={isPendingDeleting}
                >
                  Cancel
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button
            disabled={isPendingEditing}
            className="cursor-pointer"
            type="submit"
            form="form-rhf-demo"
          >
            Edit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
