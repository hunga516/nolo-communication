"use client"

import Link from "next/link";
import StudioSidebarUser from "@/modules/studio/ui/components/studio-sidebar/studio-sidebar-user";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { SubscriptionButton } from "@/modules/subscriptions/ui/components/subscription-button";
import { useSubscription } from "@/modules/subscriptions/hooks/useSupscription";
import { User } from "@/app/api/users/users.api";


interface VideoOwnerProps {
    user: User
    videoId?: string,
    subscriberCount?: number
}

export const VideoOwner = ({ user, videoId, subscriberCount }: VideoOwnerProps) => {
    const { userId, isLoaded } = useAuth();
    const { isPending, handleSubscription } = useSubscription({
        userId: user._id,
        isSubscribed: user.isSubscriberSubscribed ?? false,
        fromVideoId: videoId
    })

    return (
        <div className="flex items-center justify-between sm:justify-start gap-3 min-w-0">
            <Link
                href={`/users/${user._id}`}
            >
                <div className="flex items-center gap-2 min-w-0">
                    <StudioSidebarUser userOut={user} place="left" size={9} />
                    <span className="text-sm text-muted-foreground text-nowrap">
                        {subscriberCount} người đăng ký
                    </span>
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
                    onClick={handleSubscription}
                    disabled={isPending || !isLoaded}
                    isSubscribed={user.isSubscriberSubscribed}
                    className="flex-none"
                    size="sm"
                />
            )}
        </div>
    )
}