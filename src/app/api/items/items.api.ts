import axiosInstance from '../axios';

export interface Item {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    createdAt: string;
    updatedAt: string;
}

interface ItemResponse {
    message: string;
    item: Item;
}

interface ItemsResponse {
    message: string;
    items: Item[];
}


export const readAllItems = async () : Promise<ItemsResponse> => {
    try {
        const response = await axiosInstance.get('/items')
        return {
            message: response.data.message,
            items: response.data.items
        }
    } catch (error) {
        console.log(error);
        throw new Error('Error reading items');
    }
}

export const readItemById = async (itemId: string) : Promise<ItemResponse> => {
    try {
        const response = await axiosInstance.get(`/items/${itemId}`)
        if (response.status !== 200) {
            throw new Error('Error reading item');
        }
        return {
            message: response.data.message,
            item: response.data.item
        }
    } catch (error) {
        console.log(error);
        throw new Error('Error reading items');
    }
}