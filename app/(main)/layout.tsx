import React, { ReactNode } from "react";
import Navigation from "./_components/navigation";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full flex">
      <Navigation />
      <main className="flex-1 h-full overflow-auto">{children}</main>
    </div>
  );
};

export default Layout;
