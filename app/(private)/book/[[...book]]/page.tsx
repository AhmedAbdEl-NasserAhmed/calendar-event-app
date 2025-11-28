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

  console.log(userId, eventId);

  return <div></div>;
};

export default page;
