import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

const ClerkUserButton = () => {
  return (
    <UserButton
      fallback={
        <Image
          src="/assets/profile.svg"
          alt="planning"
          width={28}
          height={28}
        />
      }
    />
  );
};

export default ClerkUserButton;
