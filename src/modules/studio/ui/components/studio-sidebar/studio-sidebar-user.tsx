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

const StudioSidebarUser = () => {
  const { user } = useUser();
  const { open } = useSidebar();

  if (!user) {
    return (
      <div className="flex flex-col gap-y-1 items-center justify-center w-full">
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
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Link href="/user/current">
        <Avatar className="size-12">
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback>{user?.lastName}</AvatarFallback>
        </Avatar>
      </Link>
      <p className="mt-2 text-sm font-semibold">{user?.fullName}</p>
    </div>
  );
};

export default StudioSidebarUser;
