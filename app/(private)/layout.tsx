import SignedInNavbar from "@/components/signedInNavbar";

import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <SignedInNavbar />
      {children}
    </div>
  );
};

export default Layout;
