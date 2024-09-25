// src/validation/blogSchemas.ts
import { z } from "zod";

const objectIdSchema = z
    .string()
    .min(24, "ID must be a 24 character hex string")
    .max(24);

const blogBaseSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    author: objectIdSchema,
    tags: z.array(z.string()),
    category: objectIdSchema,
});

const createBlogSchema = blogBaseSchema;

const updateBlogSchema = blogBaseSchema.extend({
    id: objectIdSchema,
});

const deleteBlogSchema = z.object({
    id: objectIdSchema,
});

export { createBlogSchema, updateBlogSchema, deleteBlogSchema };
