"use client";
import { SignIn } from "@clerk/nextjs";

const ClerkSignIn = () => {
  return <SignIn routing="hash" />;
};

export default ClerkSignIn;
