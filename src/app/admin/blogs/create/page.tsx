// app/admin/blogs/create/page.tsx

import { createApolloClient } from "@/lib/apolloClient";
import { GET_TAGS } from "@/graphql/client/queries/tags";
import { ICategory, ITag } from "@/utils/interfaces";
import { GET_CATEGORIES } from "@/graphql/client/queries/categories";

const CreateBlog = async () => {
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
        <div className="container mx-auto">
            {JSON.stringify(tags, null, 2)}
        </div>
    );
};

export default CreateBlog;
