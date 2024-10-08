// graphql/typeDefs/category.ts

const categoryTypeDefs: string = `#graphql
    type Category {
        id: ID!
        name: String!
        description: String
    }

    type Query {
        getCategories: [Category!]
        getCategory(id: ID!): Category
    }
`;

export default categoryTypeDefs;
