import getToken from "@/utils/getToken";
import { EditEventForm } from "./_editEventForm";

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const token = await getToken();

  const event = await fetch(
    `${process.env.NEXT_PUBLIC_LOCALHOST}/api/v1/events/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
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
