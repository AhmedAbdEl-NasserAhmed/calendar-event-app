import SignedInNavbar from "@/components/signedInNavbar";
import { auth } from "@clerk/nextjs/server";

import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = await auth();

  return (
    <div>
      {isAuthenticated ? <SignedInNavbar /> : <p>You are not authenticated</p>}
      {children}
    </div>
  );
};

export default Layout;
