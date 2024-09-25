import { mergeResolvers } from "@graphql-tools/merge";
import blogResolvers from "@/graphql/server/resolvers/blog";
import categoryResolvers from "@/graphql/server/resolvers/category";
import tagResolvers from "./tag";

const resolvers = mergeResolvers([
    blogResolvers,
    categoryResolvers,
    tagResolvers,
]);

export default resolvers;
