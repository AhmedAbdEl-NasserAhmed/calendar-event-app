import ClerkUserButton from "@/components/clerkUserButton";
import Image from "next/image";
import Link from "next/link";

const SignedInNavbar = () => {
  return (
    <nav className="flex justify-between  px-8 py-6 bg-blue-300/50 drop-shadow-2xl">
      <div>
        <Link href="/">
          <Image src="/assets/logo.svg" alt="planning" width={80} height={80} />
        </Link>
      </div>
      <ul className="flex gap-12 items-center">
        <li>
          <Link className="flex items-center gap-4" href="/events">
            <Image
              src="/assets/events.svg"
              alt="planning"
              width={65}
              height={65}
            />
            <h2 className="font-bold">My Events</h2>
          </Link>
        </li>
        <li>
          <Link className="flex items-center gap-4" href="/schedule">
            <Image
              src="/assets/schedule.svg"
              alt="Schedule"
              width={65}
              height={65}
            />
            <h2 className="font-bold">My Schedule</h2>
          </Link>
        </li>{" "}
        <li>
          <Link className="flex items-center gap-4" href="/pofile">
            <Image
              src="/assets/public.svg"
              alt="Public Profile"
              width={65}
              height={65}
            />
            <h2 className="font-bold">Public Profile</h2>
          </Link>
        </li>
      </ul>
      <ClerkUserButton />
    </nav>
  );
};

export default SignedInNavbar;
