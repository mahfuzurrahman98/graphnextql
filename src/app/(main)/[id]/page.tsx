// app/[id]/page.tsx
import { GET_BLOG_BY_ID } from '@/graphql/client/queries/blogs';
import { createApolloClient } from '@/lib/apolloClient';
// import { format } from 'date-fns';

export default async function BlogPage({
    params,
}: {
    params: { id: string };
}) {
    const client = createApolloClient();

    const { data } = await client.query({
        query: GET_BLOG_BY_ID,
        variables: { id: params.id },
    });

    const blog = data.getBlog;

    if (!blog) {
        return <p>Blog not found.</p>;
    }

    return (
        <div className="container mx-auto p4">
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
            <p className="text-gray-500 mb-2">
                By {blog.author.name} |{' '}
                {/* {format(new Date(blog.createdAt), 'PPP')} */}
                {(new Date(blog.createdAt), 'PPP')}
            </p>
            <div className="bg-gray-200 p-4 rounded-md mb-4">
                <strong>Category: </strong>
                {blog.category.name}
            </div>
            <div className="prose lg:prose-xl mb-8">
                <p>{blog.content}</p>
            </div>
            <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag: string, index: number) => (
                    <span
                        key={index}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                    >
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    );
}
