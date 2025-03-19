"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

import { NavMain } from "@/modules/home/ui/components/home-sidebar/nav-main";
import { NavUtils } from "@/modules/home/ui/components/home-sidebar/nav-utils";
import Image from "next/image";
import Link from "next/link";
import { JobSwitcher } from "@/modules/home/ui/components/home-sidebar/team-switcher";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="mx-auto mt-2">
        <Link href="/" className={`flex items-center gap-2`}>
          <Image
            src="./logo.svg"
            alt="logo nolo"
            width={30}
            height={30}
          ></Image>
          <span
            className={`font-semibold ${open ? "duration-1000 opacity-100" : "duration-100 opacity-0 pointer-events-none"}`}
          >
            NOLO Community
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="mt-2">
        <NavMain />
        <NavUtils />
      </SidebarContent>
      <SidebarFooter>
        <JobSwitcher />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
