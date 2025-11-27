import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function EventsDropDownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 flex flex-col gap-4 p-4 "
        align="start"
      >
        <Link className="flex items-center gap-4" href="/events">
          <Image
            src="/assets/events.svg"
            alt="planning"
            width={15}
            height={15}
          />
          <p className="font-semibold text-sm">My Events</p>
        </Link>
        <DropdownMenuSeparator />
        <Link className="flex items-center gap-4" href="/schedule">
          <Image
            src="/assets/schedule.svg"
            alt="Schedule"
            width={15}
            height={15}
          />
          <p className="font-semibold text-sm">My Schedule</p>
        </Link>
        <DropdownMenuSeparator />
        <Link className="flex items-center gap-4" href="/profile">
          <Image
            src="/assets/public.svg"
            alt="Public Profile"
            width={15}
            height={15}
          />
          <p className="font-semibold text-sm">Public Profile</p>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
