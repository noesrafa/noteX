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
        className=" w-full flex items-center justify-between hover:bg-detail transition cursor-pointer px-4 py-3 relative"
      >
        <p className="text-sm">{user?.fullName ?? "Invited"}</p>
        <CaretUpDown className="opacity-80" />
      </div>
      <div
        className={`flex flex-col  border-detail overflow-y-hidden h-0 ${
          showModal && user && "h-[84px] m-2 mt-1 border"
        } transition-[width] ease-in-out duration-300`}
      >
        <div className="flex items-center gap-3">
          {user?.imageUrl && (
            <Image src={user?.imageUrl} alt="" width={44} height={44} />
          )}
          <p className="flex flex-col ">
            <span className="text-sm font-semibold">
              {user?.fullName ?? "Invited"}
            </span>
            <span className="text-xs opacity-80">
              {user?.primaryEmailAddress?.emailAddress ?? "no-email"}
            </span>
          </p>
        </div>
        <div className="divider" />
        <SignOutButton>
          <span className="text-sm opacity-80 text-center py-2 hover:bg-detail cursor-pointer">
            Sign out
          </span>
        </SignOutButton>
      </div>
    </div>
  );
};

export default ProfileModal;
