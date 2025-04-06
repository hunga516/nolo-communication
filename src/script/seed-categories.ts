import { categoriesTable } from "@/db/schema";
import { db } from "@/db";

const categoryNames = [
  // "Tất cả",
  // "Phổ biến",
  // "Gần đây",
  // "Giải trí",
  // "Meme",
  "Meme2",
  "Meme3",
  "Meme4",
  "Meme5",
  "Meme6",
  "Meme7",
  "Meme8",
  "Meme9",
];

async function main() {
  try {
    const values = categoryNames.map((item) => ({
      name: item,
      description: `Xem bài viết liên quan đến ${item.toLowerCase()}`,
    }));

    await db.insert(categoriesTable).values(values);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();
