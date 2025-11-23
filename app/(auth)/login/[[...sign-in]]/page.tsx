import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-12 h-screen">
      <nav>
        <Link href="/">
          <Image
            src="/assets/logo.svg"
            alt="planning"
            width={120}
            height={120}
          />
        </Link>
      </nav>
      <div>
        <SignIn forceRedirectUrl="/events" />
      </div>
    </div>
  );
}
