"use client"

import * as React from "react"
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader, SidebarMenu, SidebarMenuItem,
  SidebarRail, useSidebar,
} from "@/components/ui/sidebar"

import {NavMain} from "@/modules/home/ui/components/home-sidebar/nav-main";
import {NavProjects} from "@/modules/home/ui/components/home-sidebar/nav-projects";
import Image from "next/image";
import Link from "next/link";
import {log} from "node:util";

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

  const { open } = useSidebar()

  console.log(open)

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="mx-auto mt-2">
          <Link href="/" className={`flex items-center gap-2`}>
            <Image src="./logo.svg" alt="logo nolo" width={30} height={30}></Image>
            <span className={`font-semibold ${open ? "duration-1000 opacity-100" : "duration-100 opacity-0 pointer-events-none"}`} >NOLO Community</span>
          </Link>
      </SidebarHeader>
      <SidebarContent className="mt-2">
        <NavMain/>
        <NavProjects />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
