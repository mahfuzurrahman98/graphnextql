// graphql/server/resolvers/blog.ts

import {
    getBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
} from "@/services/blogService";
import User from "@/models/User";
import Category from "@/models/Category";
import { IBlog, ICategory, IUser } from "@/utils/interfaces";

const blogResolvers = {
    Blog: {
        author: async (blog: IBlog): Promise<IUser | null> => {
            try {
                return await User.findOne({ _id: blog.author });
            } catch (error: any) {
                console.error("Error fetching blog author:", error);
                throw new Error("Failed to fetch blog author");
            }
        },
        category: async (blog: IBlog): Promise<ICategory | null> => {
            try {
                return await Category.findOne({ _id: blog.category });
            } catch (error: any) {
                console.error("Error fetching blog category:", error);
                throw new Error("Failed to fetch blog category");
            }
        },
    },

    Query: {
        getBlogs: async (
            _parent: any,
            args: {
                q?: string;
                category?: string;
                page?: number;
                limit?: number;
            }
        ): Promise<IBlog[]> => {
            try {
                return await getBlogs(
                    args.q,
                    args.category == "all" ? undefined : args.category,
                    args.page,
                    args.limit
                );
            } catch (error: any) {
                console.error("Error fetching blogs:", error);
                throw new Error("Failed to fetch blogs");
            }
        },

        getBlog: async (_parent: any, { id }: { id: string }) => {
            try {
                return await getBlogById(id);
            } catch (error: any) {
                console.error("Error fetching blog:", error);
                throw new Error("Failed to fetch blog");
            }
        },
    },

    Mutation: {
        createBlog: async (
            _parent: any,
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
        ): Promise<IBlog> => {
            try {
                return await createBlog({
                    title,
                    content,
                    author,
                    tags,
                    category,
                });
            } catch (error: any) {
                console.error("Error creating blog:", error);
                throw new Error("Failed to create blog");
            }
        },

        updateBlog: async (
            _parent: any,
            {
                id,
                title,
                content,
                author,
                tags,
                category,
            }: {
                id: string;
                title: string;
                content: string;
                author: string;
                tags: string[];
                category: string;
            }
        ): Promise<IBlog | null> => {
            try {
                return await updateBlog(id, {
                    title,
                    content,
                    author,
                    tags,
                    category,
                });
            } catch (error: any) {
                console.error("Error updating blog:", error);
                throw new Error("Failed to update blog");
            }
        },

        deleteBlog: async (
            _parent: any,
            { id }: { id: string }
        ): Promise<boolean> => {
            try {
                return await deleteBlog(id);
            } catch (error: any) {
                console.error("Error deleting blog:", error);
                throw new Error("Failed to delete blog");
            }
        },
    },
};

export default blogResolvers;
