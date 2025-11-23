import { currentUser } from "@clerk/nextjs/server";

const page = async () => {
  const user = await currentUser();

  return <div>Hello from MR {user?.firstName}</div>;
};

export default page;
