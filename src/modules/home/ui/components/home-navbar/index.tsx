"use client";

import InputSearch from "@/modules/home/ui/components/home-navbar/input-search";
import AuthButton from "@/modules/auth/ui/components/auth-button";
import { SidebarTrigger } from "@/components/ui/sidebar";

const HomeNavbar = () => {
  return (
    <div className="fixed top-0 z-10 flex items-center justify-start gap-4 border-b px-4 py-2 h-16 w-full bg-[#FAFAFA]">
      <SidebarTrigger />
      <AuthButton />
      {/*Input search*/}
      <InputSearch />
    </div>
  );
};

export default HomeNavbar;
