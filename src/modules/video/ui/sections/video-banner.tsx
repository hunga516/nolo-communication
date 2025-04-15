import { VideoGetOneOutput } from "../../types";


interface VideoBannerProps {
    status: VideoGetOneOutput["muxStatus"];
}

export const VideoBanner = ({ status }: VideoBannerProps) => {
    if (status === "ready") return null;

    return (
        <div className="bg-amber-200 py-3 px-4 rounded-b-2xl flex items-center gap-2">
            <p className="text-xs md:text-sm font-medium text-black line-clamp-1">
                Video chưa sẵn sàng để phục vụ.
            </p>
        </div>
    )
}