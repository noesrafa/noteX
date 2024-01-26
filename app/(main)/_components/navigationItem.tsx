import { Skeleton } from "@/components/ui/skeleton";
import { Id } from "@/convex/_generated/dataModel";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import React, { ReactNode } from "react";

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

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  return (
    <div
      onClick={onClick}
      className="px-4 py-1 hover:bg-detail text-sm opacity-80 cursor-pointer flex items-center gap-1"
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
          <ChevronIcon className="h-4 w-4 shrink-0 text-secondary opacity-50 group-hover/expand:opacity-100" />
        </div>
      )}
      {noteIcon ? <div>{noteIcon}</div> : <div>{icon}</div>}
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="ml-auto pointer-events-none px-2 select-none items-center rounded border border-secondary opacity-40 flex gap-1">
          <span className="text-[9px] font-semibold">⌘</span>
          <span className="font-semibold">k</span>
        </kbd>
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
