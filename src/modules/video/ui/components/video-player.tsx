"use client"

import MuxPlayer from '@mux/mux-player-react';
import { THUMBNAIL_FALLBACK } from '../../constants';

interface VideoPlayerProps {
    playbackId?: string | null | undefined;
    thumbnailUrl?: string | null | undefined;
    autoPLay?: boolean;
    onPlay?: () => void;
}

export const VideoPlayerSkeleton = () => {
    return (
        <div className="aspect-video bg-black rounded-xl">

        </div>
    )
}

const VideoPlayer = ({
    playbackId,
    thumbnailUrl,
    autoPLay = false,
    onPlay,
}: VideoPlayerProps) => {

    if (!playbackId) {
        return null;
    }

    return (
        <MuxPlayer
            playbackId={playbackId}
            poster={thumbnailUrl || THUMBNAIL_FALLBACK}
            playerInitTime={0}
            autoPlay={autoPLay}
            thumbnailTime={0}
            className='size-full object-contain'
            accentColor="#121212"
            primaryColor="#b0b0b0"
            secondaryColor="#121212"
            onPlay={onPlay}
        />
    );
}

export default VideoPlayer;