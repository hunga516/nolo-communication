import Link from "next/link";
import { VideoGetOneOutput } from "../../types";
import StudioSidebarUser from "@/modules/studio/ui/components/studio-sidebar/studio-sidebar-user";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { SubscriptionButton } from "@/modules/subscriptions/ui/components/subscription-button";

interface VideoOwnerProps {
    user: VideoGetOneOutput['user']
    videoId: string
}

export const VideoOwner = ({ user, videoId }: VideoOwnerProps) => {
    const { userId } = useAuth();

    return (
        <div className="flex items-center justify-between sm:justify-start gap-3 min-w-0">
            <Link
                href={`/users/${user.id}`}
            >
                <div className="flex items-center gap-2 min-w-0">
                    <StudioSidebarUser userOut={user} place="left" size={9} />
                    {/* <span className="text-sm text-muted-foreground text-nowrap">
                        {0} người đăng ký
                    </span> */}
                </div>
            </Link>
            {userId === user.clerkId ? (
                <Link href={`/studio/videos/${videoId}`}>
                    <Button
                        variant="secondary"
                    >
                        Chỉnh sửa
                    </Button>
                </Link>
            ) : (
                <SubscriptionButton
                    onClick={() => { }}
                    disabled={false}
                    isSubscribed={false}
                    className="flex-none"
                    size="sm"
                />
            )}
        </div>
    )
}