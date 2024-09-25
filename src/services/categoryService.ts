// services/categoryService.ts

import connectMongo from "@/lib/dbConnect";
import Category from "@/models/Category";
import { ICategory } from "@/utils/interfaces";

/**
 * Fetch categories with optional search query and category filter.
 * If category is defined, only categories from that category will be returned.
 * Pagination is applied.
 */
const getCategories = async (): Promise<ICategory[]> => {
    try {
        await connectMongo();

        const categories = await Category.find();
        return categories;
    } catch (error: any) {
        console.error("Error fetching categories:", error);
        throw new Error("Failed to fetch categories");
    }
};

export { getCategories };
