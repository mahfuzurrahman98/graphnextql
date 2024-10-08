// services/blogService.ts

import connectMongo from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import Category from "@/models/Category";
import { IBlog } from "@/utils/interfaces";
import { Types } from "mongoose";

/**
 * Fetch blogs with optional search query and category filter.
 * If category is defined, only blogs from that category will be returned.
 * Pagination is applied.
 */
const getBlogs = async (
    q: string = "",
    category: string = "",
    page: number = 1,
    limit: number = 10
): Promise<IBlog[]> => {
    try {
        console.log("fetching blogs");
        await connectMongo();
        const filter: any = {};

        // If a search query (q) is provided, search for it in title, content, or tags
        if (q) {
            filter.$or = [
                { title: { $regex: q, $options: "i" } }, // Case-insensitive title search
                { content: { $regex: q, $options: "i" } }, // Case-insensitive content search
                { tags: { $in: [q] } }, // Check if q is in tags
            ];
        }

        // If a category is provided, filter blogs by that category
        if (category) {
            const categoryDoc = await Category.findOne({ name: category });
            if (categoryDoc) {
                filter.category = categoryDoc.id; // Filter by category ObjectId
            } else {
                return []; // No blogs found if the category does not exist
            }
        }

        // Pagination logic
        const skip = (page - 1) * limit;

        // Fetch the blogs with pagination and optional filters
        const blogs = await Blog.find(filter).skip(skip).limit(limit);
        return blogs;
    } catch (error: any) {
        console.error(`{Error fetching blogs: ${error}}`);
        throw new Error("Failed to fetch blogs");
    }
};

/**
 * Fetch total number of blogs.
 * If category is defined, only blogs from that category will be counted.
 */
const getTotalNoOfBlogs = async (
    q: string = "",
    category: string = ""
): Promise<number> => {
    try {
        await connectMongo();
        const filter: any = {};

        // If a search query (q) is provided, search for it in title, content, or tags
        if (q) {
            filter.$or = [
                { title: { $regex: q, $options: "i" } }, // Case-insensitive title search
                { content: { $regex: q, $options: "i" } }, // Case-insensitive content search
                { tags: { $in: [q] } }, // Check if q is in tags
            ];
        }

        // If a category is provided, filter blogs by that category
        if (category) {
            const categoryDoc = await Category.findOne({ name: category });
            if (categoryDoc) {
                filter.category = categoryDoc.id; // Filter by category ObjectId
            } else {
                return 0; // No blogs found if the category does not exist
            }
        }

        // Count the number of blogs with optional filters
        const count = await Blog.countDocuments(filter);
        return count;
    } catch (error: any) {
        console.error(`{Error fetching number of blogs: ${error}}`);
        throw new Error("Failed to fetch number of blogs");
    }
};

/**
 * Fetch a single blog by its ID.
 */
const getBlogById = async (id: string): Promise<IBlog | null> => {
    try {
        await connectMongo();

        const objectId = new Types.ObjectId(id);
        const blog: IBlog | null = await Blog.findOne({ _id: objectId });
        return blog;
    } catch (error: any) {
        console.error(`{Error fetching blog by ID: ${error}}`);
        throw new Error("Failed to fetch blog");
    }
};

/**
 * Create a new blog.
 */
const createBlog = async ({
    title,
    content,
    author,
    tags,
    category,
}: {
    title: string;
    content: string;
    author: string;
    tags: string[];
    category: string;
}): Promise<IBlog> => {
    try {
        await connectMongo();
        const newBlog: IBlog = await Blog.create({
            title,
            content,
            author,
            tags,
            category,
        });
        return newBlog;
    } catch (error: any) {
        console.error(`{Error creating blog: ${error}}`);
        throw new Error("Failed to create blog");
    }
};

/**
 * Update an existing blog by its ID.
 */
const updateBlog = async (
    id: string,
    {
        title,
        content,
        author,
        tags,
        category,
    }: {
        title: string;
        content: string;
        author: string;
        tags: string[];
        category: string;
    }
): Promise<IBlog | null> => {
    try {
        await connectMongo();
        const objectId = new Types.ObjectId(id);

        const updatedBlog = await Blog.findOneAndUpdate(
            { _id: objectId }, // Use _id instead of id
            { $set: { title, content, author, tags, category } }, // Use $set to update fields
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        if (!updatedBlog) {
            throw new Error("Blog not found or not updated");
        }
        return updatedBlog;
    } catch (error: any) {
        console.error(`Error updating blog: ${error}`);
        throw new Error("Failed to update blog");
    }
};

/**
 * Delete a blog by its ID.
 */
const deleteBlog = async (id: string): Promise<boolean> => {
    try {
        await connectMongo();
        const objectId = new Types.ObjectId(id);
        const deletedBlog = await Blog.deleteOne({ _id: objectId });
        return deletedBlog.deletedCount > 0;
    } catch (error: any) {
        console.error(`{Error deleting blog: ${error}}`);
        throw new Error("Failed to delete blog");
    }
};

export {
    getBlogs,
    getTotalNoOfBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
};
