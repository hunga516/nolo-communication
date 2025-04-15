import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ListPlusIcon, MoreVerticalIcon, ShareIcon, TrashIcon } from "lucide-react"
import { toast } from "sonner"

interface VideoMenuProps {
    videoId: string
    variant?: "ghost" | "secondary"
    onRemove?: () => void
}

export const VideoMenu = ({
    videoId,
    variant,
    onRemove,
}: VideoMenuProps) => {
    const onShare = () => {
        const fullUrl = `${process.env.VPS_URL || "http://localhost:3000"}/videos/${videoId}`
        navigator.clipboard.writeText(fullUrl)
        toast.success("Đã sao chép liên kết video")
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={variant} size="icon" className="rounded-full">
                    <MoreVerticalIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                <DropdownMenuItem onClick={onShare}>
                    <ShareIcon className="mr-2 size-4" />
                    Chia sẻ
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { }}>
                    <ListPlusIcon className="mr-2 size-4" />
                    Thêm vào playlist
                </DropdownMenuItem>
                {onRemove && (
                    <DropdownMenuItem onClick={() => { }}>
                        <TrashIcon className="mr-2 size-4" />
                        Xoá
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}