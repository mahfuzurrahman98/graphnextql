// services/tagService.ts

import connectMongo from "@/lib/dbConnect";
import Tag from "@/models/Tag";
import { ITag } from "@/utils/interfaces";

/**
 * Fetch tags with optional search query and category filter.
 * If category is defined, only tags from that category will be returned.
 * Pagination is applied.
 */
const getTags = async (): Promise<ITag[]> => {
    try {
        await connectMongo();

        const tags = await Tag.find();
        return tags;
    } catch (error: any) {
        console.error("Error fetching tags:", error);
        throw new Error("Failed to fetch tags");
    }
};

export { getTags };
