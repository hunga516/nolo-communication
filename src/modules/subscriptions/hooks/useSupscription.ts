import { trpc } from "@/trpc/client";
import { useClerk } from "@clerk/nextjs";
import { toast } from "sonner";

interface useSubscriptionProps {
    userId: string,
    isSubscribed: boolean,
    fromVideoId?: string
}

export const useSubscription = ({
    userId,
    isSubscribed,
    fromVideoId
}: useSubscriptionProps) => { 
    const utils = trpc.useUtils();
    const clerk = useClerk();
    const subscription = trpc.subscription.create.useMutation({
        onSuccess: () => {
            utils.videos.getOne.invalidate({ id: fromVideoId })
            toast.success("Theo dõi thành công")
        },
        onError: (error) => {
            if (error.data?.code === "BAD_REQUEST") {
                toast.error("Bạn không thể theo dõi chính bản thân mình")
            }
            if (error.data?.code === "UNAUTHORIZED") {
                toast.error("Bạn cần đăng nhập để theo dõi")
                clerk.openSignIn()
            }
        }
    });

    const unsubscribe = trpc.subscription.remove.useMutation({
        onSuccess: () => {
            utils.videos.getOne.invalidate({ id: fromVideoId })
            toast.success("Hủy theo dõi thành công")
        },
        onError: () => {
            toast.error("Hủy theo dõi thất bại")
        }
    });

    const isPending = subscription.isPending || unsubscribe.isPending

    const handleSubscription = () => {
        if (isSubscribed) {
            unsubscribe.mutate({ userId })
        } else {
            subscription.mutate({ userId })
        }
    }

    return {
        isPending,
        handleSubscription
    }
}