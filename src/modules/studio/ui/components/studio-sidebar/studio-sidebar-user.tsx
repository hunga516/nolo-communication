import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { VideoGetOneOutput } from "@/modules/video/types";

interface StudioSidebarUserProps {
  userOut?: VideoGetOneOutput['user']
  size: number
  place: "bottom" | "left"
}

const StudioSidebarUser = ({ userOut, place, size }: StudioSidebarUserProps) => {
  const { user } = useUser();
  const { open } = useSidebar();

  if (!user) {
    return (
      <div className={cn(
        "flex flex-col gap-y-1 items-center justify-center w-full",
        place === "bottom" ? "flex-col " : "flex-row gap-2",
      )}>
        <Skeleton className="size-12 rounded-full mx-auto" />
        <Skeleton className="h-4 w-12 mt-2 rounded-sm" />
      </div>
    );
  }

  if (!open) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip={user?.fullName}>
            <Link href="/user/current">
              <Avatar className="size-4 rounded-full">
                <AvatarImage src={userOut?.imageUrl ?? user?.imageUrl} />
              </Avatar>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <div className={cn(
      "flex items-center justify-center w-full",
      place === "bottom" ? "flex-col " : "flex-row gap-2",
    )}>
      <Link href="/user/current">
        <Avatar className={`size-${size}`}>
          <AvatarImage src={userOut?.imageUrl ?? user?.imageUrl} />
          <AvatarFallback>{user?.lastName}</AvatarFallback>
        </Avatar>
      </Link>
      <p className="text-sm font-semibold">{userOut?.name ?? user?.fullName}</p>
    </div>
  );

};

export default StudioSidebarUser;
