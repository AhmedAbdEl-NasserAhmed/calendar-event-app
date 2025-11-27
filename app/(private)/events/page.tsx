import { Suspense } from "react";
import CreateEventTrigger from "./_create/_createEventTrigger";
import EventsList from "./_eventsList";

const page = async () => {
  return (
    <div className="flex flex-col justify-center gap-12 px-12 py-4">
      <h2 className="text-6xl font-extrabold text-center">Events</h2>
      <div className="text-center">
        <CreateEventTrigger />
      </div>
      <Suspense fallback={<div>Loading events...</div>}>
        <EventsList />
      </Suspense>
    </div>
  );
};

export default page;
