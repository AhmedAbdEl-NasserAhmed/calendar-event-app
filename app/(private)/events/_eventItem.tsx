"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatMinutes } from "@/utils/date_fns";
import Link from "next/link";
import { toast } from "sonner";

const EventItem = ({
  item,
  userId
}: {
  item: {
    _id: string;
    eventName: string;
    duration: number;
    description: string;
    isActive: boolean;
  };
  userId: string | null;
}) => {
  async function handleCopyLink(eventId: string) {
    try {
      await navigator.clipboard.writeText(
        `http://localhost:3000/book/${userId}/${eventId}`
      );
      toast.success("Link is copied ");
    } catch {
      toast.error("Failed to copy:");
    }
  }

  return (
    <li
      key={item._id}
      className={`flex flex-col gap-4 bg-white  shadow-xl rounded-2xl p-6  border-2 border-blue-300 w-full`}
    >
      <div className="flex flex-col gap-4 ">
        <div className="flex items-center justify-between">
          <h2>{item.eventName}</h2>
          {!item.isActive && (
            <p className="text-xs font-semibold p-2 bg-gray-200 rounded-xl">
              Not active
            </p>
          )}
        </div>
        <p className="font-semibold">{formatMinutes(item.duration)}</p>
      </div>
      <p className="overflow-hidden text-ellipsis whitespace-nowrap">
        {item.description ? item.description : "No Description available"}
      </p>
      <div className="flex items-center justify-between ">
        {item.isActive && (
          <Button
            onClick={() => handleCopyLink(item._id)}
            variant="outline"
            type="button"
            className="cursor-pointer"
          >
            Copy Link
          </Button>
        )}
        <Link
          href={`/events/${item._id}`}
          className={cn(
            buttonVariants({ variant: "default" }),
            "bg-blue-400 cursor-pointer"
          )}
        >
          Edit
        </Link>
      </div>
    </li>
  );
};

export default EventItem;
