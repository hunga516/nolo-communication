import axiosInstance from '../axios';

export interface Inventory {
    _id: string;
    userId: string,
    clerkId: string,
    itemId: string,
    quantity: number,
    createdAt: string;
    updatedAt: string;
}

// interface ItemResponse {
//     message: string;
//     inventory: Inventory;
// }

interface InventoriesResponse {
    message: string;
    inventories: Inventory[];
}


export const readAllInventoriesByClerkId = async (clerkId: string): Promise<InventoriesResponse> => {
    try {
        const response = await axiosInstance.get(`/inventories/${clerkId}`)
        return {
            message: response.data.message,
            inventories: response.data.inventories
        }
    } catch (error) {
        console.log(error);
        throw new Error('Error reading inventories');
    }
}