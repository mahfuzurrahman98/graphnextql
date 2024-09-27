import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import typeDefs from "@/graphql/server/typeDefs";
import resolvers from "@/graphql/server/resolvers";

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// const handler = startServerAndCreateNextHandler<NextRequest>(server, {
//     context: async (req) => ({ req }),
// });

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };

export const config = {
    api: {
        bodyParser: false,
    },
};
