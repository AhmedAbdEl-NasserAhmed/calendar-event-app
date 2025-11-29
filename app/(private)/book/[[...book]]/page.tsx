const page = async ({
  params
}: {
  params: Promise<{
    book: [userId: string, eventId: string];
  }>;
}) => {
  const {
    book: [userId, eventId]
  } = await params;

  return (
    <div>
      {userId} {eventId}
    </div>
  );
};

export default page;
