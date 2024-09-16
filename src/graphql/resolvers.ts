// graphql/resolvers.ts
import Blog from '@/models/Blog';
import User from '@/models/User';

export const resolvers = {
    Query: {
        getBlogs: async () => {
            return await Blog.find().populate('author');
        },
        getBlog: async (_parent: any, { slug }: { slug: string }) => {
            return await Blog.findOne({ slug }).populate('author');
        },
    },
    Mutation: {
        createBlog: async (
            _parent: any,
            { title, content, author, tags, categories }: any
        ) => {
            const newBlog = new Blog({
                title,
                content,
                author,
                tags,
                categories,
            });
            return await newBlog.save();
        },
    },
};
