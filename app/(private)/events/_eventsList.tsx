import { Button } from "@/components/ui/button";

const EventsList = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_LOCALHOST}/api/v1/events`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cache: "no-store"
      }
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
        }) => (
          <li
            key={item._id}
            className="flex flex-col gap-4 bg-white shadow-xl rounded-2xl p-6  border-2 border-blue-300 w-full "
          >
            <div className="flex flex-col gap-4 ">
              <h2>{item.eventName}</h2>
              <p className="font-semibold">{item.duration} min</p>
            </div>
            <p className="overflow-hidden text-ellipsis whitespace-nowrap">
              {item.description}
            </p>
            <div className="flex items-center justify-between ">
              <Button variant="outline" className="cursor-pointer">
                Copy link
              </Button>
              <Button className="bg-blue-400 cursor-pointer">Edit</Button>
            </div>
          </li>
        )
      )}
    </ul>
  );
};

export default EventsList;
