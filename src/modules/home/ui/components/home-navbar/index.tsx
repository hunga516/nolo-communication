"use client"

import InputSearch from "@/modules/home/ui/components/home-navbar/input-search";
import AuthButton from "@/modules/auth/ui/components/auth-button";

const HomeNavbar = () => {


    return (
        <div className="flex items-center justify-between border-b px-4 py-2 h-16 w-full bg-[#FAFAFA]">
            {/*Input search*/}
            <InputSearch />

           {/* /!*Auth button*!/*/}
          <AuthButton />
        </div>
    )
}

export default HomeNavbar;