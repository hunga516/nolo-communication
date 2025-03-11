"use client"

import {usePathname} from "next/navigation";
import {
  BookOpen,
  ChevronRight,
  DollarSign, Earth,
  House,
  MonitorPlay,
  Scroll,
  TrendingUp,
} from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link";


const navMain = [
      {
        title: "Trang chủ",
        url: "/",
        icon: House,
        isActive: false,
      },
  {
    title: "Vi Short",
    url: "/vi-short",
    icon: MonitorPlay,
  },
  {
    title: "Cộng đồng",
    url: "",
    icon: Earth,
    isActive: false,
    items: [
      {
        title: "Bạn bè",
        url: "/ban-be"
      },
      {
        title: "Nhóm của bạn",
        url: "/nhom-cua-ban"
      }
    ]
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
        items: [
          {
            title: "Đấu giá",
            url: "/dau-gia",
          },
          {
            title: "Mua bán",
            url: "/mua-ban",
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
    ]

export function NavMain() {

  const pathname = usePathname();
  console.log(pathname);

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
                        className={`${pathname === item.url ? 'bg-gray-100' : ''}`}
                        tooltip={item.title}
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
                        className={`${pathname === item.url ? 'bg-gray-100' : ''}`}
                        tooltip={item.title}
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
  )
}
