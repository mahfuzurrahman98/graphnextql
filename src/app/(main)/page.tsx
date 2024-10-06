//app/page.tsx

import { createApolloClient } from "@/lib/apolloClient";
import BlogCard from "@/components/blogs/BlogCard";
import {
    GET_BLOGS,
    GET_TOTAL_NO_OF_BLOGS,
} from "@/graphql/client/queries/blogs";
import { Search } from "@/components/blogs/Search";
import { CategoryOptionsType, SearchParamsType } from "@/utils/types";
import { IBlog, ICategory } from "@/utils/interfaces";
import { GET_CATEGORIES } from "@/graphql/client/queries/categories";
import BlogPagination from "@/components/blogs/BlogPagination";

const BlogList = async ({
    searchParams,
}: {
    searchParams?: SearchParamsType;
}) => {
    // console.log("searchParams:", searchParams);
    const { q = "", category = "", page = 1, limit = 3 } = searchParams || {};
    // console.log("q:", q, "category:", category, "page:", page, "limit:", limit);
    const client = createApolloClient();
    let blogs: IBlog[] = [];
    let categories: ICategory[] = [];

    const categoriesResult = await client.query({
        query: GET_CATEGORIES,
    });
    categories = categoriesResult.data.getCategories;

    // console.log("q:", q, "category:", category, "page:", page, "limit:", limit);
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

    // update categories to categoryOptions
    const categoryOptions: CategoryOptionsType[] = categories.map(
        (cat: ICategory) => ({
            value: cat.name,
            label: cat.name,
        })
    );

    return (
        <>
            <Search categoryOptions={categoryOptions} />
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs &&
                    blogs.map((blog: IBlog) => (
                        <BlogCard key={blog.title} blog={blog} />
                    ))}
            </div>
            <div className="flex justify-end mt-10">
                <BlogPagination totalItems={totalBlogs} />
            </div>
        </>
    );
};

export default BlogList;
