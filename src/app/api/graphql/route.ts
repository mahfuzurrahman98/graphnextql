import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from '@/graphql/typeDefs';
import { resolvers } from '@/graphql/resolvers';
import { NextRequest } from 'next/server';

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };

export const config = {
    api: {
        bodyParser: false,
    },
};
