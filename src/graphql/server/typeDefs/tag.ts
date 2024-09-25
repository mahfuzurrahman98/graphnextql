// graphql/typeDefs/tag.ts

const tagTypeDefs: string = `#graphql
    type Tag {
        _id: ID!
        name: String!
    }

    type Query {
        getTags: [Tag!]
    }
`;

export default tagTypeDefs;
