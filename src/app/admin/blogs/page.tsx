// Import necessary types and components
import { SearchParamsType } from "@/utils/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { IBlog } from "@/utils/interfaces";
import { FilePenLine, Pencil } from "lucide-react";
import BlogPagination from "@/components/blogs/BlogPagination";

// Import GraphQL client and queries
import { createApolloClient } from "@/lib/apolloClient";
import {
    GET_BLOGS,
    GET_TOTAL_NO_OF_BLOGS,
} from "@/graphql/client/queries/blogs";
import DeleteBlogButton from "@/components/blogs/DeleteBlogButton";
import { revalidatePath } from "next/cache";

/**
 * Fetches blogs based on search parameters.
 *
 * @param {SearchParamsType} searchParams - Search parameters (q, category, page, limit)
 * @returns {Promise<{ blogs: IBlog[], totalBlogs: number }>} - Blogs and total number of blogs
 */
async function fetchBlogs(searchParams: SearchParamsType) {
    const { q = "", category = "all", page = 1, limit = 3 } = searchParams;

    // Create an instance of the Apollo Client
    const client = createApolloClient();

    try {
        // Fetch blogs and total number of blogs in parallel
        const [blogsResult, totalBlogsResult] = await Promise.all([
            client.query({
                query: GET_BLOGS,
                variables: {
                    q,
                    category,
                    page: Number(page),
                    limit: Number(limit),
                },
            }),
            client.query({
                query: GET_TOTAL_NO_OF_BLOGS,
                variables: { q, category },
            }),
        ]);

        // Return the fetched blogs and total number of blogs
        return {
            blogs: blogsResult.data.getBlogs,
            totalBlogs: totalBlogsResult.data.getTotalNoOfBlogs,
        };
    } catch (error) {
        // Log and rethrow any errors that occur during fetching
        console.error("Error fetching blogs:", error);
        throw new Error("Failed to fetch blogs");
    }
}

const handleDeleteSuccess = async () => {
    "use server";
    revalidatePath("/admin/blogs");
};

/**
 * Blog list component.
 *
 * @param {SearchParamsType} searchParams - Search parameters (q, category, page, limit)
 * @returns {JSX.Element} - Blog list component
 */
export default async function BlogList({
    searchParams,
}: {
    searchParams?: SearchParamsType;
}) {
    // Fetch blogs based on search parameters
    const { blogs, totalBlogs } = await fetchBlogs(searchParams || {});

    // Render the blog list component
    return (
        <div className="max-w-4xl">
            <div className="flex flex-col-reverse md:flex-row justify-between md:items-center gap-y-5 mb-6">
                <h1 className="text-2xl font-bold">Blogs</h1>
                <Button size="sm" asChild>
                    <Link
                        href="/admin/blogs/create"
                        className="flex items-center text-sm"
                    >
                        <FilePenLine className="w-4 h-4 mr-2" />
                        Create new blog
                    </Link>
                </Button>
            </div>

            <Table className="w-full">
                <TableCaption>
                    <p className="text-sm text-muted-foreground">
                        Showing {blogs.length} of {totalBlogs} results
                    </p>
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {blogs.map((blog: IBlog) => (
                        <TableRow key={blog.id}>
                            <TableCell className="font-medium">
                                {blog.title}
                            </TableCell>
                            <TableCell>{blog.category.name}</TableCell>
                            <TableCell>{blog.author.name}</TableCell>
                            <TableCell className="flex justify-end gap-x-2">
                                <Button variant="outline" size="sm" asChild>
                                    <Link
                                        href={`/admin/blogs/${blog.id}/edit`}
                                        className="flex items-center text-sm"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Link>
                                </Button>
                                <DeleteBlogButton
                                    blogId={blog.id}
                                    blogTitle={blog.title}
                                    onDeleteSuccess={handleDeleteSuccess}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="mt-10">
                <BlogPagination totalItems={totalBlogs} />
            </div>
        </div>
    );
}
