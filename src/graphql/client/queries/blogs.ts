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

const GET_TOTAL_NO_OF_BLOGS = gql`
    query GetTotalNoOfBlogs($q: String, $category: String) {
        getTotalNoOfBlogs(q: $q, category: $category)
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

const GET_BLOG_BY_ID_FOR_EDIT = gql`
    query GetBlog($id: ID!) {
        getBlog(id: $id) {
            id
            title
            content
            category {
                id
            }
            tags
        }
    }
`;

export {
    GET_BLOGS,
    GET_TOTAL_NO_OF_BLOGS,
    GET_BLOG_BY_ID,
    GET_BLOG_BY_ID_FOR_EDIT,
};
