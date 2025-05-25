"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowUpRight, Copy, Radio } from "lucide-react"
import { useAuth } from '@clerk/clerk-react';
import { toast } from "sonner"
import { createVideoLiveStream } from "@/app/api/videos/videos.api"
import { useEffect, useState } from "react"
import Link from "next/link"
import { io } from "socket.io-client"
// import { useRouter } from "next/navigation"
const CreateLiveStream = () => {
    const { userId: clerkId } = useAuth()
    const [name, setName] = useState('')
    const [muxStreamKey, setMuxStreamKey] = useState<string | null>(null)
    const [videoId, setVideoId] = useState<string | null>(null)
    // const router = useRouter()

    useEffect(() => {
        const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`)

        socket.on('create-livestream', (muxStreamKey) => {
            setMuxStreamKey(muxStreamKey)
            console.log('day la key', muxStreamKey);
        });

        return () => {
            socket.disconnect();
        };
    }, [])

    const handleCoppy = async () => {
        if (!muxStreamKey) return;

        try {
            await navigator.clipboard.writeText(muxStreamKey);
            toast.success("Đã sao chép stream key vào clipboard", { description: "Bạn có thể dán ở bất kì đâu" });
        } catch {
            toast.error("Sao chép thất bại");
        }
    }

    const handleCreateLiveStream = async () => {
        if (!clerkId) {
            toast.error('Không xác định được người dùng, vui lòng thử lại sau.')
            return
        }

        try {
            const { video } = await createVideoLiveStream(name, clerkId)

            if (video) {
                setVideoId(video._id)
                toast.success(`Đã tạo thành công phiên live ${video.name}`)
                // router.push(`/live-stream/${video._id}?streamkey=${video.muxStreamKey}`)
            }

        } catch {
            toast.error('Có lỗi xảy ra trong quá trình tạo phiên live', { description: "Vui lòng thử tạo lại phiên live khác" })
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-red-500">
                    <Radio /> Phát trực tuyến
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tạo lịch phát trực tuyến</DialogTitle>
                    <DialogDescription>Hoàn tất thông tin và phiên live của bạn sẽ sớm bắt đầu</DialogDescription>
                </DialogHeader>
                <div className="my-2 grid gap-4">
                    <div className="grid grid-cols-4 gap-4">
                        <Label htmlFor="name">Tên phiên live</Label>
                        <Input name="name" placeholder="Nhập tên phiên live ..." className="col-span-3" onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>
                {muxStreamKey && (
                    <div>
                        <p className="text-sm">Đây là stream key của bạn, coppy và dán vào OBS để live</p>
                        <div className="relative">
                            <p className="text-sm px-2 py-2 mt-2 bg-green-200 text-green-500 border border-solid border-green-400 rounded-lg">{muxStreamKey}</p>
                            <Copy onClick={handleCoppy} size={20} className="absolute top-2 right-2 cursor-pointer" />
                        </div>
                    </div>
                )}
                <DialogFooter>
                    {muxStreamKey ? (
                        <>

                            <Link href={`/live-stream/${videoId}`}>
                                <Button>
                                    <ArrowUpRight /> Đi đến phiên live
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <Button onClick={handleCreateLiveStream} className="bg-red-500">
                            <Radio /> Phát trực tuyến
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}

export default CreateLiveStream