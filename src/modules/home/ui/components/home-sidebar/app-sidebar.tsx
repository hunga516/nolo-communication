"use client"

import * as React from "react"
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd, Images,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent, SidebarGroup,
  SidebarHeader, SidebarMenu,
  SidebarRail, SidebarTrigger,
} from "@/components/ui/sidebar"

import {NavMain} from "@/modules/home/ui/components/home-sidebar/nav-main";
import {NavProjects} from "@/modules/home/ui/components/home-sidebar/nav-projects";
import Image from "next/image";

export const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarGroup>
          <SidebarTrigger className="p-4"></SidebarTrigger>
         <SidebarMenu>
           <Image src="./logo.svg" alt="logo nolo" width={25} height={25}></Image>
         </SidebarMenu>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        <NavMain/>
        <NavProjects />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
