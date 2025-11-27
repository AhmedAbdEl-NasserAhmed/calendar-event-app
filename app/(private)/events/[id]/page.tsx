import { Params } from "@/lib/type";

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

  // Event must be

  return <div></div>;
}
