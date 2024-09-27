import { gql } from "graphql-tag";
import { mergeTypeDefs } from "@graphql-tools/merge";

// Import the type definitions from different modules
import userTypeDefs from "@/graphql/server/typeDefs/user";
import categoryTypeDefs from "@/graphql/server/typeDefs/category";
import blogTypeDefs from "@/graphql/server/typeDefs/blog";
import tagTypeDefs from "@/graphql/server/typeDefs/tag";

// Merge the type definitions into one
const typeDefs = mergeTypeDefs([
    gql(userTypeDefs),
    gql(categoryTypeDefs),
    gql(blogTypeDefs),
    gql(tagTypeDefs),
]);

export default typeDefs;
