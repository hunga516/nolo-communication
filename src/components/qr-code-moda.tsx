"use client"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Landmark } from "lucide-react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

interface QrCodeModalProps {
    name: string
    price: number
}

const QrCodeModal = ({ name, price }: QrCodeModalProps) => {
    const { user } = useUser()
    const userId = user?.publicMetadata.userId as string

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" >
                    <Landmark className="mr-2" />
                    Chuyển khoản
                </Button>
            </DialogTrigger>
            <DialogContent className="flex items-center justify-center">
                <div className="relative size-[500px]">
                    <Image
                        src={`https://img.vietqr.io/image/970416-28307897-print.png?amount=${Number(price + 0)}&addInfo=${name + userId}&accountName=LE%20NGOC%20LOC`}
                        alt="qrcode"
                        fill
                        className="object-contain"
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default QrCodeModal