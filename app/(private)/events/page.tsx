import CreateEventTrigger from "./_createEventTrigger";

const page = async () => {
  return (
    <div className="flex flex-col items-center justify-center mt-4 gap-12">
      <h2 className="text-6xl font-extrabold">Events</h2>
      <CreateEventTrigger />
    </div>
  );
};

export default page;
