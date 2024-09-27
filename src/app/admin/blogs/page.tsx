// app/admin/blogs/page.tsx

import { GET_BLOGS } from "@/graphql/client/queries/blogs";
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

export default async function BlogList() {
    const client = createApolloClient();

    const { data } = await client.query({
        query: GET_BLOGS,
    });

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">All Blogs</h1>
                <Link href="/admin/blogs/create">
                    <Button>Create New Blog</Button>
                </Link>
            </div>

            <Table className="w-full">
                <TableCaption>
                    <p className="text-sm text-muted-foreground">
                        Showing {data.getBlogs.length} of {data.getBlogs.length}{" "}
                        results
                    </p>
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.getBlogs.map((blog: IBlog) => (
                        <TableRow key={blog.id}>
                            <TableCell className="font-medium">
                                {blog.title}
                            </TableCell>
                            <TableCell>{blog.author.name}</TableCell>
                            <TableCell>{blog.category.name}</TableCell>
                            <TableCell className="text-right">
                                <Link href={`/admin/blogs/${blog.id}/edit`}>
                                    <Button variant="outline">Edit</Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
