import axiosInstance from "../axios";



export interface Video {
    _id: string
    name: string;
    clerkId: string,
    muxPlayBackId: string,
    type: string,
    muxPreviewUrl: string,
    muxThumbnailUrl: string,
    createdAt: string,
    updatedAt: string
}

interface VideoResponse {
    message: string,
    video: Video
}

interface VideosResponse {
    message: string,
    videos: Video[]
}

export const readAllVideos = async (): Promise<VideosResponse> => {
    try {
        const response = await axiosInstance.get('/videos')

        return {
            message: response.data.message,
            videos: response.data.videos
        }
    } catch (error) {
        console.log(error);
        throw new Error('Error when reading video')
    }
}

export const readVideoById = async (_id: string): Promise<VideoResponse> => {
    try {
        const response = await axiosInstance.get(`/videos/${_id}`)

        return {
            message: response.data.message,
            video: response.data.video
        }
    } catch (error) {
        console.log(error);
        throw new Error('Error when reading details video')
    }
}