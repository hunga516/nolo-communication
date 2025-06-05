"use client";

import AuthButton from "@/modules/auth/ui/components/auth-button";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import InputSearch from "./input-search";
import { UserContextProvider } from "@/contexts/user.context";
import CoinsButton from "./coins-button";

const HomeNavbar = () => {
  const { open } = useSidebar();


  return (
    <UserContextProvider>
      <div className="fixed top-0 z-10 flex items-center justify-between gap-4 border-b px-4 py-2 h-16 w-full bg-[#FAFAFA]">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <InputSearch />
        </div>

        <div className={open ? "pr-72 flex items-center gap-2" : "pr-16 flex items-center gap-2"}>
          <CoinsButton />
          <AuthButton />
        </div>
      </div>
    </UserContextProvider>
  );
};

export default HomeNavbar;
