import axiosInstance from "../axios"
import { Item } from "../items/items.api"
import { User } from "../users/users.api"

export interface Market {
    _id: string
    itemId: Item
    userId: User
    quantity: number
    price: number
    createdAt: string
    updatedAt: string
}

interface MarketResponse {
    message: string
    markets: Market[]
}

export const readAllMarkets = async (): Promise<MarketResponse> => {
    try {
        const response = await axiosInstance.get('/markets')
        return {
            message: response.data.message,
            markets: response.data.markets
        }
    } catch (error) {
        console.log(error)
        throw new Error('Error reading markets')
    }
}

