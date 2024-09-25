// graphql/client/queries/tags.ts

import { gql } from "@apollo/client";

const GET_TAGS = gql`
    query GetTags {
        getTags {
            _id
            name
        }
    }
`;

export { GET_TAGS };
