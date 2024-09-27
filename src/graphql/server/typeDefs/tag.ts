// graphql/typeDefs/tag.ts

const tagTypeDefs: string = `#graphql
    type Tag {
        id: ID!
        name: String!
    }

    type Query {
        getTags: [Tag!]
    }
`;

export default tagTypeDefs;
