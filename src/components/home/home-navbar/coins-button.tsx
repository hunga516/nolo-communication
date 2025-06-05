import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/user.context";
import { Coins, CreditCard, History } from "lucide-react";
import { useAuth, useUser as useClerkUser } from "@clerk/nextjs"
import { useEffect, useState } from "react";
import axiosInstance from "@/app/api/axios";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";

const CoinsButton = () => {
    const { user, setUser } = useUser();
    const { user: clerkUser } = useClerkUser();
    const { isSignedIn } = useAuth();
    const [isOpenDialog, setIsOpenDialog] = useState(false);

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
            <>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"secondary"} className="h-8 px-4">
                            <Coins className="mr-2 h-4 w-4" />
                            <span className="text-sm">{user?.coins || 0} Coins</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel className="text-sm">
                            Số dư {user?.coins || 0} Coins
                        </DropdownMenuLabel>
                        <DropdownMenuItem className="flex items-center justify-between gap-2" onClick={() => setIsOpenDialog(true)}>
                            Nạp thêm Coins
                            <CreditCard />
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center justify-between gap-2">
                            Lịch sử giao dịch
                            <History />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Dialog open={isOpenDialog} onOpenChange={() => setIsOpenDialog(false)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-lg font-semibold">
                                Nạp thêm Coins
                            </DialogTitle>
                            <DialogDescription className="text-sm text-muted-foreground">
                                Quét mã QR để nạp thêm Coins vào tài khoản của bạn.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="relative size-[500px]">
                            <Image
                                src={`https://img.vietqr.io/image/970416-28307897-print.png?&addInfo=${user?.userId}&accountName=LE%20NGOC%20LOC`}
                                alt="qrcode"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </DialogContent>
                </Dialog>
            </>
        ) : (
            <>
            </>
        )
    )
}

export default CoinsButton;