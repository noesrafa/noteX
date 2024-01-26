"use client";

import Button from "@/components/button/button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import React from "react";
import { toast } from "sonner";

const NotesPage = () => {
  const { user } = useUser();
  const create = useMutation(api.notes.create);

  const onCreate = () => {
    console.log("Creating note");
    const promise = create({ heading: "Yujuuu" });

    toast.promise(promise, {
      loading: "Creating note...",
      success: "Note created!",
      error: "Error creating note",
    });
  };

  return (
    <div className={`p-10  w-full h-full`}>
      <div className="w-full h-full flex flex-col justify-center items-center gap-3">
        <h2 className="text-6xl font-semibold orbitron">Welcome!</h2>
        <p className="opacity-70 mb-3">
          Embark on your space journey! Start documenting every unique moment
          and amazing discovery.
        </p>
        <Button onClick={onCreate}>Create new space note</Button>
      </div>
    </div>
  );
};

export default NotesPage;
