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

import { NavMain } from "@/components/home/home-sidebar/nav-community";
import { NavUtils } from "@/components/home/home-sidebar/nav-utils";
import Image from "next/image";
import Link from "next/link";
import { JobSwitcher } from "@/components/home/home-sidebar/job-switcher";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className={`${open && "px-4"} mt-2`}>
        <Link href="/" className={`flex items-center gap-2`}>
          <Image
            src="/logo.svg"
            alt="logo nolo"
            width={30}
            height={30}
          ></Image>
          <span
            className={`font-semibold ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
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
