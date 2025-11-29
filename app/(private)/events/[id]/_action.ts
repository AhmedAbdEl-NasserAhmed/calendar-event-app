"use server";

import { ApiResponse } from "@/lib/type";
import { eventFormSchema, eventSchemaType } from "@/schemas/eventSchema";
import getToken from "@/utils/getToken";

export const editEvent = async (
  data: eventSchemaType,
  id: string
): Promise<ApiResponse> => {
  try {
    const validation = eventFormSchema.safeParse(data);

    if (!validation.success) {
      return {
        status: "Error",
        message: "invalid Form input"
      };
    }

    const token = await getToken();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_LOCALHOST}/api/v1/events/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );

    console.log(data);

    if (!response.ok) {
      return {
        status: "Error",
        message: "could not edit event"
      };
    }

    return {
      status: "Success",
      message: "Event edited successfully"
    };
  } catch {
    return {
      status: "Error",
      message: "An unexpected error occurred"
    };
  }
};

export const deleteEvent = async (id: string): Promise<ApiResponse> => {
  try {
    const token = await getToken();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_LOCALHOST}/api/v1/events/${id}`,
      {
        method: "Delete",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      return {
        status: "Error",
        message: "could not delete event"
      };
    }

    return {
      status: "Success",
      message: "Event deleted successfully"
    };
  } catch {
    return {
      status: "Error",
      message: "An unexpected error occurred"
    };
  }
};
