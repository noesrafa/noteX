"use client";

import { usePathname } from "next/navigation";
import { CaretDoubleLeft, List } from "@phosphor-icons/react";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import Logo from "../../../assets/images/logo-sm.svg";
import Image from "next/image";

const Navigation = () => {
  const pathname = usePathname();
  const isCellphone = useMediaQuery("(max-width: 768px)");

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
        className={`group/sidebar h-full bg-black/85 overflow-y-auto relative flex w-60 flex-col z-[999] border-r border-white/30 ${
          isReset && "transition-all ease-in-out duration-300"
        } ${isCellphone && "w-0"}`}
      >
        <Image src={Logo} height={22} alt="logo" className="m-8" />
        <p className="ml-8 mt-2 opacity-60">Rafael Alexander</p>
        <hr className="mt-4 !opacity-20" />
        {/* ========= COLLAPSE ========= */}
        <div
          onClick={closeSidepanel}
          role="button"
          className={`h-8 w-8 text-muted-foreground rounded-sm hover:bg-white/5 absolute top-4 right-4 opacity-0 group-hover/sidebar:opacity-100 transition flex items-center justify-center ${
            isCellphone && "opacity-100"
          }`}
        >
          <CaretDoubleLeft className="text-white/25" size={24} />
        </div>
        {/* ========= RESIZE ========= */}
        <div
          onMouseDown={handleResize}
          onClick={resetearWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-white/15 right-0 top-0"
        />
      </aside>
      {/* ========== NAVIGATION BAR ========== */}
      <div
        ref={navigationBarRef}
        className={`absolute top-0 z-[999] left-60 w-[calc(100%-240px)] ${
          isReset && "transition-all ease-in-out duration-300"
        } ${isCellphone && "left-0 w-full"}`}
      >
        <nav>{isClosed && <List onClick={resetearWidth} />}</nav>
      </div>
    </>
  );
};

export default Navigation;
