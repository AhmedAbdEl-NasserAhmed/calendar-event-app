import SignedInNavbar from "@/components/signedInNavbar";
import { Toaster } from "@/components/ui/sonner";

import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <SignedInNavbar />
      {children}
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default Layout;
