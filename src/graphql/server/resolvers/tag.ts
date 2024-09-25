// graphql/server/resolvers/category.ts

import connectMongo from "@/lib/dbConnect";
import { getTags } from "@/services/tagService";
import { ITag } from "@/utils/interfaces";

const tagResolvers = {
    Query: {
        getTags: async (): Promise<ITag[]> => {
            try {
                await connectMongo();
                const tags: ITag[] = await getTags();
                return tags;
            } catch (error: any) {
                console.error("Error in resolver getTags:", error);
                return [];
            }
        },
    },
};

export default tagResolvers;
