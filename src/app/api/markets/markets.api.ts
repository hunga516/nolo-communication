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
    market: Market
}

interface MarketsResponse {
    message: string
    markets: Market[]
}

export const readAllMarkets = async (): Promise<MarketsResponse> => {
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

export const createMarket = async (userId: string, itemId: string, price: number, quantity: number): Promise<MarketResponse> => {
    try {
        const response = await axiosInstance.post('/markets', {
            userId,
            itemId,
            price,
            quantity
        })
        return {
            message: response.data.message,
            market: response.data.markets
        }
    } catch (error) {
        console.log(error)
        throw new Error('Error reading market')
    }
}

export const purchaseMarket = async (buyerId: string, itemId: string, marketId: string): Promise<MarketResponse> => {
    try {
        const response = await axiosInstance.post(`/markets/purchase/${marketId}`, {
            buyerId,
            itemId
        })
        return {
            message: response.data.message,
            market: response.data.market
        }
    } catch (error) {
        console.log(error)
        throw new Error('Error purchasing market')
    }
}

