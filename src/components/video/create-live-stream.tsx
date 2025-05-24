"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Radio } from "lucide-react"
import { useAuth } from '@clerk/clerk-react';
import { toast } from "sonner"
import { createVideoLiveStream } from "@/app/api/videos/videos.api"
import { useState } from "react"
import { useRouter } from "next/navigation"

const CreateLiveStream = () => {
    const { userId: clerkId } = useAuth()
    const [name, setName] = useState('')
    const router = useRouter()

    const handleCreateLiveStream = async () => {
        if (!clerkId) {
            toast.error('Không xác định được người dùng, vui lòng thử lại sau.')
            return
        }

        try {
            const { video } = await createVideoLiveStream(name, clerkId)

            if (video) {
                router.push(`/live-stream/${video._id}?streamkey=${video.muxStreamKey}`)
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
                <DialogFooter>
                    <Button onClick={handleCreateLiveStream} className="bg-red-500">
                        <Radio /> Phát trực tuyến
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateLiveStream