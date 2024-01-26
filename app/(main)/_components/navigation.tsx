"use client";

import { usePathname } from "next/navigation";
import { CaretDoubleLeft, List } from "@phosphor-icons/react";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import Logo from "../../../assets/images/logo-sm.svg";
import Image from "next/image";
import ProfileModal from "./profileModal";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth, useQuery } from "convex/react";
import { useTheme } from "next-themes";
import ButtonTheme from "@/components/buttonTheme/buttonTheme";
import { api } from "@/convex/_generated/api";

const Navigation = () => {
  const pathname = usePathname();
  const isCellphone = useMediaQuery("(max-width: 768px)");
  const { isLoading, isAuthenticated } = useConvexAuth();
  const notes = useQuery(api.notes.get);

  const isResizeRef = useRef(false);
  const sidepanelRef = useRef<ElementRef<"aside">>(null);
  const navigationBarRef = useRef<ElementRef<"div">>(null);
  const [isReset, setIsReset] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const handleResize = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizeRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizeRef.current) return;
    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidepanelRef.current && navigationBarRef.current) {
      sidepanelRef.current.style.width = `${newWidth}px`;
      navigationBarRef.current.style.setProperty("left", `${newWidth}px`);
      navigationBarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleMouseUp = () => {
    isResizeRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetearWidth = () => {
    if (sidepanelRef.current && navigationBarRef.current) {
      setIsClosed(false);
      setIsReset(true);

      sidepanelRef.current.style.width = isCellphone ? "100%" : "240px";
      navigationBarRef.current.style.setProperty(
        "width",
        isCellphone ? "0" : "calc(100% - 240px)"
      );
      navigationBarRef.current.style.setProperty(
        "left",
        isCellphone ? "100%" : "240px"
      );

      setTimeout(() => {
        setIsReset(false);
      }, 300);
    }
  };

  const closeSidepanel = () => {
    if (sidepanelRef.current && navigationBarRef.current) {
      setIsClosed(true);
      setIsReset(true);

      sidepanelRef.current.style.width = "0";
      navigationBarRef.current.style.setProperty("width", "100%");
      navigationBarRef.current.style.setProperty("left", "0");

      setTimeout(() => {
        setIsReset(false);
      }, 300);
    }
  };

  useEffect(() => {
    if (isCellphone) {
      closeSidepanel();
    } else {
      resetearWidth();
    }
  }, [isCellphone]);

  useEffect(() => {
    if (isCellphone) {
      closeSidepanel();
    }
  }, [pathname, isCellphone]);

  return (
    <>
      <aside
        ref={sidepanelRef}
        className={`group/sidebar h-full overflow-y-auto relative flex w-60 flex-col z-[999] border-r border-detail whitespace-nowrap overflow-x-hidden ${
          isReset && "transition-all ease-in-out duration-300"
        } ${isCellphone && "w-0 !border-none"}`}
      >
        <p className="orbitron p-5">NoteX</p>
        {!isLoading && isAuthenticated ? (
          <ProfileModal />
        ) : (
          <SignInButton mode="modal">
            <button className="text-left px-6 py-3 opacity-80 hover:bg-detail text-sm">
              Sign in to start!
            </button>
          </SignInButton>
        )}
        <div className="divider" />
        <ButtonTheme />
        {notes?.map((note) => (
          <p key={note._id}>{note.heading}</p>
        ))}
        {/* ========= COLLAPSE ========= */}
        <div
          onClick={closeSidepanel}
          role="button"
          className={`h-8 w-8 text-muted-foreground rounded-sm hover:bg-detail absolute top-4 right-4 opacity-60 group-hover/sidebar:opacity-70 hover:!opacity-100 transition flex items-center justify-center ${
            isCellphone && "!opacity-100"
          }`}
        >
          <CaretDoubleLeft className="text-secondary" size={24} />
        </div>
        {/* ========= RESIZE ========= */}
        <div
          onMouseDown={handleResize}
          onClick={resetearWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 cursor-ew-resize absolute h-full w-1 bg-detail right-0 top-0"
        />
      </aside>
      {/* ========== NAVIGATION BAR ========== */}
      <div
        ref={navigationBarRef}
        className={`absolute top-0 z-[999] left-60 w-[calc(100%-240px)] ${
          isReset && "transition-transform ease-in-out duration-300"
        } ${isCellphone && "left-0 w-full"}`}
      >
        <nav className="group/nav p-2">
          {isClosed && (
            <div className="h-9 w-9 flex justify-center items-center opacity-70 group-hover/nav:opacity-100 hover:bg-detail transition rounded-md cursor-pointer">
              <List
                onClick={resetearWidth}
                width={28}
                height={28}
                className="min-w-[64px]"
              />
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navigation;
