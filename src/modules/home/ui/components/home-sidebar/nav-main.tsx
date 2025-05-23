"use client";

import { usePathname } from "next/navigation";
import {
  BookOpen,
  ChevronRight,
  DollarSign,
  Earth,
  House,
  MonitorPlay,
  Scroll,
  TrendingUp,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useAuth, useClerk } from "@clerk/nextjs";

const navMain = [
  {
    title: "Trang chủ",
    url: "/",
    icon: House,
    isActive: false,
  },
  {
    title: "Live Stream",
    url: "/live-stream",
    icon: MonitorPlay,
  },
  {
    title: "Cộng đồng",
    url: "/cong-dong",
    icon: Earth,
    isActive: false,
    auth: true,
    items: [
      {
        title: "Bạn bè",
        url: "/cong-dong/ban-be",
        auth: true,
      },
      {
        title: "Nhóm của bạn",
        url: "/cong-dong/nhom-cua-ban",
        auth: true,
      },
    ],
  },
  {
    title: "Xu hướng",
    url: "/xu-huong",
    icon: TrendingUp,
    isActive: false,
  },
  {
    title: "Giao dịch",
    url: "/giao-dich",
    icon: DollarSign,
    auth: true,
    items: [
      {
        title: "Đấu giá",
        url: "/giao-dich/dau-gia",
        auth: true,
      },
      {
        title: "Mua bán",
        url: "/giao-dich/mua-ban",
        auth: true,
      },
    ],
  },
  {
    title: "Hướng dẫn cài game",
    url: "/huong-dan-cai-game",
    icon: BookOpen,
    items: [
      {
        title: "Tải về",
        url: "/tai-ve",
      },
      {
        title: "Cài đặt",
        url: "/cai-dat",
      },
      {
        title: "Hướng dẫn cơ bản",
        url: "/huong-dan-co-ban",
      },
    ],
  },
  {
    title: "Hướng dẫn việc làm",
    url: "/huong-dan-viec-lam",
    icon: Scroll,
  },
];

export function NavMain() {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();
  const clerk = useClerk();

  return (
    // inside sidebar
    <SidebarGroup>
      <SidebarGroupLabel>Cộng đồng và giao dịch</SidebarGroupLabel>
      <SidebarMenu>
        {navMain.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              {item.items && item.items.length > 0 ? (
                // Nếu có submenu => Dùng CollapsibleTrigger
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    className={`${pathname === item.url ? "bg-gray-100" : ""}`}
                    tooltip={item.title}
                    onClick={(e) => {
                      if (!isSignedIn && item.auth) {
                        e.preventDefault();
                        return clerk.openSignIn();
                      }
                    }}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              ) : (
                // Nếu KHÔNG có submenu => Dùng <a> để chuyển trang
                <Link href={item.url} className="w-full">
                  <SidebarMenuButton
                    className={`${pathname === item.url ? "bg-gray-100" : ""}`}
                    tooltip={item.title}
                    onClick={(e) => {
                      if (!isSignedIn && item.auth) {
                        e.preventDefault();
                        return clerk.openSignIn();
                      }
                    }}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              )}

              {item.items && item.items.length > 0 && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link href={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
