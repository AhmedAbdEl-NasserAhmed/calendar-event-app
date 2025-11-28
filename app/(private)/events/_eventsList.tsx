import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import getToken from "@/utils/getToken";
import Link from "next/link";

const EventsList = async () => {
  const token = await getToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_LOCALHOST}/api/v1/events`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
      cache: "no-store"
    }
  );

  const data = await res.json();

  return (
    <ul className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(320px,1fr))] w-full ">
      {data.data.map(
        (item: {
          _id: string;
          eventName: string;
          duration: number;
          description: string;
          isActive: boolean;
        }) => (
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
              <p className="font-semibold">{item.duration} min</p>
            </div>
            <p className="overflow-hidden text-ellipsis whitespace-nowrap">
              {item.description ? item.description : "No Description available"}
            </p>
            <div className="flex items-center justify-between ">
              <Button
                disabled={!item.isActive}
                variant="outline"
                className="cursor-pointer"
              >
                Copy link
              </Button>
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
        )
      )}
    </ul>
  );
};

export default EventsList;
