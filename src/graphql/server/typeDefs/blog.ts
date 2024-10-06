// graphql/typeDefs/blog.ts

const blogTypeDefs: string = `#graphql
    scalar Date    

    type Blog {
        id: ID!
        title: String!
        content: String!
        author: User!
        tags: [String!]!
        category: Category!
        createdAt: Date!
        updatedAt: Date!
    }

    type Query {
        getBlogs(
            q: String
            category: String
            page: Int
            limit: Int
        ): [Blog!]

        getTotalNoOfBlogs(q: String, category: String): Int
        
        getBlog(id: ID!): Blog
    }

    type Mutation {
        createBlog(
            title: String!
            content: String!
            tags: [String!]
            category: ID!
        ): Blog

        updateBlog(
            id: ID!
            title: String
            content: String
            author: ID
            tags: [String!]
            category: ID
        ): Blog

        deleteBlog(id: ID!): Boolean
    }
`;

export default blogTypeDefs;
