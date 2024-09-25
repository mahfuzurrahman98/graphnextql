// graphql/typeDefs/user.ts

const userTypeDefs: string = `#graphql
    type User {
        _id: ID!
        name: String!
        email: String!
        role: String!
    }
`;

export default userTypeDefs;