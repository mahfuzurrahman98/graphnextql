import {
    GET_BLOGS,
    GET_TOTAL_NO_OF_BLOGS,
} from "@/graphql/client/queries/blogs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createApolloClient } from "@/lib/apolloClient";
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
import { SearchParamsType } from "@/utils/types";
// import DeleteBlogButton from "@/components/blogs/DeleteBlogButton";

const BlogList = async ({
    searchParams,
}: {
    searchParams?: SearchParamsType;
}) => {
    const {
        q = "",
        category = "all",
        page = 1,
        limit = 3,
    } = searchParams || {};

    let blogs: IBlog[] = [];

    const client = createApolloClient();

    const blogsResult = await client.query({
        query: GET_BLOGS,
        variables: {
            q,
            category,
            page: page ? Number(page) : 1,
            limit: limit ? Number(limit) : 3,
        },
    });
    blogs = blogsResult.data.getBlogs;

    const getTotalNoOfBlogsResult = await client.query({
        query: GET_TOTAL_NO_OF_BLOGS,
        variables: {
            q,
            category,
        },
    });
    const totalBlogs = getTotalNoOfBlogsResult.data.getTotalNoOfBlogs;

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
                            <TableCell className="text-right space-x-2">
                                <Button variant="outline" size="sm" asChild>
                                    <Link
                                        href={`/admin/blogs/${blog.id}/edit`}
                                        className="flex items-center text-sm"
                                    >
                                        <Pencil className="w-4 h-4 mr-2" />
                                        Edit
                                    </Link>
                                </Button>
                                {/* <DeleteBlogButton
                                    blogId={blog.id}
                                    blogTitle={blog.title}
                                /> */}
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
};

export default BlogList;
