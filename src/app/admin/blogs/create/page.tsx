// app/admin/blogs/create/page.tsx

import { createApolloClient } from "@/lib/apolloClient";
import { GET_TAGS } from "@/graphql/client/queries/tags";
import { ICategory, ITag } from "@/utils/interfaces";
import { GET_CATEGORIES } from "@/graphql/client/queries/categories";
import BlogCreateForm from "@/components/blogs/BlogCreateForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const CreateBlogPage = async () => {
    const client = createApolloClient();
    let tags: ITag[] = [];
    let categories: ICategory[] = [];

    const categoriesResult = await client.query({
        query: GET_CATEGORIES,
    });
    categories = categoriesResult.data.getCategories;

    const tagsResult = await client.query({
        query: GET_TAGS,
    });
    tags = tagsResult.data.getTags;

    return (
        <div className="max-w-4xl">
            <div className="flex flex-col-reverse md:flex-row justify-between md:items-center gap-y-5 mb-6">
                <h1 className="text-2xl font-bold">Create New Blog Post</h1>
                <Button size="sm" asChild>
                    <Link
                        href="/admin/blogs"
                        className="flex items-center text-sm"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to blogs
                    </Link>
                </Button>
            </div>
            <BlogCreateForm categories={categories} tags={tags} />
        </div>
    );
};

export default CreateBlogPage;
