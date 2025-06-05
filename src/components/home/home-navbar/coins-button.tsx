import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/user.context";
import { Coins } from "lucide-react";
import { useAuth, useUser as useClerkUser } from "@clerk/nextjs"
import { useEffect } from "react";
import axiosInstance from "@/app/api/axios";

const CoinsButton = () => {
    const { user, setUser } = useUser();
    const { user: clerkUser } = useClerkUser();
    const { isSignedIn } = useAuth();

    console.log(user, "user in coins button");


    useEffect(() => {
        const fetchUser = async () => {
            if (clerkUser?.id) {
                try {
                    const response = await axiosInstance.get(`/users/clerk/${clerkUser.id}`);
                    if (response.data && response.data.user) {
                        setUser(response.data.user);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        }
        fetchUser();

    }, [clerkUser?.id, setUser])

    return (
        isSignedIn ? (
            <Button variant={"secondary"} className="h-8 px-4">
                <Coins className="mr-2 h-4 w-4" />
                <span className="text-sm">{user?.coins || 0} Coins</span>
            </Button>
        ) : (
            <>
            </>
        )
    )
}

export default CoinsButton;