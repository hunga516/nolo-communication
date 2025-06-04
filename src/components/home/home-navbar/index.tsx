"use client";

import AuthButton from "@/modules/auth/ui/components/auth-button";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import InputSearch from "./input-search";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";

const HomeNavbar = () => {
  const { open } = useSidebar();

  return (
    <div className="fixed top-0 z-10 flex items-center justify-between gap-4 border-b px-4 py-2 h-16 w-full bg-[#FAFAFA]">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <InputSearch />
      </div>

      <div className={open ? "pr-72 flex items-center gap-2" : "pr-16 flex items-center gap-2"}>
        <Button variant={"secondary"} className="h-8 px-4">
          <Coins className="mr-2 h-4 w-4" />
          <span className="text-sm">0 Coins</span>
        </Button>
        <AuthButton />
      </div>
    </div>
  );
};

export default HomeNavbar;
