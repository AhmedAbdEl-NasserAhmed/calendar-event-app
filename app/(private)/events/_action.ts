import { ApiResponse } from "@/lib/type";
import { eventFormSchema, eventSchemaType } from "@/schemas/eventSchema";

export const createNewEvent = async (
  data: eventSchemaType
): Promise<ApiResponse> => {
  try {
    const validataion = eventFormSchema.safeParse(data);
    if (!validataion.success) {
      return {
        status: "Error",
        message: "Invalid form data"
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_LOCALHOST}/api/v1/events`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );

    if (!response.ok) {
      return {
        status: "Error",
        message: "Failed to create event"
      };
    }

    return {
      status: "Success",
      message: "Event created successfully"
    };
  } catch {
    return {
      status: "Error",
      message: "An unexpected error occurred"
    };
  }
};
