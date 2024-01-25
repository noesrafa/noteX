"use client";

import Button from "@/components/button/button";
import { useUser } from "@clerk/clerk-react";
import Image from "next/image";
import React from "react";

const NotesPage = () => {
  const { user } = useUser();

  return (
    <div className={`p-10 bg-black/65 w-full h-full`}>
      <div className="w-full h-full flex flex-col justify-center items-center gap-3">
        <h2 className="text-4xl font-semibold">Welcome!</h2>
        <p className="opacity-70 mb-3">
          Embark on your space journey! Start documenting every unique moment
          and amazing discovery.
        </p>
        <Button>Create new space note</Button>
      </div>
    </div>
  );
};

export default NotesPage;
