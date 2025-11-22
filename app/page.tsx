import ClerkSignIn from "@/components/clerkSignIn";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center lg:flex-row lg:justify-between lg:w-3/4 lg:mx-auto gap-8 ">
      <div className="text-center">
        <h2 className="font-extrabold capitalize text-2xl ">
          your time perfectely planned
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          Join millions of professionals who easily book meetings with the 1#
          scheduling tool
        </p>
      </div>
      <ClerkSignIn />
    </div>
  );
}
