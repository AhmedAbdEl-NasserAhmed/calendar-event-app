import ClerkSignIn from "@/components/clerkSignIn";
import Image from "next/image";

export default async function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center lg:flex-row lg:justify-between lg:w-3/4 lg:mx-auto gap-8 ">
      <div className="text-center">
        <h2 className="font-extrabold capitalize text-3xl ">
          your time is perfectely planned
        </h2>
        <Image
          className="hidden lg:block mx-auto"
          src="/assets/planning.svg"
          alt="planning"
          width={400}
          height={400}
        />
        <p className="text-gray-400 text-sm mt-2">
          Join millions of professionals who easily book meetings with the 1#
          scheduling tool
        </p>
      </div>
      <ClerkSignIn />
    </div>
  );
}
