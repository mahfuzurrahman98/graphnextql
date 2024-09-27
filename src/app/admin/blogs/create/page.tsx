// app/admin/blogs/create/page.tsx

import { createApolloClient } from "@/lib/apolloClient";
import { GET_TAGS } from "@/graphql/client/queries/tags";
import { ICategory, ITag } from "@/utils/interfaces";
import { GET_CATEGORIES } from "@/graphql/client/queries/categories";
import BlogCreateForm from "@/components/blogs/BlogCreateForm";

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

    return <BlogCreateForm categories={categories} tags={tags} />;
};

export default CreateBlogPage;
