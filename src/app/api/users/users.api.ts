import axiosInstance from "../axios";


export interface User {
    _id: string,
    name: string,
    email: string,
    imageUrl: string,
    username: string,
    clerkId: string,
    subscriberCount: number,
    isSubscriberSubscribed: boolean,
}

interface UserResponse {
    message: string,
    user: User
}

export const readUserByClerkId = async (clerkId: string): Promise<UserResponse> => {
    try {
        const response = await axiosInstance.get(`/users/clerk/${clerkId}`)

        return {
            message: response.data.message,
            user: response.data.user
        }
    } catch (error) {
        console.log(error);
        throw new Error('loi khi tim nguoi dung')
    }
}