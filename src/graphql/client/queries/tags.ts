// graphql/client/queries/tags.ts

import { gql } from "@apollo/client";

const GET_TAGS = gql`
    query GetTags {
        getTags {
            id
            name
        }
    }
`;

export { GET_TAGS };
