import { Params } from "@/lib/type";
import { EditEventForm } from "./_editEventForm";

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;

  const event = await fetch(
    `${process.env.NEXT_PUBLIC_LOCALHOST}/api/v1/events/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      cache: "no-cache"
    }
  ).then((res) => res.json());

  return (
    <div className="w-3/5 mx-auto p-8">
      <EditEventForm event={event.event} />
    </div>
  );
}
