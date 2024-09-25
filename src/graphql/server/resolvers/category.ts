// graphql/server/resolvers/category.ts

import connectMongo from "@/lib/dbConnect";
import Category from "@/models/Category";
import { getCategories } from "@/services/categoryService";
import { ICategory } from "@/utils/interfaces";

const categoryResolvers = {
    Query: {
        getCategories: async (): Promise<ICategory[]> => {
            try {
                await connectMongo();
                const categories: ICategory[] = await getCategories();
                return categories;
            } catch (error: any) {
                console.error("Error in resolver getCategories:", error);
                return [];
            }
        },
        getCategory: async (
            _parent: any,
            { id }: { id: string }
        ): Promise<ICategory | null> => {
            try {
                await connectMongo();
                return await Category.findById(id);
            } catch (error: any) {
                console.error("Error in resolver getCategory:", error);
                return null;
            }
        },
    },
};

export default categoryResolvers;
