import SignedInNavbar from "@/components/signedInNavbar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <SignedInNavbar />
      {children}
    </div>
  );
};

export default layout;
