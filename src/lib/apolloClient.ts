// // lib/apolloClient.ts
// import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// export const createApolloClient = () => {
//     return new ApolloClient({
//         ssrMode: typeof window === 'undefined', // Enable SSR mode on the server
//         link: new HttpLink({
//             uri: 'http://localhost:3000/api/graphql', // Adjust your GraphQL API endpoint
//         }),
//         cache: new InMemoryCache(),
//     });
// };

// lib/apolloClient.ts
import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
    uri:
        process.env.NEXT_PUBLIC_GRAPHQL_URL ||
        "http://localhost:3000/api/graphql",
    credentials: "same-origin",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.error(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        );
    if (networkError) console.error(`[Network error]: ${networkError}`);
});

export const createApolloClient = () => {
    return new ApolloClient({
        ssrMode: typeof window === "undefined",
        link: from([errorLink, httpLink]),
        cache: new InMemoryCache(),
        defaultOptions: {
            watchQuery: {
                fetchPolicy: "no-cache",
                errorPolicy: "ignore",
            },
            query: {
                fetchPolicy: "no-cache",
                errorPolicy: "all",
            },
        },
    });
};
