// graphql/queries.ts
import { gql } from "@apollo/client";

const GET_BLOGS = gql`
    query GetBlogs($q: String, $category: String, $page: Int, $limit: Int) {
        getBlogs(q: $q, category: $category, page: $page, limit: $limit) {
            id
            title
            content
            author {
                name
            }
            category {
                name
            }
            tags
            createdAt
        }
    }
`;

const GET_BLOG_BY_ID = gql`
    query GetBlog($id: ID!) {
        getBlog(id: $id) {
            id
            title
            content
            author {
                name
            }
            category {
                name
            }
            tags
            createdAt
        }
    }
`;

export { GET_BLOGS, GET_BLOG_BY_ID };
