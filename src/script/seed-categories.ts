import {categoriesTable} from "@/db/schema";
import {db} from "@/db";


const categoryNames = [
    "Tất cả",
    "Phổ biến",
    "Gần đây",
    "Giải trí",
    "Meme",
]

async function main(){
    try {
        const values = categoryNames.map((item)=> ({
            name: item,
            description: `Xem bài viết liên quan đến ${item}`
        }))

        await db.insert(categoriesTable).values(values)
    }
    catch (error) {
        console.log(error)
    }
}