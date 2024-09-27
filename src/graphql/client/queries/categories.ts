// graphql/client/queries/categories.ts

import { gql } from "@apollo/client";

const GET_CATEGORIES = gql`
    query GetCategories {
        getCategories {
            id
            name
            description
        }
    }
`;

export { GET_CATEGORIES };
