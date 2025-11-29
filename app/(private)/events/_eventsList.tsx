import getToken from "@/utils/getToken";
import { auth } from "@clerk/nextjs/server";
import EventItem from "./_eventItem";

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

  const { userId } = await auth();

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
          <EventItem key={item._id} item={item} userId={userId} />
        )
      )}
    </ul>
  );
};

export default EventsList;
