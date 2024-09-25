import { gql } from "@apollo/client";

const CREATE_BLOG = gql`
    mutation CreateBlog(
        $title: String!
        $content: String!
        $author: ID!
        $tags: [String!]
        $category: ID!
    ) {
        createBlog(
            title: $title
            content: $content
            author: $author
            tags: $tags
            category: $category
        ) {
            _id
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

const UPDATE_BLOG = gql`
    mutation UpdateBlog(
        $id: ID!
        $title: String!
        $content: String!
        $author: ID!
        $tags: [String!]
        $category: ID!
    ) {
        updateBlog(
            id: $id
            title: $title
            content: $content
            author: $author
            tags: $tags
            category: $category
        ) {
            _id
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

const DELETE_BLOG = gql`
    mutation DeleteBlog($id: ID!) {
        deleteBlog(id: $id) {
            _id
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

export { CREATE_BLOG, UPDATE_BLOG, DELETE_BLOG };
