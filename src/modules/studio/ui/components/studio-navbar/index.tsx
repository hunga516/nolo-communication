"use client";

import AuthButton from "@/modules/auth/ui/components/auth-button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import StudioUploadModal from "@/modules/studio/ui/components/studio-upload-modal";

const StudioNavbar = () => {
  return (
    <div className="flex items-center justify-between gap-2 border-b px-4 py-2 h-16 w-full bg-[#FAFAFA]">
      <div className="flex items-center justify-between gap-2">
        <SidebarTrigger />
      </div>

      <div className="flex gap-6">
        <StudioUploadModal />

        <AuthButton />
      </div>
    </div>
  );
};

export default StudioNavbar;
