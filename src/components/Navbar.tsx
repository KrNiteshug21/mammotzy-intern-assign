import React from "react";
import SectionWrapper from "./SectionWrapper";
import Image from "next/image";
import { UserRound } from "lucide-react";

const Navbar = () => {
  return (
    <SectionWrapper className="border-b">
      <nav className="flex justify-between items-center">
        <div>
          <Image src="/img/logo.png" alt="logo" width={100} height={100} />
        </div>
        <div className="flex items-center gap-2">
          <UserRound className="bg-gray-300 p-0.5 rounded-full w-4 h-4" />
          <p className="font-normal text-sm tracking-wider">Profile</p>
        </div>
      </nav>
    </SectionWrapper>
  );
};

export default Navbar;
