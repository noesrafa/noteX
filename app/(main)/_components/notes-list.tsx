"use client";
import React, { useState } from "react";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { NavigationItem } from "./navigationItem";
import { FileIcon } from "lucide-react";

type Props = {
  parentNoteId?: Id<"notes">;
  level?: number;
  data?: Doc<"notes">[];
};

const NotesList: React.FC<Props> = ({ parentNoteId, level = 0, data = [] }) => {
  const params = useParams();
  const router = useRouter();

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (noteId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [noteId]: !prevExpanded[noteId],
    }));
  };

  const notes = useQuery(api.notes.getSidebar, {
    parent_note: parentNoteId,
  });

  const onRedirect = (noteId: string) => {
    router.push(`/notes/${noteId}`);
  };

  if (notes === undefined) {
    return (
      <>
        <NavigationItem.Skeleton level={level} />
        {level === 0 && (
          <>
            <NavigationItem.Skeleton level={level} />
            <NavigationItem.Skeleton level={level} />
            <NavigationItem.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <p
        className={`hidden mb-1
          text-sm opacity-40 font-semibold
          ${expanded && "last:block"} 
          ${level === 0 && "hidden"}`}
        style={{ paddingLeft: level ? `${level * 12 + 22}px` : undefined }}
      >
        No pages inside
      </p>
      {notes.map((note) => (
        <div>
          <NavigationItem
            id={note._id}
            onClick={() => onRedirect(note._id)}
            label={note.heading}
            icon={<FileIcon className="text-secondary opacity-60" width={16} />}
            noteIcon={note.icon}
            active={params.noteId === note._id}
            level={level}
            onExpand={() => onExpand(note._id)}
            expanded={expanded[note._id]}
          />
          {expanded[note._id] && (
            <NotesList parentNoteId={note._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
};

export default NotesList;
