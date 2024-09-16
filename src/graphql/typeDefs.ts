// graphql/typeDefs.ts

export const typeDefs = `#graphql
    type User {
        _id: ID!
        name: String!
        email: String!
        role: String!
    }

    type Blog {
        _id: ID!
        title: String!
        content: String!
        author: User!
        tags: [String!]!
        categories: [String!]!
    }

    type Query {
        getBlogs: [Blog!]
        getBlog(slug: String!): Blog
    }

    type Mutation {
        createBlog(
            title: String!
            content: String!
            author: ID!
            tags: [String!]
            categories: [String!]
        ): Blog
    }
`;
