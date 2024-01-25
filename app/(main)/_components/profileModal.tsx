"use client";

import { SignOutButton, useUser } from "@clerk/clerk-react";
import { CaretUpDown } from "@phosphor-icons/react";
import Image from "next/image";
import React, { useState } from "react";

const ProfileModal = () => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useUser();

  const handleOpenModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <div
        onClick={handleOpenModal}
        className="opacity-70 w-full flex items-center justify-between hover:bg-white/5 transition cursor-pointer px-4 py-3 relative"
      >
        <p className="text-sm">{user?.fullName ?? "Invited"}</p>
        <CaretUpDown className="opacity-60" />
      </div>
      <div
        className={`flex flex-col  bg-black/5  border-white/10 overflow-y-hidden h-0 ${
          showModal && user && "h-[84px] m-2 mt-1 border"
        } transition-all ease-in-out duration-300`}
      >
        <div className="flex items-center gap-3">
          {user?.imageUrl && (
            <Image src={user?.imageUrl} alt="" width={44} height={44} />
          )}
          <p className="flex flex-col ">
            <span className="text-sm opacity-75 font-semibold">
              {user?.fullName ?? "Invited"}
            </span>
            <span className="text-xs opacity-40">
              {user?.primaryEmailAddress?.emailAddress ?? "no-email"}
            </span>
          </p>
        </div>
        <hr className="!opacity-10" />
        <SignOutButton>
          <span className="text-sm opacity-80 text-center py-2 hover:bg-white/10 transition cursor-pointer">
            Sign out
          </span>
        </SignOutButton>
      </div>
    </div>
  );
};

export default ProfileModal;