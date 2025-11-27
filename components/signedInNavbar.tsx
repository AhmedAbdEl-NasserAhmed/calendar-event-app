import { EventsDropDownMenu } from "@/app/(private)/events/_eventsDropDownMenu";
import ClerkUserButton from "@/components/clerkUserButton";
import Image from "next/image";
import Link from "next/link";

const SignedInNavbar = () => {
  return (
    <nav className="flex justify-between   px-8 py-6 bg-blue-300/50 drop-shadow-2xl">
      <div className="lg:hidden">
        <EventsDropDownMenu />
      </div>
      <div className="lg:block hidden">
        <Link href="/">
          <Image src="/assets/logo.svg" alt="planning" width={60} height={60} />
        </Link>
      </div>
      <ul className="lg:flex gap-12 items-center hidden ">
        <li>
          <Link className="flex items-center gap-4" href="/events">
            <Image
              src="/assets/events.svg"
              alt="planning"
              width={40}
              height={40}
            />
            <h2 className="font-bold">My Events</h2>
          </Link>
        </li>
        <li>
          <Link className="flex items-center gap-4" href="/schedule">
            <Image
              src="/assets/schedule.svg"
              alt="Schedule"
              width={40}
              height={40}
            />
            <h2 className="font-bold">My Schedule</h2>
          </Link>
        </li>{" "}
        <li>
          <Link className="flex items-center gap-4" href="/profile">
            <Image
              src="/assets/public.svg"
              alt="Public Profile"
              width={40}
              height={40}
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
