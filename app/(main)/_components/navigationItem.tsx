import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { ChevronDown, ChevronRight, LucideIcon, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import { toast } from "sonner";

type Props = {
  onClick: () => void;
  label: string;
  id?: Id<"notes">;
  noteIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  icon: React.ReactNode;
};

export const NavigationItem: React.FC<Props> & { Skeleton: any } = ({
  onClick,
  label,
  id,
  icon,
  active,
  noteIcon,
  isSearch,
  level = 0,
  onExpand,
  expanded,
}) => {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  const create = useMutation(api.notes.create);
  const router = useRouter();

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();

    if (!id) return;

    const promise = create({ heading: "Untitled", parent_note: id }).then(
      (noteId) => {
        if (!expanded) {
          onExpand?.();
        }
        // router.push(`/notes/${noteId}`);
      }
    );

    toast.promise(promise, {
      loading: "Creating note...",
      success: "Note created!",
      error: "Error creating note",
    });
  };

  return (
    <div
      onClick={onClick}
      className="group px-4 py-1 hover:bg-detail text-sm opacity-80 cursor-pointer flex items-center gap-1"
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : "12px",
        backgroundColor: active ? "var(--color-detail)" : "",
      }}
    >
      {!!id && (
        <div
          onClick={handleExpand}
          role="button"
          className="group/expand h-full rounded-sm hover:bg-detail"
        >
          <ChevronIcon className="h-5 w-5 shrink-0 text-secondary opacity-50 group-hover/expand:opacity-100" />
        </div>
      )}
      {noteIcon ? <div>{noteIcon}</div> : <div>{icon}</div>}
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="ml-auto pointer-events-none px-2 select-none items-center rounded border border-secondary opacity-40 flex gap-1">
          <span className="text-xs font-semibold">⌘</span>
          <span className="font-semibold">k</span>
        </kbd>
      )}
      {!!id && (
        <div
          role="button"
          onClick={onCreate}
          className="ml-auto opacity-0 group-hover:opacity-60 hover:!opacity-100"
        >
          <Plus className="" width={20} />
        </div>
      )}
    </div>
  );
};

NavigationItem.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : "12px",
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};
