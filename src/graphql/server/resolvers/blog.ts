// graphql/server/resolvers/blog.ts

import {
    getBlogs,
    getTotalNoOfBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
} from "@/services/blogService";
import User from "@/models/User";
import Category from "@/models/Category";
import { IBlog, ICategory, IUser } from "@/utils/interfaces";
import { auth } from "@/auth";

const blogResolvers = {
    Blog: {
        author: async (blog: IBlog): Promise<IUser | null> => {
            try {
                return await User.findOne({ _id: blog.author });
            } catch (error: any) {
                console.error(`{Error fetching blog author: ${error}}`);
                throw new Error("Failed to fetch blog author");
            }
        },
        category: async (blog: IBlog): Promise<ICategory | null> => {
            try {
                return await Category.findOne({ _id: blog.category });
            } catch (error: any) {
                console.error(`{Error fetching blog category: ${error}}`);
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
                console.error(`{Error fetching blogs: ${error}}`);
                throw new Error("Failed to fetch blogs");
            }
        },

        getTotalNoOfBlogs: async (
            _parent: any,
            args: {
                q?: string;
                category?: string;
            }
        ): Promise<number> => {
            try {
                return await getTotalNoOfBlogs(
                    args.q,
                    args.category == "all" ? undefined : args.category
                );
            } catch (error: any) {
                console.error(`{Error fetching total no. of blogs: ${error}}`);
                throw new Error("Failed to fetch total no. of blogs");
            }
        },

        getBlog: async (
            _parent: any,
            { id }: { id: string }
        ): Promise<IBlog | null> => {
            try {
                return await getBlogById(id);
            } catch (error: any) {
                console.error(`{Error fetching blog: ${error}}`);
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
                tags,
                category,
            }: {
                title: string;
                content: string;
                tags: string[];
                category: string;
            }
        ): Promise<IBlog> => {
            try {
                const session = await auth();
                if (!session?.user) {
                    throw new Error("User not authenticated 1");
                }

                const currentUser = session.user;
                if (!currentUser.id) {
                    throw new Error("User not authenticated 2");
                }

                return await createBlog({
                    title,
                    content,
                    author: currentUser.id,
                    tags,
                    category,
                });
            } catch (error: any) {
                console.error(`{Error creating blog: ${error}}`);
                throw new Error("Failed to create blog");
            }
        },

        updateBlog: async (
            _parent: any,
            {
                id,
                title,
                content,
                tags,
                category,
            }: {
                id: string;
                title: string;
                content: string;
                tags: string[];
                category: string;
            }
        ): Promise<IBlog | null> => {
            try {
                const session = await auth();
                if (!session?.user) {
                    throw new Error("User not authenticated 1");
                }

                const currentUser = session.user;
                if (!currentUser.id) {
                    throw new Error("User not authenticated 2");
                }

                return await updateBlog(id, {
                    title,
                    content,
                    author: currentUser.id,
                    tags,
                    category,
                });
            } catch (error: any) {
                console.error(`{Error updating blog: ${error}}`);
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
                console.error(`{Error deleting blog: ${error}}`);
                throw new Error("Failed to delete blog");
            }
        },
    },
};

export default blogResolvers;
