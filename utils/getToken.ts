import { auth } from "@clerk/nextjs/server";
import { toast } from "sonner";

const getToken = async () => {
  try {
    const { getToken } = await auth();

    const token = await getToken({ template: "eventsProject" });

    return token;
  } catch {
    toast.error("could not identify the user");
  }
};

export default getToken;
