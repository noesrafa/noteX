import React, { ReactNode } from "react";
import Navigation from "./_components/navigation";
import BackgroundImage from "../../assets/images/background.webp";
import Image from "next/image";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full flex">
      <Navigation />
      <Image
        src={BackgroundImage}
        layout="fill"
        objectFit="cover"
        alt="bg"
        className="absolute top-0 left-0 z-[-1] blur-2xl"
      />
      <main className="flex-1 h-full overflow-auto">{children}</main>
    </div>
  );
};

export default Layout;
