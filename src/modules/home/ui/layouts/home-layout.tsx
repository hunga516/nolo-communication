import HomeNavbar from "@/modules/home/ui/components/home-navbar";
import {HomeSidebar} from "@/modules/home/ui/components/home-sidebar";
import {useEffect, useState} from "react";
import Command from "@/modules/home/logic/command";

interface HomeLayoutProps {
    children: React.ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
    return (
        <HomeSidebar>
            <div className="w-full">
                <div>
                    <HomeNavbar/>
                    {children}
                </div>
            </div>
            <Command />
        </HomeSidebar>
    )
}

export default HomeLayout