import Image from "next/image";
import Link from "next/link";
import { VideoGetOneOutput } from "@/modules/video/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { VideoThumbnail } from "@/modules/video/ui/components/video-thumbnail";

interface VideoGridCardProps {
    video: VideoGetOneOutput;
}

export const VideoGridCard = ({ video }: VideoGridCardProps) => {
    const timeAgo = formatDistanceToNow(new Date(video.createdAt), {
        addSuffix: true,
        locale: vi,
    });

    return (
        <Link href={`/videos/${video.id}`} className="block w-full space-y-2">
            <div className="relative aspect-video w-full rounded-md overflow-hidden bg-muted">
                {video.muxPlaybackId ? (
                    <VideoThumbnail
                        imageUrl={video.thumbnailUrl}
                        title={video.title}
                        previewUrl={video.previewUrl}
                        duration={video.duration}
                    />
                ) : (
                    <Image
                        src={video.thumbnailUrl || ""}
                        alt={video.title}
                        fill
                        className="object-cover"
                        sizes="100vw"
                    />
                )}
            </div>
            <div className="flex gap-3 items-start">
                <Avatar className="w-9 h-9">
                    <AvatarImage src={video.user.imageUrl} />
                    <AvatarFallback>{video.user.name?.[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-0.5">
                    <h3 className="font-medium line-clamp-2 leading-tight text-sm">
                        {video.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                        {video.user.name} • {timeAgo}
                    </p>
                </div>
            </div>
        </Link>
    );
};
