import { CommentSection } from "../sections/comments-section";
import { SuggestionSection } from "../sections/suggestions-section";
import { VideoSection } from "../sections/video-section";

interface VideoPageProps {
    videoId: string;
}

const VideoView = ({ videoId }: VideoPageProps) => {
    return (
        <div className="flex flex-col mx-auto pt-2.5 px-4 mb-10">
            <div className="flex flex-col xl:flex-row gap-6">
                <div className="flex-1 min-w-0">
                    <VideoSection videoId={videoId} />
                    <div className="xl:hidden block mt-4">
                        <SuggestionSection />
                    </div>
                    <CommentSection videoId={videoId} />
                </div>
                <div className="hidden xl:block w-full xl:w-[230px] 2xl:w-[300px] shrink-1">
                    <SuggestionSection />
                </div>
            </div>
        </div>
    )
}

export default VideoView;