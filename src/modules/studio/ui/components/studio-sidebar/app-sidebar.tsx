"use client";

import * as React from "react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar";

import Image from "next/image";
import Link from "next/link";
import {LogOut, VideoIcon} from "lucide-react";
import {usePathname} from "next/navigation";
import {Separator} from "@/components/ui/separator";
import StudioSidebarUser from "@/modules/studio/ui/components/studio-sidebar/studio-sidebar-user";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className={`${open && "px-4"} mt-2`}>
        <Link href="/studio" className={`flex items-center gap-2`}>
          <Image
            src="./logo.svg"
            className=""
            alt="logo nolo"
            width={30}
            height={30}
          ></Image>
          <span
            className={`font-semibold ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            NOLO Studio
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="mt-2">
          <SidebarGroup>
              <StudioSidebarUser />
              {open && (
                  <SidebarGroupLabel>Quản lý nội dung của bạn</SidebarGroupLabel>
              )}
              <SidebarGroupContent>
                  <SidebarMenu>
                      <SidebarMenuItem>
                          <SidebarMenuButton isActive={pathname === "/studio"} asChild>
                              <Link href="/studio">
                                  <VideoIcon className="size-5" />
                                  Nội dung của bạn
                              </Link>
                          </SidebarMenuButton>
                      </SidebarMenuItem>
                      <Separator />
                      <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                              <Link href="/">
                                  <LogOut className="size-5" />
                                  Trở về Nolo Community
                              </Link>
                          </SidebarMenuButton>
                      </SidebarMenuItem>
                  </SidebarMenu>
              </SidebarGroupContent>
          </SidebarGroup>
      </SidebarContent>
      {/*<SidebarFooter>*/}
      {/*  <JobSwitcher />*/}
      {/*</SidebarFooter>*/}
      <SidebarRail />
    </Sidebar>
  );
}
